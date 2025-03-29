import asyncio
from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi.middleware.cors import CORSMiddleware
from configparser import ConfigParser
from typing import List, Optional
import uuid
from gen_ai.deepseek import GenAI
from model.syllabus_parser import ProcessSyllabus
from prompts.prompt import Prompt
import os
import json, re
from datetime import datetime
import pandas as pd
from fastapi.responses import FileResponse
from io import BytesIO
import tempfile
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph

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

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

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
        conn = psycopg2.connect(**db_config, cursor_factory=psycopg2.extras.RealDictCursor)
        return conn
    except Exception as e:
        print("Database connection error:", e)
        raise HTTPException(status_code=500, detail="Database connection error")


def extract_json(response_text):
    match = re.search(r'```json\n(.*?)\n```', response_text, re.DOTALL)
    if match:
        clean_json = match.group(1)
    else:
        clean_json = response_text

    try:
        return json.loads(clean_json)
    except json.JSONDecodeError as e:
        print("JSON parsing error:", e)
        return None


class LoginRequest(BaseModel):
    email: str
    password: str


class Topic(BaseModel):
    topic_name: str


class Module(BaseModel):
    module_no: int
    module_name: str
    topics: List[Topic]


class SyllabusUpload(BaseModel):
    subject_name: str
    modules: List[Module]


class QuizRequest(BaseModel):
    topic_id: str
    difficulty: str
    question_count: int
    student_year: int


class QuizUploadRequest(BaseModel):
    teacher_id: str
    subject_id: str
    topic_id: str
    difficulty: str
    questions: List[dict]
    time_limit: int
    due_date: str
    student_year: int


@app.post("/api/generate-quiz")
async def generate_quiz(request: QuizRequest):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT t.topic_id, t.topic_name, m.module_name, s.subject_name 
            FROM topics t
            JOIN modules m ON t.module_id = m.module_id
            JOIN student_subjectslist s ON m.subject_id = s.subject_id
            WHERE t.topic_id = %s
        """, (request.topic_id,))

        topic_info = cursor.fetchone()

        if not topic_info:
            raise HTTPException(status_code=404, detail="Topic not found")

        topic_name = topic_info["topic_name"]

        gen_ai = GenAI()
        prompt_generator = Prompt()

        quiz_prompt = prompt_generator.generate_quiz(
            number_of_questions=request.question_count,
            number_of_options=4,
            topics=topic_name,
            levels=request.difficulty,
            beginner=request.question_count // 3,
            intermediate=request.question_count // 3,
            hard=request.question_count // 3
        )

        response = gen_ai.gen_ai_model(quiz_prompt)

        if not response:
            raise HTTPException(status_code=500, detail="Failed to generate quiz")

        quiz_data = extract_json(response)

        if not quiz_data:
            raise HTTPException(status_code=500, detail="Invalid quiz format")


        for question in quiz_data["questions"]:
            if "difficulty" not in question:
                question["difficulty"] = "medium"
        return {"quiz": quiz_data}

    except Exception as e:
        print("Error generating quiz:", e)
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


@app.post("/api/upload-quiz")
async def upload_quiz(request: QuizUploadRequest):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        quiz_id = str(uuid.uuid4())
        due_date = datetime.strptime(request.due_date, "%Y-%m-%d")

        cursor.execute("""
            INSERT INTO generated_quiz (
                quiz_id, subject_id, topic_name, no_of_questions, 
                difficulty, teacher_id, end_date, status, student_year, time_limit
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING quiz_id
        """, (
            quiz_id,
            request.subject_id,
            request.topic_id,
            len(request.questions),
            request.difficulty,
            request.teacher_id,
            due_date,
            'active',
            request.student_year,
            request.time_limit
        ))

        for question in request.questions:
            question_id = str(uuid.uuid4())
            cursor.execute("""
                INSERT INTO quiz_questions (
                    question_id, quiz_id, question_text, 
                    option_1, option_2, option_3, option_4, correct_answer, difficulty_level
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                question_id,
                quiz_id,
                question['question'],
                question['options'][0],
                question['options'][1],
                question['options'][2],
                question['options'][3],
                question['correct_answer'],
                question.get('difficulty', 'medium')
            ))

        conn.commit()
        return {"message": "Quiz uploaded successfully", "quiz_id": quiz_id}

    except Exception as e:
        conn.rollback()
        print("Error uploading quiz:", e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


@app.post("/login")
async def login(user: LoginRequest):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    try:
        # First try teacher login
        teacher_query = "SELECT teacher_id, teacher_name, email_id FROM teacher_details WHERE email_id = %s AND password = %s"
        cursor.execute(teacher_query, (user.email, user.password))
        teacher = cursor.fetchone()

        if teacher:
            return {
                "message": "Login successful",
                "role": "teacher",
                "teacher_id": teacher.get("teacher_id"),
                "email": teacher.get("email_id"),
                "name": teacher.get("teacher_name"),
            }

        # Then try student login
        student_query = "SELECT student_id, student_name, email_id, student_year FROM student_details WHERE email_id = %s AND password = %s"
        cursor.execute(student_query, (user.email, user.password))
        student = cursor.fetchone()

        if student:
            return {
                "message": "Login successful",
                "role": "student",
                "student_id": student.get("student_id"),
                "email": student.get("email_id"),
                "name": student.get("student_name"),
                "student_year": student.get("student_year"),
            }

        # Finally try admin login
        admin_query = "SELECT admin_id, admin_name, email_id FROM admin_details WHERE email_id = %s AND password = %s"
        cursor.execute(admin_query, (user.email, user.password))
        admin = cursor.fetchone()

        if admin:
            return {
                "message": "Login successful",
                "role": "admin",
                "admin_id": admin.get("admin_id"),
                "email": admin.get("email_id"),
                "name": admin.get("admin_name"),
            }

        raise HTTPException(status_code=401, detail="Invalid email or password")

    except Exception as e:
        print("Database query error:", e)
        raise HTTPException(status_code=500, detail="Internal server error")

    finally:
        cursor.close()
        conn.close()


@app.get("/api/subjects/{teacher_id}")
async def get_teacher_subjects(teacher_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        query = """
        SELECT s.subject_id, s.subject_name 
        FROM student_subjectslist s 
        JOIN teacher_subjects ts ON s.subject_id = ts.subject_id 
        WHERE ts.teacher_id = %s
        """
        cursor.execute(query, (teacher_id,))
        subjects = cursor.fetchall()

        return {"subjects": subjects}

    except Exception as e:
        print("Database query error:", e)
        raise HTTPException(status_code=500, detail="Internal server error")

    finally:
        cursor.close()
        conn.close()


@app.get("/api/modules/{subject_id}")
async def get_modules_by_subject(subject_id: str):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    try:
        query = """
        SELECT module_id, module_name
        FROM modules
        WHERE subject_id = %s
        """
        cursor.execute(query, (subject_id,))
        modules = cursor.fetchall()

        if not modules:
            raise HTTPException(status_code=404, detail="No modules found for this subject")

        return {
            "modules": [
                {
                    "module_id": m["module_id"],
                    "module_name": m["module_name"]
                    if m["module_name"].startswith("Module")
                    else f"Module {index + 1}: {m['module_name']}"
                }
                for index, m in enumerate(modules)
            ]
        }

    except Exception as e:
        print("Database query error:", e)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

    finally:
        cursor.close()
        conn.close()


@app.get("/api/topics/{module_id}")
async def get_module_topics(module_id: str):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    try:
        query = "SELECT topic_id, topic_name FROM topics WHERE module_id = %s"
        cursor.execute(query, (module_id,))

        topics = cursor.fetchall()

        if not topics:
            print(f"No topics found for module_id: {module_id}")
            return {"topics": []}

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


@app.post("/upload-syllabus/")
async def upload_syllabus(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    try:
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        process_syllabus = ProcessSyllabus()
        syllabus_text = process_syllabus.syllabus_parser(file_path)

        if not syllabus_text:
            raise HTTPException(status_code=400, detail="Failed to extract syllabus text.")

        prompt_generator = Prompt()
        syllabus_prompt = prompt_generator.parse_syllabus()
        formatted_prompt = syllabus_prompt.format(syllabus_text=syllabus_text)

        gen_ai = GenAI()
        response = gen_ai.gen_ai_model(formatted_prompt)

        if not response:
            raise HTTPException(status_code=500, detail="AI model did not return a valid response.")

        cleaned_response = response.strip()
        syllabus_json = json.loads(cleaned_response)

        return {"message": "Syllabus processed successfully", "syllabus": syllabus_json}

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI response is not a valid JSON.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing syllabus: {str(e)}")


@app.post("/api/syllabus/parse")
async def parse_syllabus(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        with open("temp_syllabus.pdf", "wb") as f:
            f.write(contents)

        process_syllabus = ProcessSyllabus()
        syllabus_text = process_syllabus.syllabus_parser("temp_syllabus.pdf")

        if not syllabus_text:
            raise HTTPException(status_code=400, detail="Failed to extract syllabus text.")

        prompt_generator = Prompt()
        syllabus_prompt = prompt_generator.parse_syllabus()
        formatted_syllabus = syllabus_prompt.format(syllabus_text=syllabus_text)

        from gen_ai.deepseek import GenAI
        gen_ai = GenAI()

        response = gen_ai.gen_ai_model(formatted_syllabus)

        if isinstance(response, str):
            raw_content = response
        else:
            try:
                raw_content = response.choices[0].message.content
            except AttributeError:
                raise HTTPException(status_code=500, detail="Invalid AI response format")

        cleaned_content = raw_content.replace("```json\n", "").replace("\n```", "").strip()

        try:
            parsed_data = json.loads(cleaned_content)
            return {"parsed_data": parsed_data}
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="AI response is not valid JSON.")

    except Exception as e:
        print("Error parsing syllabus:", e)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/syllabus/upload")
async def upload_syllabus(data: dict):
    try:
        subject_name = data.get("subject_name")
        teacher_id = data.get("teacher_id")
        student_year = data.get("student_year", "1")
        modules = data.get("modules", [])

        if not all([subject_name, teacher_id, modules]):
            raise HTTPException(status_code=400, detail="Missing required fields")

        try:
            student_year = int(student_year)
        except (ValueError, TypeError):
            student_year = 1

        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute(
                "SELECT subject_id FROM student_subjectslist WHERE subject_name = %s",
                (subject_name,)
            )
            subject = cursor.fetchone()

            if subject:
                subject_id = subject[0]
            else:
                subject_id = str(uuid.uuid4())
                cursor.execute("""
                    INSERT INTO student_subjectslist (subject_id, subject_name, teacher_id, student_year)
                    VALUES (%s, %s, %s, %s)
                """, (subject_id, subject_name, teacher_id, student_year))

            cursor.execute(
                "SELECT * FROM teacher_subjects WHERE teacher_id = %s AND subject_id = %s",
                (teacher_id, subject_id)
            )
            if not cursor.fetchone():
                cursor.execute("""
                    INSERT INTO teacher_subjects (teacher_id, subject_id)
                    VALUES (%s, %s)
                """, (teacher_id, subject_id))

            syllabus_id = str(uuid.uuid4())
            cursor.execute("""
                INSERT INTO syllabus (syllabus_id, subject_id, subject_name, subject_status, progress)
                VALUES (%s, %s, %s, %s, %s)
            """, (syllabus_id, subject_id, subject_name, False, 0))

            for module in modules:
                module_id = str(uuid.uuid4())
                cursor.execute("""
                    INSERT INTO modules (module_id, subject_id, syllabus_id, module_no, module_name)
                    VALUES (%s, %s, %s, %s, %s)
                """, (module_id, subject_id, syllabus_id, module["module_no"], module["module_name"]))

                for topic in module["topics"]:
                    topic_id = str(uuid.uuid4())
                    cursor.execute("""
                        INSERT INTO topics (topic_id, module_id, topic_name, topic_status)
                        VALUES (%s, %s, %s, %s)
                    """, (topic_id, module_id, topic["topic_name"], False))

            conn.commit()
            return {"message": "Syllabus uploaded successfully", "syllabus_id": syllabus_id}

        except Exception as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            cursor.close()
            conn.close()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/pending-quizzes/{student_year}/{student_id}")
async def get_pending_quizzes(student_year: int, student_id: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        query = """
            SELECT 
                gq.quiz_id,
                gq.subject_id,
                t.topic_name,
                gq.no_of_questions,
                gq.difficulty,
                gq.teacher_id,
                gq.end_date,
                gq.status,
                ssl.subject_name,
                td.teacher_name
            FROM generated_quiz gq
            JOIN student_subjectslist ssl ON gq.subject_id = ssl.subject_id
            JOIN teacher_details td ON gq.teacher_id = td.teacher_id
            JOIN topics t ON t.topic_id::text = gq.topic_name
            WHERE gq.student_year = %s 
            AND gq.status = 'active'
            AND gq.quiz_id NOT IN (
                SELECT quiz_id 
                FROM completed_quiz_list 
                WHERE student_id = %s
            )
            AND gq.end_date > CURRENT_TIMESTAMP
            ORDER BY gq.end_date ASC;
        """

        cursor.execute(query, (student_year, student_id))
        quizzes = cursor.fetchall()

        if not quizzes:
            return {
                "message": "You're all caught up! Keep up the great work! 🌟",
                "quizzes": []
            }

        formatted_quizzes = [
            {
                "quiz_id": quiz["quiz_id"],
                "subject": quiz["subject_name"],
                "topic": quiz["topic_name"],
                "totalQuestions": quiz["no_of_questions"],
                "marks": 10,
                "teacher": {
                    "name": quiz["teacher_name"],
                    "subject": quiz["subject_name"]
                },
                "difficulty": quiz["difficulty"],
                "deadline": quiz["end_date"].isoformat(),
                "status": quiz["status"]
            }
            for quiz in quizzes
        ]

        return {
            "message": "Pending quizzes retrieved successfully",
            "quizzes": formatted_quizzes
        }

    except Exception as e:
        print(f"Error fetching pending quizzes: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


@app.get("/api/quiz/{quiz_id}")
async def get_quiz(quiz_id: str):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT 
                gq.quiz_id,
                gq.subject_id,
                gq.topic_name,
                gq.no_of_questions,
                gq.difficulty,
                gq.teacher_id,
                gq.time_limit,
                ssl.subject_name,
                td.teacher_name,
                t.topic_name as topic_display_name
            FROM generated_quiz gq
            JOIN student_subjectslist ssl ON gq.subject_id = ssl.subject_id
            JOIN teacher_details td ON gq.teacher_id = td.teacher_id
            JOIN topics t ON t.topic_id::text = gq.topic_name
            WHERE gq.quiz_id = %s
        """, (quiz_id,))

        quiz_details = cursor.fetchone()

        if not quiz_details:
            raise HTTPException(status_code=404, detail="Quiz not found")

        cursor.execute("""
            SELECT 
                question_id,
                question_text,
                option_1,
                option_2,
                option_3,
                option_4,
                correct_answer
            FROM quiz_questions 
            WHERE quiz_id = %s
        """, (quiz_id,))

        questions = cursor.fetchall()

        return {
            "quiz_details": quiz_details,
            "questions": questions
        }

    except Exception as e:
        print(f"Error fetching quiz: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


@app.post("/api/quiz/submit")
async def submit_quiz(request: dict):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        quiz_id = request["quiz_id"]
        student_id = request["student_id"]
        answers = request["answers"]
        student_year = request["student_year"]

        cursor.execute("""
            SELECT question_id, correct_answer 
            FROM quiz_questions 
            WHERE quiz_id = %s
        """, (quiz_id,))
        correct_answers_data = cursor.fetchall()

        total_questions = len(correct_answers_data)
        correct_count = 0

        for q in correct_answers_data:
            question_id = str(q["question_id"])
            selected_answer = answers.get(question_id)
            is_correct = str(selected_answer) == str(q["correct_answer"]) if selected_answer is not None else False

            if is_correct:
                correct_count += 1

            cursor.execute("""
                INSERT INTO quiz_responses 
                (student_id, quiz_id, question_id, selected_answer, is_correct)
                VALUES (%s, %s, %s, %s, %s)
            """, (student_id, quiz_id, question_id, selected_answer, is_correct))

        incorrect_count = total_questions - correct_count
        percentage = (correct_count / total_questions) * 100

        grade = 0  # Default grade (F)
        if percentage >= 90:
            grade = 5  # A+
        elif percentage >= 80:
            grade = 4  # A
        elif percentage >= 70:
            grade = 3  # B
        elif percentage >= 60:
            grade = 2  # C
        elif percentage >= 50:
            grade = 1  # D

        cursor.execute("""
            INSERT INTO quiz_result 
            (quiz_id, student_id, score, grade, correct_answers, incorrect_answers, percentage)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (quiz_id, student_id, correct_count, grade, correct_count, incorrect_count, percentage))

        cursor.execute("""
            INSERT INTO completed_quiz_list (quiz_id, student_id, student_year)
            VALUES (%s, %s, %s)
            ON CONFLICT (quiz_id, student_id) DO NOTHING;  -- Prevent duplicate entries
        """, (quiz_id, student_id, student_year))

        conn.commit()

        grade_map = {
            5: "A+",
            4: "A",
            3: "B",
            2: "C",
            1: "D",
            0: "F"
        }

        return {
            "score": correct_count,
            "total": total_questions,
            "grade": grade_map[grade],
            "percentage": percentage,
            "correct_answers": correct_count,
            "incorrect_answers": incorrect_count
        }

    except Exception as e:
        conn.rollback()
        print(f"Error submitting quiz: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


def calculate_grade(correct, total):
    if total == 0:
        return "N/A"

    percentage = (correct / total) * 100

    if percentage >= 90:
        return "A"
    elif percentage >= 75:
        return "B"
    elif percentage >= 50:
        return "C"
    elif percentage >= 35:
        return "D"
    else:
        return "F"


@app.get("/api/quiz/results/{quiz_id}/{student_id}")
async def get_quiz_results(quiz_id: str, student_id: str):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT 
                COUNT(*) AS total_questions,
                SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) AS correct_answers,
                SUM(CASE WHEN NOT is_correct THEN 1 ELSE 0 END) AS incorrect_answers
            FROM quiz_responses
            WHERE quiz_id = %s AND student_id = %s
            GROUP BY student_id, quiz_id;
        """, (quiz_id, student_id))

        student_result = cursor.fetchone()

        if not student_result:
            raise HTTPException(status_code=404, detail="Quiz result not found")

        total_questions = int(student_result["total_questions"])
        correct_answers = int(student_result["correct_answers"])
        incorrect_answers = int(student_result["incorrect_answers"])

        cursor.execute("""
            SELECT grade, COUNT(*) as count 
            FROM quiz_result 
            WHERE quiz_id = %s 
            GROUP BY grade;
        """, (quiz_id,))
        class_performance = cursor.fetchall()

        cursor.execute("""
            SELECT 
                qq.question_id, 
                qq.question_text, 
                qq.option_1, 
                qq.option_2, 
                qq.option_3, 
                qq.option_4, 
                qq.correct_answer, 
                qr.selected_answer, 
                qr.is_correct
            FROM quiz_questions qq
            LEFT JOIN quiz_responses qr 
                ON qq.question_id = qr.question_id 
                AND qr.quiz_id = qq.quiz_id 
                AND qr.student_id = %s
            WHERE qq.quiz_id = %s;
        """, (student_id, quiz_id))
        questions = cursor.fetchall()

        cursor.execute("""
            SELECT * FROM quiz_responses
            WHERE quiz_id = %s AND student_id = %s
        """, (quiz_id, student_id))
        quiz_responses = cursor.fetchall()

        response_data = {
            "student_result": {
                "total": total_questions,
                "correct_answers": correct_answers,
                "incorrect_answers": incorrect_answers,
                "grade": calculate_grade(correct_answers, total_questions)
            },
            "class_performance": class_performance,
            "questions": questions,
            "quiz_responses": quiz_responses
        }

        return response_data

    except Exception as e:
        print(f"Error fetching quiz results: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


@app.get("/api/completed-quizzes/{student_id}")
async def get_completed_quizzes(student_id: str):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        query = """
            WITH TopPerformers AS (
                SELECT 
                    qr.quiz_id,
                    sd.student_name,
                    sd.student_pic,
                    qr.percentage as score,
                    ROW_NUMBER() OVER (PARTITION BY qr.quiz_id ORDER BY qr.percentage DESC) as rank
                FROM quiz_result qr
                JOIN student_details sd ON sd.student_id = qr.student_id
            )
            SELECT 
                gq.quiz_id,
                gq.subject_id,
                gq.topic_name,
                gq.no_of_questions,
                gq.difficulty,
                qr.score,
                qr.grade,
                qr.correct_answers,
                qr.incorrect_answers,
                qr.percentage,
                ssl.subject_name,
                td.teacher_id,
                td.teacher_name,
                t.topic_name as topic_display_name,
                json_build_object(
                    'name', tp.student_name,
                    'score', tp.score,
                    'avatar', tp.student_pic
                ) as top_performer
            FROM completed_quiz_list cql
            JOIN generated_quiz gq ON cql.quiz_id = gq.quiz_id
            JOIN quiz_result qr ON qr.quiz_id = gq.quiz_id AND qr.student_id = cql.student_id
            JOIN student_subjectslist ssl ON gq.subject_id = ssl.subject_id
            JOIN teacher_details td ON gq.teacher_id = td.teacher_id
            JOIN topics t ON t.topic_id::text = gq.topic_name
            LEFT JOIN TopPerformers tp ON tp.quiz_id = gq.quiz_id AND tp.rank = 1
            WHERE cql.student_id = %s
            ORDER BY qr.percentage DESC
        """

        cursor.execute(query, (student_id,))
        completed_quizzes = cursor.fetchall()

        if not completed_quizzes:
            return {
                "message": "No completed quizzes found",
                "quizzes": []
            }

        for quiz in completed_quizzes:
            quiz['no_of_questions'] = int(quiz['no_of_questions'])
            quiz['correct_answers'] = int(quiz['correct_answers'])
            quiz['incorrect_answers'] = int(quiz['incorrect_answers'])
            quiz['percentage'] = float(quiz['percentage'])

            if quiz['top_performer'] and isinstance(quiz['top_performer'], str):
                quiz['top_performer'] = json.loads(quiz['top_performer'])

        return {
            "message": "Completed quizzes retrieved successfully",
            "quizzes": completed_quizzes
        }

    except Exception as e:
        print(f"Error fetching completed quizzes: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


@app.get("/api/teacher/completed-quizzes/{teacher_id}")
async def get_teacher_completed_quizzes(teacher_id: str):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        query = """
            WITH StudentCounts AS (
                SELECT student_year, COUNT(*) as total_students
                FROM student_details
                GROUP BY student_year
            ),
            QuizStats AS (
                SELECT 
                    gq.quiz_id,
                    COUNT(DISTINCT cql.student_id) as students_completed,
                    AVG(qr.percentage) as average_score
                FROM generated_quiz gq
                LEFT JOIN completed_quiz_list cql ON gq.quiz_id = cql.quiz_id
                LEFT JOIN quiz_result qr ON gq.quiz_id = qr.quiz_id
                GROUP BY gq.quiz_id
            )
            SELECT 
                gq.quiz_id,
                gq.subject_id,
                ssl.subject_name,
                t.topic_name as topic_name,
                gq.no_of_questions,
                gq.difficulty,
                gq.end_date,
                gq.student_year,
                qs.students_completed,
                sc.total_students,
                ROUND(qs.average_score::numeric, 2) as average_score
            FROM generated_quiz gq
            JOIN student_subjectslist ssl ON gq.subject_id = ssl.subject_id
            JOIN topics t ON t.topic_id::text = gq.topic_name
            JOIN StudentCounts sc ON gq.student_year = sc.student_year
            LEFT JOIN QuizStats qs ON gq.quiz_id = qs.quiz_id
            WHERE gq.teacher_id = %s
            ORDER BY gq.end_date DESC
        """

        cursor.execute(query, (teacher_id,))
        quizzes = cursor.fetchall()

        return {"quizzes": quizzes}

    except Exception as e:
        print(f"Error fetching completed quizzes: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


@app.get("/api/quiz/details/{quiz_id}")
async def get_quiz_details(quiz_id: str):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        query = """
            SELECT 
                sd.student_id,
                sd.student_name,
                sd.student_pic,
                qr.score,
                qr.grade,
                qr.correct_answers,
                qr.incorrect_answers,
                qr.percentage,
                COUNT(qres.question_id) as total_questions,
                SUM(CASE WHEN qres.is_correct THEN 1 ELSE 0 END) as correct_count
            FROM quiz_result qr
            JOIN student_details sd ON qr.student_id = sd.student_id
            JOIN quiz_responses qres ON qr.quiz_id = qres.quiz_id AND qr.student_id = qres.student_id
            WHERE qr.quiz_id = %s
            GROUP BY sd.student_id, sd.student_name, sd.student_pic, qr.score, qr.grade, 
                     qr.correct_answers, qr.incorrect_answers, qr.percentage
            ORDER BY qr.percentage DESC
        """

        cursor.execute(query, (quiz_id,))
        student_results = cursor.fetchall()

        quiz_query = """
            SELECT 
                gq.quiz_id,
                gq.subject_id,
                ssl.subject_name,
                t.topic_name,
                gq.difficulty,
                gq.no_of_questions,
                gq.end_date
            FROM generated_quiz gq
            JOIN student_subjectslist ssl ON gq.subject_id = ssl.subject_id
            JOIN topics t ON t.topic_id::text = gq.topic_name
            WHERE gq.quiz_id = %s
        """

        cursor.execute(quiz_query, (quiz_id,))
        quiz_info = cursor.fetchone()

        return {
            "quiz_info": quiz_info,
            "student_results": student_results
        }

    except Exception as e:
        print(f"Error fetching quiz details: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


GRADE_MAP = {
    5: 'A+',
    4: 'A',
    3: 'B',
    2: 'C',
    1: 'D',
    0: 'F'
}


@app.get("/api/quiz/export/{quiz_id}")
async def export_quiz_results(quiz_id: str):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        query = """
            WITH QuizInfo AS (
                SELECT 
                    gq.quiz_id,
                    ssl.subject_name,
                    t.topic_name,
                    gq.difficulty,
                    gq.end_date
                FROM generated_quiz gq
                JOIN student_subjectslist ssl ON gq.subject_id = ssl.subject_id
                JOIN topics t ON t.topic_id::text = gq.topic_name
                WHERE gq.quiz_id = %s
            )
            SELECT 
                sd.student_name,
                qr.correct_answers,
                qr.score,
                qr.grade,
                qr.percentage,
                qi.subject_name,
                qi.topic_name,
                qi.difficulty,
                qi.end_date
            FROM quiz_result qr
            JOIN student_details sd ON qr.student_id = sd.student_id
            CROSS JOIN QuizInfo qi
            WHERE qr.quiz_id = %s
            ORDER BY qr.percentage DESC
        """

        cursor.execute(query, (quiz_id, quiz_id))
        results = cursor.fetchall()
        if not results:
            raise HTTPException(status_code=404, detail="Quiz results not found")

        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            pdf_path = temp_file.name
            doc = SimpleDocTemplate(pdf_path, pagesize=letter)
            elements = []
            styles = getSampleStyleSheet()

            title_style = ParagraphStyle(
                "Title",
                parent=styles["Title"],
                fontSize=16,
                alignment=1,
                spaceAfter=10
            )
            elements.append(Paragraph(f"Quiz Results - {results[0]['subject_name']}", title_style))

            topic_text = f"Topic: {results[0]['topic_name']}"
            wrapped_topic = Paragraph(topic_text, styles["BodyText"])

            quiz_info_table = Table([
                [wrapped_topic],
                [f"Difficulty: {results[0]['difficulty']}", f"Date: {results[0]['end_date'].strftime('%Y-%m-%d')}"]
            ])
            quiz_info_table.setStyle(TableStyle([
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold')
            ]))
            elements.append(quiz_info_table)

            elements.append(Paragraph("<br/><br/>", styles["BodyText"]))  # Add spacing

            table_data = [["Student Name", "Correct Answers", "Score", "Grade", "Percentage"]]
            for row in results:
                letter_grade = GRADE_MAP.get(row["grade"], "F")  # Convert numeric grade to letter
                table_data.append([
                    row["student_name"], row["correct_answers"], row["score"], letter_grade, f"{row['percentage']}%"
                ])

            result_table = Table(table_data, colWidths=[150, 100, 80, 80, 100])
            result_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
                ('GRID', (0, 0), (-1, -1), 1, colors.black)
            ]))
            elements.append(result_table)

            doc.build(elements)

            return FileResponse(pdf_path, media_type='application/pdf', filename=f'quiz_results_{quiz_id}.pdf')

    except Exception as e:
        print(f"Error exporting quiz results: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
