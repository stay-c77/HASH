import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import PYQsPage from "./pages/PYQsPage";
import SyllabusPage from "./pages/SyllabusPage";
import MaterialsPage from "./pages/MaterialsPage";
import RanksPage from "./pages/RanksPage";
import MyTeachersPage from "./Pages/MyTeachersPage.jsx";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
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
