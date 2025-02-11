import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import PYQsPage from "./pages/PYQsPage";
import SyllabusPage from "./pages/SyllabusPage";
import MaterialsPage from "./pages/MaterialsPage";
import RanksPage from "./pages/RanksPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RanksPage />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
