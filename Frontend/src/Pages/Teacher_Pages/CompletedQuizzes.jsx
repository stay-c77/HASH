import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {
    Download, Eye, Filter, ChevronDown, X
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import TeacherNavbar from '../../Components/TeacherNavbar';
import TeacherSidebar from '../../Components/TeacherSidebar';
import axios from 'axios';

const CompletedQuizzes = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [quizDetails, setQuizDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user?.teacher_id) {
                    console.error('No teacher ID found');
                    return;
                }

                const response = await axios.get(`http://localhost:8000/api/teacher/completed-quizzes/${user.teacher_id}`);
                setQuizzes(response.data.quizzes);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const handleViewDetails = async (quizId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/quiz/details/${quizId}`);
            setQuizDetails(response.data);
            setDetailsModalOpen(true);
        } catch (error) {
            console.error('Error fetching quiz details:', error);
        }
    };

    const handleExportData = async (quizId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/quiz/export/${quizId}`, {
                responseType: 'blob'
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `quiz_results_${quizId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error exporting quiz data:', error);
        }
    };

    const filteredQuizzes = quizzes.filter(quiz => {
        const matchesSearch = quiz.subject_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            quiz.topic_name.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (selectedFilter === 'all') return matchesSearch;
        if (selectedFilter === 'high') return matchesSearch && quiz.average_score >= 80;
        if (selectedFilter === 'medium') return matchesSearch && quiz.average_score >= 60 && quiz.average_score < 80;
        if (selectedFilter === 'low') return matchesSearch && quiz.average_score < 60;
        return matchesSearch;
    });

    // Details Modal Component
    const DetailsModal = ({ isOpen, onClose, details }) => {
        if (!isOpen || !details) return null;

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-[800px] max-h-[80vh] overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Quiz Details</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="bg-[#2D2B3D] p-4 rounded-lg mb-6">
                        <h3 className="text-xl font-semibold text-white mb-2">{details.quiz_info.subject_name}</h3>
                        <div className="grid grid-cols-2 gap-4 text-gray-300">
                            <p>Topic: {details.quiz_info.topic_name}</p>
                            <p>Difficulty: {details.quiz_info.difficulty}</p>
                            <p>Questions: {details.quiz_info.no_of_questions}</p>
                            <p>Due Date: {new Date(details.quiz_info.end_date).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {details.student_results.map((student, index) => (
                            <motion.div
                                key={student.student_id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#2D2B3D] p-4 rounded-lg"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={student.student_pic || "https://via.placeholder.com/40"}
                                            alt={student.student_name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <h4 className="text-white font-semibold">{student.student_name}</h4>
                                            <p className="text-gray-400">Grade: {student.grade}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-white">{student.percentage}%</p>
                                        <p className="text-gray-400">
                                            {student.correct_answers}/{student.total_questions} correct
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col h-screen overflow-hidden">
                <TeacherSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="CompletedQuizzes" />
            </div>

            <div className="flex-1 overflow-auto">
                <TeacherNavbar />

                <div className="p-6">
                    <div className="bg-[#1E1C2E] p-6 rounded-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Completed Quizzes</h2>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search quizzes..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <select
                                    value={selectedFilter}
                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                    className="px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="all">All Results</option>
                                    <option value="high">High Performance (≥80%)</option>
                                    <option value="medium">Medium Performance (60-79%)</option>
                                    <option value="low">Low Performance (60%)</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center text-gray-400 py-8">Loading quizzes...</div>
                        ) : filteredQuizzes.length === 0 ? (
                            <div className="text-center text-gray-400 py-8">No quizzes found</div>
                        ) : (
                            <div className="space-y-4">
                                {filteredQuizzes.map((quiz) => (
                                    <motion.div
                                        key={quiz.quiz_id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-[#2D2B3D] p-6 rounded-xl"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white">{quiz.subject_name}</h3>
                                                <p className="text-gray-400">{quiz.topic_name}</p>
                                                <div className="flex items-center space-x-4 mt-2">
                                                    <span className="text-sm text-gray-400">
                                                        Due: {new Date(quiz.end_date).toLocaleDateString()}
                                                    </span>
                                                    <span className="text-sm text-gray-400">
                                                        Difficulty: {quiz.difficulty}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-purple-500">
                                                        {quiz.average_score || 0}%
                                                    </p>
                                                    <p className="text-sm text-gray-400">Average Score</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-green-500">
                                                        {quiz.students_completed || 0}/{quiz.total_students}
                                                    </p>
                                                    <p className="text-sm text-gray-400">Completed</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-end space-x-4">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                onClick={() => handleExportData(quiz.quiz_id)}
                                                className="flex items-center space-x-2 px-4 py-2 bg-[#2D2B3D] rounded-lg hover:bg-[#3A3750] transition-colors text-white"
                                            >
                                                <Download size={18} />
                                                <span>Export</span>
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                onClick={() => handleViewDetails(quiz.quiz_id)}
                                                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors text-white"
                                            >
                                                <Eye size={18} />
                                                <span>View Details</span>
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <DetailsModal
                isOpen={detailsModalOpen}
                onClose={() => setDetailsModalOpen(false)}
                details={quizDetails}
            />

            {/* Logout Modal */}
            <AnimatePresence>
                {logoutModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-80 text-white relative"
                        >
                            <button
                                onClick={() => setLogoutModalOpen(false)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
                            <p className="text-gray-400 mb-6">Are you sure you want to log out?</p>
                            <div className="flex justify-between">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setLogoutModalOpen(false)}
                                    className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg transition-all duration-200"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-200"
                                >
                                    Yes, Logout
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CompletedQuizzes;