import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Bell, Search, CheckCircle, FileText, Book,
    Users, LogOut, ChevronRight, Menu, ChevronLeft,
    X, PlusCircle, BookOpen, GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Dummy data for recent activities
const recentActivities = [
    {
        type: "quiz_completed",
        student: "Alex Thompson",
        subject: "Data Structures",
        score: "85%",
        time: "2 hours ago"
    },
    {
        type: "quiz_assigned",
        subject: "Algorithms",
        class: "CSE-A",
        time: "5 hours ago"
    },
    {
        type: "material_uploaded",
        subject: "Database Systems",
        topic: "Lecture Notes",
        time: "1 day ago"
    }
];

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="mb-8 whitespace-nowrap">
                <img
                    src="../Images/HashLogoDashboard.png"
                    alt="Hash Logo"
                    className="h-12 w-auto"
                />
            </div>

            <div className="border-b border-gray-700 mb-6"></div>

            <div className="text-lg font-semibold mb-4 whitespace-nowrap">Teacher Dashboard</div>

            <div className="border-b border-gray-700 mb-6"></div>

            {/* Quizzes Section */}
            <div className="mb-6 whitespace-nowrap">
                <div className="text-[#8F8F8F] text-sm mb-3">QUIZZES</div>
                <ul className="space-y-3">
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/CompletedQuizzes")}
                    >
                        <CheckCircle size={18} className="mr-2"/> Completed Quizzes
                    </motion.li>
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/AssignQuizzes")}
                    >
                        <PlusCircle size={18} className="mr-2"/> Assign Quiz
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
                        onClick={() => navigate("/Subjects")}
                    >
                        <BookOpen size={18} className="mr-2"/> My Subjects
                    </motion.li>
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/Materials")}
                    >
                        <FileText size={18} className="mr-2"/> Materials
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
                        <Users size={18} className="mr-2"/> My Students
                    </motion.li>
                </ul>
            </div>

            {/* Logout at bottom */}
            <div className="mt-auto whitespace-nowrap">
                <button
                    onClick={() => setLogoutModalOpen(true)}
                    className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] transition-all duration-200 p-2 rounded-lg w-full"
                >
                    <LogOut size={18} className="mr-2"/> Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#2D2B3D]">
            {/* Sidebar */}
            <motion.div
                initial={false}
                animate={{
                    width: sidebarOpen ? "16rem" : isMobile ? "0rem" : "16rem",
                    padding: sidebarOpen ? "1.5rem" : isMobile ? "0rem" : "1.5rem",
                    opacity: sidebarOpen ? 1 : isMobile ? 0 : 1
                }}
                transition={{duration: 0.3}}
                className={`bg-[#1E1C2E] text-white h-screen sticky top-0 overflow-hidden ${isMobile ? 'absolute z-30' : ''}`}
            >
                <SidebarContent/>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Top Navigation */}
                <div className="bg-[#1E1C2E] p-4 flex justify-between items-center sticky top-0 z-10">
                    <div className="flex items-center space-x-4">
                        {isMobile && (
                            <motion.button
                                whileHover={{scale: 1.1}}
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-white hover:text-purple-400 transition-colors"
                            >
                                {sidebarOpen ? <ChevronLeft size={24}/> : <Menu size={24}/>}
                            </motion.button>
                        )}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full sm:w-64 pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <motion.button whileHover={{scale: 1.1}} className="relative">
                            <Bell size={24} className="text-gray-300 hover:text-white"/>
                            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">
                                5
                            </span>
                        </motion.button>
                        <div className="flex items-center space-x-3">
                            <span className="text-white hidden sm:inline">Dr. Smith</span>
                            <motion.img
                                whileHover={{scale: 1.1}}
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            className="bg-[#1E1C2E] p-6 rounded-xl"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-white text-lg font-semibold">Total Students</h3>
                                <Users className="text-[#7C3AED]" size={24}/>
                            </div>
                            <p className="text-3xl font-bold text-white mt-2">156</p>
                            <p className="text-gray-400 text-sm mt-1">Across 4 classes</p>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            className="bg-[#1E1C2E] p-6 rounded-xl"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-white text-lg font-semibold">Active Quizzes</h3>
                                <Book className="text-[#7C3AED]" size={24}/>
                            </div>
                            <p className="text-3xl font-bold text-white mt-2">8</p>
                            <p className="text-gray-400 text-sm mt-1">Due this week</p>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2}}
                            className="bg-[#1E1C2E] p-6 rounded-xl"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-white text-lg font-semibold">Average Score</h3>
                                <GraduationCap className="text-[#7C3AED]" size={24}/>
                            </div>
                            <p className="text-3xl font-bold text-white mt-2">78%</p>
                            <p className="text-gray-400 text-sm mt-1">Last 30 days</p>
                        </motion.div>
                    </div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, x: -20}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{delay: 0.1 * (index + 1)}}
                                    className="bg-[#2D2B3D] p-4 rounded-lg"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-white font-semibold">
                                                {activity.type === "quiz_completed" && `${activity.student} completed ${activity.subject}`}
                                                {activity.type === "quiz_assigned" && `New quiz assigned for ${activity.class}`}
                                                {activity.type === "material_uploaded" && `New material uploaded for ${activity.subject}`}
                                            </h3>
                                            <p className="text-gray-400 text-sm">{activity.time}</p>
                                        </div>
                                        {activity.type === "quiz_completed" && (
                                            <span className="text-green-500 font-semibold">{activity.score}</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            <AnimatePresence>
                {logoutModalOpen && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    >
                        <motion.div
                            initial={{scale: 0.95, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.95, opacity: 0}}
                            className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-80 text-white relative"
                        >
                            <button
                                onClick={() => setLogoutModalOpen(false)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            >
                                <X size={20}/>
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
                            <p className="text-gray-400 mb-6">Are you sure you want to log out?</p>
                            <div className="flex justify-between">
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    onClick={() => setLogoutModalOpen(false)}
                                    className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg transition-all duration-200"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{scale: 1.05}}
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

export default TeacherDashboard;