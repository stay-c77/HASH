from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi.middleware.cors import CORSMiddleware
from configparser import ConfigParser
from typing import List, Optional

# Load database config
config = ConfigParser()
config.read("config.ini")

db_config = {
    "host": config.get("database", "HOST"),
    "port": config.get("database", "PORT"),
    "user": config.get("database", "USER"),
    "password": config.get("database", "PASSWORD"),
    "dbname": config.get("database", "DATABASE"),
}

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Connect to PostgreSQL
def get_db_connection():
    try:
        conn = psycopg2.connect(**db_config, cursor_factory=RealDictCursor)
        return conn
    except Exception as e:
        print("Database connection error:", e)
        raise HTTPException(status_code=500, detail="Database connection error")


# Existing login models and endpoints...
class LoginRequest(BaseModel):
    email: str
    password: str


@app.post("/login")
async def login(user: LoginRequest):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    try:

        teacher_query = "SELECT teacher_id, teacher_name, email_id FROM teacher_details WHERE email_id = %s AND password = %s"
        cursor.execute(teacher_query, (user.email, user.password))
        teacher = cursor.fetchone()

        print("🔍 DEBUG: Teacher Query Result:", teacher)

        if teacher:
            return {
                "message": "Login successful",
                "role": "teacher",
                "teacher_id": teacher.get("teacher_id"),
                "email": teacher.get("email_id"),
                "name": teacher.get("teacher_name"),
            }

        raise HTTPException(status_code=401, detail="Invalid email or password")

    except Exception as e:
        print("Database query error:", e)
        raise HTTPException(status_code=500, detail="Internal server error")

    finally:
        cursor.close()
        conn.close()


# New endpoints for quiz assignment
@app.get("/api/subjects/{teacher_id}")
async def get_teacher_subjects(teacher_id: str):  # Ensure it's treated as a string
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        query = """
        SELECT s.subject_id, s.subject_name 
        FROM student_subjectslist s 
        JOIN teacher_subjects ts ON s.subject_id = ts.subject_id 
        WHERE ts.teacher_id = %s
        """
        cursor.execute(query, (teacher_id,))  # Ensure it's passed as a string
        subjects = cursor.fetchall()

        return {"subjects": subjects}

    except Exception as e:
        print("Database query error:", e)
        raise HTTPException(status_code=500, detail="Internal server error")

    finally:
        cursor.close()
        conn.close()


@app.get("/api/modules/{subject_id}")
async def get_modules_by_subject(subject_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)  # Ensure dictionary output

    try:
        print("Received subject_id:", subject_id)

        query = """
        SELECT module_id, module_name
        FROM modules
        WHERE syllabus_id = %s
        """
        cursor.execute(query, (subject_id,))
        modules = cursor.fetchall()

        print("Modules fetched:", modules)

        if not modules:
            raise HTTPException(status_code=404, detail="No modules found for this subject")

        # Formatting the module name as "Module X: Name"
        return {
            "modules": [
                {"module_id": m["module_id"], "module_name": f"Module {m['module_id']}: {m['module_name']}"}
                for m in modules
            ]
        }

    except Exception as e:
        print("Database query error:", e)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

    finally:
        cursor.close()
        conn.close()


@app.get("/api/topics/{module_id}")
async def get_module_topics(module_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    try:
        print(f"Fetching topics for module_id: {module_id}")
        query = "SELECT topic_id, topic_name FROM topics WHERE module_id = %s"
        cursor.execute(query, (module_id,))

        topics = cursor.fetchall()
        print(f"Raw fetched topics: {topics}")

        if not topics:
            print(f"No topics found for module_id: {module_id}")
            return {"topics": []}

        # Convert RealDictRow to list of dictionaries
        topics_list = [dict(row) for row in topics]

        return {"topics": topics_list}

    except Exception as e:
        print(f"Database query error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


@app.get("/student/{email}")
async def get_student(email: str):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        query = "SELECT full_name FROM student_details WHERE LOWER(email_id) = LOWER(%s)"
        cursor.execute(query, (email,))
        student = cursor.fetchone()

        if student:
            return {"name": student["full_name"]}
        else:
            raise HTTPException(status_code=404, detail="Student not found")

    except Exception as e:
        print("Database query error:", e)
        raise HTTPException(status_code=500, detail="Internal server error")

    finally:
        cursor.close()
        conn.close()
