import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Search, ArrowLeft, Download, BarChart3,
    Eye, Filter, ChevronDown
} from 'lucide-react';
import { motion } from "framer-motion";

// Dummy data for completed quizzes
const completedQuizzes = [
    {
        id: 1,
        subject: "Data Structures",
        topic: "Binary Trees",
        class: "CSE-A",
        studentsCompleted: 45,
        totalStudents: 50,
        averageScore: 82,
        date: "2024-03-15"
    },
    {
        id: 2,
        subject: "Algorithms",
        topic: "Dynamic Programming",
        class: "CSE-B",
        studentsCompleted: 38,
        totalStudents: 48,
        averageScore: 75,
        date: "2024-03-14"
    },
    {
        id: 3,
        subject: "Database Systems",
        topic: "SQL Queries",
        class: "CSE-A",
        studentsCompleted: 42,
        totalStudents: 50,
        averageScore: 88,
        date: "2024-03-13"
    }
];

const CompletedQuizzes = () => {
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const handleViewDetails = (quizId) => {
        // Navigate to quiz details page
        navigate(`/quiz-details/${quizId}`);
    };

    const handleExportData = (quizId) => {
        // Handle exporting quiz data
        console.log('Exporting data for quiz:', quizId);
    };

    return (
        <div className="min-h-screen bg-[#2D2B3D] text-white p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => navigate('/teacher-dashboard')}
                        className="text-white hover:text-purple-400 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </motion.button>
                    <h1 className="text-2xl font-bold">Completed Quizzes</h1>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-[#1E1C2E] p-4 rounded-xl mb-6">
                <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search quizzes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative"
                        >
                            <button
                                className="flex items-center space-x-2 bg-[#2D2B3D] px-4 py-2 rounded-lg hover:bg-[#3A3750] transition-colors"
                            >
                                <Filter size={20} />
                                <span>Filter</span>
                                <ChevronDown size={16} />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Quiz List */}
            <div className="space-y-4">
                {completedQuizzes.map((quiz) => (
                    <motion.div
                        key={quiz.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#1E1C2E] p-6 rounded-xl"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                            <div>
                                <h3 className="text-xl font-semibold">{quiz.subject}</h3>
                                <p className="text-gray-400">{quiz.topic}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <span className="text-sm text-gray-400">Class: {quiz.class}</span>
                                    <span className="text-sm text-gray-400">Date: {quiz.date}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-purple-500">{quiz.averageScore}%</p>
                                    <p className="text-sm text-gray-400">Average Score</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-500">
                                        {quiz.studentsCompleted}/{quiz.totalStudents}
                                    </p>
                                    <p className="text-sm text-gray-400">Completed</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                onClick={() => handleExportData(quiz.id)}
                                className="flex items-center space-x-2 px-4 py-2 bg-[#2D2B3D] rounded-lg hover:bg-[#3A3750] transition-colors"
                            >
                                <Download size={18} />
                                <span>Export</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                onClick={() => handleViewDetails(quiz.id)}
                                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                <Eye size={18} />
                                <span>View Details</span>
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CompletedQuizzes;