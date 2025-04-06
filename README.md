# HASH: AI Powered Learning Platform

HASH is an AI-powered web-based learning platform designed to assist teachers by automating the generation of adaptive quizzes based on syllabus content. With an intuitive interface and intelligent question generation, HASH minimizes repetitive tasks and enhances personalized learning experiences for students.

## Key Features

- **Syllabus Upload**: Teachers can upload a PDF syllabus, which is parsed and processed to extract modules and topics.
- **AI-Powered Quiz Generation**: Automatically generate quizzes of varying difficulty based on selected topics using OpenAI integration.
- **Adaptive Learning**: Question difficulty dynamically adjusts based on student performance.
- **Teacher Dashboard**: View and manage quizzes, track student progress, and customize quiz parameters.
- **Student Interface**: Simple and engaging interface for students to attempt quizzes.
- **Proctoring Controls**: Basic proctoring and attempt limitations to ensure fair quiz practices.

## Tech Stack

Frontend - React(Vite), Tailwind CSS
Backend - FastAPI(Python)
Database - PostgreSQL (hosted on Neon)

## System Architecture

![System Architecture](https://github.com/user-attachments/assets/4ddb6157-df32-4cc8-a98b-2a642d7b5223)


## 🔍 How It Works

1. Teacher uploads syllabus (PDF)
2. Backend parses PDF and extracts structured topics
3. Teacher selects topic and quiz parameters
4. AI generates quiz questions
5. Students attempt quizzes
6. Performance is analyzed and stored, enabling adaptive learning and insights

## Our Target: SDG 4 – Quality Education

![SDG 4](https://github.com/user-attachments/assets/cf916483-a7b6-4df8-bb78-fc5926875385)

HASH aligns with UN Sustainable Development Goal 4 by promoting inclusive and quality education through AI-powered, personalized assessments. It aims to reduce the burden on teachers while ensuring every student receives support tailored to their learning needs.

