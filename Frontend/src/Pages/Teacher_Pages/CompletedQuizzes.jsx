import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, Search, Eye, Download } from 'lucide-react';
import TeacherNavbar from '../../Components/TeacherNavbar';
import TeacherSidebar from '../../Components/TeacherSidebar';
import LogoutModal from '../../Components/LogoutModal';

// Dummy data for completed quizzes
const completedQuizzes = [
    {
        topic: "Data Structures: Binary Trees",
        subject: "Data Structures",
        totalQuestions: 20,
        answeredCorrect: 18,
        score: 90,
        class: "CSE-A Year 2",
        date: "2024-03-15",
    },
    {
        topic: "Network Protocols",
        subject: "Computer Networks",
        totalQuestions: 25,
        answeredCorrect: 15,
        score: 60,
        class: "CSE-B Year 3",
        date: "2024-03-14",
    },
    {
        topic: "Machine Learning Basics",
        subject: "Artificial Intelligence",
        totalQuestions: 30,
        answeredCorrect: 28,
        score: 93,
        class: "CSE-A Year 4",
        date: "2024-03-13",
    }
];

const CompletedQuizzes = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const handleViewDetails = (quizId) => {
        navigate(`/quiz-details/${quizId}`);
    };

    const handleExportData = (quizId) => {
        console.log('Exporting data for quiz:', quizId);
    };

    const filteredQuizzes = completedQuizzes.filter(quiz =>
        quiz.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.class.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            {/* Sidebar */}
            <div className="w-64">
                <TeacherSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="CompletedQuizzes" />
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                <TeacherNavbar searchPlaceholder="Search quizzes..." searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                <div className="p-6 overflow-y-auto flex-1">
                    {filteredQuizzes.map((quiz, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#1E1C2E] p-6 rounded-xl hover:shadow-lg transition-all duration-300 mb-4"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-semibold text-white">{quiz.subject}</h3>
                                    <p className="text-gray-400">{quiz.topic}</p>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <span className="text-sm text-gray-400">Class: {quiz.class}</span>
                                        <span className="text-sm text-gray-400">Date: {quiz.date}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-purple-500">{quiz.score}%</p>
                                        <p className="text-sm text-gray-400">Average Score</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-green-500">
                                            {quiz.answeredCorrect}/{quiz.totalQuestions}
                                        </p>
                                        <p className="text-sm text-gray-400">Correct Answers</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => handleExportData(index)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-[#2D2B3D] rounded-lg hover:bg-[#3A3750] transition-colors text-white"
                                >
                                    <Download size={18} />
                                    <span>Export</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => handleViewDetails(index)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors text-white"
                                >
                                    <Eye size={18} />
                                    <span>View Details</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <LogoutModal
                isOpen={logoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
};

export default CompletedQuizzes;
