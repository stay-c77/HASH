import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft, Plus, Wand2, Clock, Users,
    BookOpen, Calendar, ChevronDown, X,
    Bell, Search, CheckCircle, FileText,
    Book, Trophy, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const AssignQuizzes = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [quizData, setQuizData] = useState({
        subject: '',
        topic: '',
        difficulty: 'medium',
        questionCount: 10,
        timeLimit: 30,
        dueDate: '',
        class: '',
    });
    const [showAIModal, setShowAIModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuizData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle quiz assignment
        console.log('Quiz Data:', quizData);
        navigate('/TeacherDashboard');
    };

    const handleGenerateWithAI = () => {
        setShowAIModal(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            {/* Sidebar */}
            <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col">
                {/* Logo */}
                <div className="mb-8 whitespace-nowrap">
                    <img
                        src="../Images/HashLogoDashboard.png"
                        alt="Hash Logo"
                        className="h-12 w-auto transition-transform duration-200 transform hover:scale-110"
                    />
                </div>

                <div className="border-b border-gray-700 mb-6"></div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="text-lg font-semibold mb-4 cursor-pointer text-white hover:text-purple-400"
                    onClick={() => navigate("/TeacherDashboard")}
                >
                    Dashboard
                </motion.div>

                <div className="border-b border-gray-700 mb-6"></div>

                {/* Quizzes Section */}
                <div className="mb-6">
                    <div className="text-[#8F8F8F] text-sm mb-3">QUIZZES</div>
                    <ul className="space-y-3">
                        <li className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg">
                            <Plus size={18} className="mr-2"/> Assign Quiz
                        </li>
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
                <div className="mb-6">
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
                            <BookOpen size={18} className="mr-2"/> Materials
                        </motion.li>
                    </ul>
                </div>

                <div className="border-b border-gray-700 mb-6"></div>

                {/* Students Section */}
                <div className="mb-6">
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
                <div className="mt-auto">
                    <button
                        onClick={() => setLogoutModalOpen(true)}
                        className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] transition-all duration-200 p-2 rounded-lg w-full"
                    >
                        <LogOut size={18} className="mr-2"/> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Navbar */}
                <div className="bg-[#1E1C2E] p-4 flex justify-between items-center shadow-md">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <motion.button whileHover={{scale: 1.1}} className="relative">
                            <Bell size={24} className="text-gray-300 hover:text-white"/>
                            <span
                                className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">3</span>
                        </motion.button>
                        <div className="flex items-center space-x-3">
                            <span className="text-white">Dr. Smith</span>
                            <motion.img
                                whileHover={{scale: 1.1}}
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Quiz Assignment Content */}
                <div className="p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl font-bold text-white">Assign New Quiz</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Step 1: Basic Details */}
                            <div className={`space-y-4 ${step !== 1 && 'hidden'}`}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={quizData.subject}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter subject name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Topic
                                    </label>
                                    <input
                                        type="text"
                                        name="topic"
                                        value={quizData.topic}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter topic name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Difficulty Level
                                    </label>
                                    <select
                                        name="difficulty"
                                        value={quizData.difficulty}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>
                            </div>

                            {/* Step 2: Quiz Settings */}
                            <div className={`space-y-4 ${step !== 2 && 'hidden'}`}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Number of Questions
                                    </label>
                                    <input
                                        type="number"
                                        name="questionCount"
                                        value={quizData.questionCount}
                                        onChange={handleInputChange}
                                        min="1"
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Time Limit (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        name="timeLimit"
                                        value={quizData.timeLimit}
                                        onChange={handleInputChange}
                                        min="1"
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={quizData.dueDate}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            {/* Step 3: Assign to Class */}
                            <div className={`space-y-4 ${step !== 3 && 'hidden'}`}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Select Class
                                    </label>
                                    <select
                                        name="class"
                                        value={quizData.class}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="">Select a class</option>
                                        <option value="CSE-A">CSE-A</option>
                                        <option value="CSE-B">CSE-B</option>
                                        <option value="CSE-C">CSE-C</option>
                                    </select>
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-6">
                                {step > 1 && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        type="button"
                                        onClick={() => setStep(step - 1)}
                                        className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        Previous
                                    </motion.button>
                                )}
                                <div className="flex space-x-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        type="button"
                                        onClick={handleGenerateWithAI}
                                        className="flex items-center space-x-2 px-6 py-2 bg-[#2D2B3D] rounded-lg hover:bg-[#3A3750] transition-colors"
                                    >
                                        <Wand2 size={18} />
                                        <span>Generate with AI</span>
                                    </motion.button>
                                    {step < 3 ? (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            type="button"
                                            onClick={() => setStep(step + 1)}
                                            className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                                        >
                                            Next
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            type="submit"
                                            className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                                        >
                                            Assign Quiz
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* AI Generation Modal */}
            <AnimatePresence>
                {showAIModal && (
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
                            className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-full max-w-md text-white relative"
                        >
                            <button
                                onClick={() => setShowAIModal(false)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Generate Quiz with AI</h2>
                            <p className="text-gray-400 mb-6">
                                Our AI will generate questions based on your subject and topic. You can review and modify them before assigning.
                            </p>
                            <div className="space-y-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => {
                                        // Handle AI generation
                                        setShowAIModal(false);
                                    }}
                                    className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Wand2 size={18} />
                                    <span>Generate Questions</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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

export default AssignQuizzes;