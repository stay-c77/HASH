import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/Student_Pages/StudentDashboard";
import QuizPage from "./pages/Student_Pages/QuizPage";
import ResultsPage from "./pages/Student_Pages/ResultsPage";
import PYQsPage from "./pages/Student_Pages/PYQsPage";
import SyllabusPage from "./pages/Student_Pages/SyllabusPage";
import MaterialsPage from "./pages/Student_Pages/MaterialsPage";
import RanksPage from "./pages/Student_Pages/RanksPage";
import MyTeachersPage from "./pages/Student_Pages/MyTeachersPage.jsx";
import TeacherDashboard from "./pages/Teacher_Pages/TeacherDashboard";
import CompletedQuizPage from "./pages/Student_Pages/CompletedQuizPage"
import UpcomingQuizPage from "./pages/Student_Pages/UpcomingQuizPage"
import PendingQuizPage from "./pages/Student_Pages/PendingQuizPage"
import AdminDashboard from "./pages/Admin_Pages/AdminDashboard"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/CompletedQuizPage" element={<CompletedQuizPage />} />
        <Route path="/UpcomingQuizPage" element={<UpcomingQuizPage />} />
        <Route path="/PendingQuizPage" element={<PendingQuizPage />} />
        <Route path="/QuizPage" element={<QuizPage />} />
        <Route path="/ResultsPage" element={<ResultsPage />} />
        <Route path="/PYQsPage" element={<PYQsPage />} />
        <Route path="/SyllabusPage" element={<SyllabusPage />} />
        <Route path="/MaterialsPage" element={<MaterialsPage />} />
        <Route path="/RanksPage" element={<RanksPage />} />
        <Route path="/MyTeachersPage" element={<MyTeachersPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
