from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi.middleware.cors import CORSMiddleware
from configparser import ConfigParser

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

# Enable CORS (Adjust origins accordingly)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to restrict origins in production
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

# User login model
class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/login")
async def login(user: LoginRequest):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Check if user is a student
        student_query = "SELECT student_name, email_id FROM student_details WHERE email_id = %s AND password = %s"
        cursor.execute(student_query, (user.email, user.password))
        student = cursor.fetchone()

        if student:
            return {
                "message": "Login successful",
                "role": "student",
                "email": student["email_id"],
                "name": student["student_name"]
            }

        # Check if user is a teacher
        teacher_query = "SELECT teacher_name, email_id FROM teacher_details WHERE email_id = %s AND password = %s"
        cursor.execute(teacher_query, (user.email, user.password))
        teacher = cursor.fetchone()

        if teacher:
            return {
                "message": "Login successful",
                "role": "teacher",
                "email": teacher["email_id"],
                "name": teacher["teacher_name"]
            }

        # If not found in either table
        raise HTTPException(status_code=401, detail="Invalid email or password")

    except Exception as e:
        print("Database query error:", e)
        raise HTTPException(status_code=500, detail="Internal server error")

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

