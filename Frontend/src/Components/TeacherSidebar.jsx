import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Plus, CheckCircle, FileText, Book, BookMarked,
    Trophy, Users, LogOut
} from 'lucide-react';

const TeacherSidebar = ({ onLogout }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="mb-8 whitespace-nowrap">
                <Link to="/TeacherDashboard">
                    <img
                        src="../Images/HashLogoDashboard.png"
                        alt="Hash Logo"
                        className="h-12 w-auto transition-transform duration-200 transform hover:scale-110"
                    />
                </Link>
            </div>

            <div className="border-b border-gray-700 mb-6"></div>

            <Link
                to="/TeacherDashboard"
                className="text-lg font-semibold mb-4 whitespace-nowrap text-white hover:text-purple-400 transition-colors"
            >
                Dashboard
            </Link>

            <div className="border-b border-gray-700 mb-6"></div>

            {/* Quizzes Section */}
            <div className="mb-6 whitespace-nowrap">
                <div className="text-[#8F8F8F] text-sm mb-3">QUIZZES</div>
                <ul className="space-y-3">
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/AssignQuizzes")}
                    >
                        <Plus size={18} className="mr-2"/> Assign Quiz
                    </motion.li>
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/CompletedQuizzes")}
                    >
                        <CheckCircle size={18} className="mr-2"/> Completed Quizzes
                    </motion.li>
                </ul>
            </div>

            <div className="border-b border-gray-700 mb-6"></div>

            {/* Resources Section */}
            <div className="mb-6 whitespace-nowrap">
                <div className="text-[#8F8F8F] text-sm mb-3">RESOURCES</div>
                <ul className="space-y-3">
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/Syllabus")}
                    >
                        <Book size={18} className="mr-2"/> Syllabus
                    </motion.li>
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/PYQs")}
                    >
                        <FileText size={18} className="mr-2"/> PYQs
                    </motion.li>
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/Materials")}
                    >
                        <BookMarked size={18} className="mr-2"/> Materials
                    </motion.li>
                </ul>
            </div>

            <div className="border-b border-gray-700 mb-6"></div>

            {/* Students Section */}
            <div className="mb-6 whitespace-nowrap">
                <div className="text-[#8F8F8F] text-sm mb-3">STUDENTS</div>
                <ul className="space-y-3">
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/MyStudents")}
                    >
                        <Users size={18} className="mr-2"/> Student Section
                    </motion.li>
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/ViewRanks")}
                    >
                        <Trophy size={18} className="mr-2"/> Ranks Section
                    </motion.li>
                </ul>
            </div>

            {/* Logout at bottom */}
            <div className="mt-auto whitespace-nowrap">
                <button
                    onClick={onLogout}
                    className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] transition-all duration-200 p-2 rounded-lg w-full"
                >
                    <LogOut size={18} className="mr-2"/> Logout
                </button>
            </div>
        </div>
    );
};

export default TeacherSidebar;