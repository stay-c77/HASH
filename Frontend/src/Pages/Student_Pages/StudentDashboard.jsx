import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Bell, Search, Users, BookOpen, GraduationCap,
    Menu, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import StudentNavbar from '../../Components/StudentNavbar';
import StudentSidebar from '../../Components/StudentSidebar';
import LogoutModal from '../../Components/LogoutModal';

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

const StudentDashboard = () => {
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
                <StudentSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="StudentDashboard" />
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
                            <span className="text-white hidden sm:inline">Welcome, User</span>
                            <motion.img
                                whileHover={{scale: 1.1}}
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">

                    {/* Continue Learning Section */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Continue Learning</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <motion.div
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: 0.1}}
                                className="bg-[#2D2B3D] p-4 rounded-lg hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-white font-semibold">Data Structures</h3>
                                        <p className="text-gray-400 text-sm">Chapter 4: Binary Trees</p>
                                    </div>
                                    <motion.div
                                        whileHover={{scale: 1.05}}
                                        className="bg-[#7C3AED] text-white text-xs px-2 py-1 rounded"
                                    >
                                        In Progress
                                    </motion.div>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                                    <motion.div
                                        initial={{width: 0}}
                                        animate={{width: "60%"}}
                                        transition={{duration: 0.8, ease: "easeOut"}}
                                        className="bg-[#7C3AED] h-2 rounded-full"
                                    ></motion.div>
                                </div>
                                <p className="text-gray-400 text-sm">60% Complete</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Recommended Materials */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Recommended Materials</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <motion.div
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: 0.3}}
                                whileHover={{scale: 1.02}}
                                className="bg-[#2D2B3D] p-4 rounded-lg"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-white font-semibold">Advanced Algorithms</h3>
                                        <p className="text-gray-400 text-sm">Recommended based on your progress</p>
                                    </div>
                                    <motion.div whileHover={{rotate: 15}}>
                                        <BookOpen className="text-[#7C3AED]" size={24}/>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Upcoming Semester */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.5}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Upcoming Semester</h2>
                        <motion.div
                            whileHover={{scale: 1.01}}
                            className="bg-[#2D2B3D] p-4 rounded-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-white font-semibold">Semester 7</h3>
                                    <p className="text-gray-400 text-sm">Starting from August 2024</p>
                                </div>
                                <motion.div
                                    whileHover={{rotate: 15}}
                                    transition={{duration: 0.2}}
                                >
                                    <GraduationCap className="text-[#7C3AED]" size={24}/>
                                </motion.div>
                            </div>
                            <motion.div
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.6}}
                                className="mt-4"
                            >
                                <p className="text-gray-300 text-sm">New subjects:</p>
                                <ul className="list-disc list-inside text-gray-400 text-sm mt-2">
                                    <motion.li
                                        initial={{opacity: 0, x: -10}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{delay: 0.7}}
                                    >
                                        Advanced Database Management
                                    </motion.li>
                                    <motion.li
                                        initial={{opacity: 0, x: -10}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{delay: 0.8}}
                                    >
                                        Cloud Computing
                                    </motion.li>
                                    <motion.li
                                        initial={{opacity: 0, x: -10}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{delay: 0.9}}
                                    >
                                        Artificial Intelligence
                                    </motion.li>
                                </ul>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Logout Modal */}
            <LogoutModal
                isOpen={logoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />

            {/* Overlay for mobile when sidebar is open */}
            {isMobile && sidebarOpen && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default StudentDashboard;