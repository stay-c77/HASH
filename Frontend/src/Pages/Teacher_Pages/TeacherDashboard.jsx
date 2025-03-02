import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {
    Bell, Search, CheckCircle, FileText, Book,
    Users, LogOut, ChevronRight, Menu, ChevronLeft,
    X, PlusCircle, BookOpen, GraduationCap, Trophy,
    ChevronDown, Megaphone, Clock, AlertCircle, BookMarked
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Dummy data for recent activities
const recentActivities = [
    {
        type: "quiz_completed",
        class: "CSE-A Year 2",
        subject: "Data Structures",
        score: "85%",
        time: "2 hours ago"
    },
    {
        type: "quiz_assigned",
        subject: "Algorithms",
        class: "CSE-B Year 3",
        time: "5 hours ago"
    },
    {
        type: "topic_completed",
        subject: "Database Systems",
        topic: "Normalization",
        class: "CSE-A Year 2",
        time: "1 day ago"
    }
];

// Dummy data for announcements
const announcements = [
    {
        id: 1,
        from: "Dr. Manoj T Joy (HOD)",
        content: "Faculty meeting scheduled for tomorrow at 2 PM",
        time: "1 hour ago",
        type: "important"
    },
    {
        id: 2,
        from: "Prof. Sarah Wilson",
        content: "Updated syllabus for Data Structures course is now available",
        time: "3 hours ago",
        type: "academic"
    },
    {
        id: 3,
        from: "You",
        content: "Quiz postponed for CSE-A Year 2 to next week",
        time: "5 hours ago",
        type: "announcement"
    }
];

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedYear, setSelectedYear] = useState('Year 2');

    // Class statistics based on selected year
    const classStats = {
        'Year 1': {
            students: 45,
            quizzes: 8,
            avgScore: 78,
            topicsLeft: 5,
            quizzesToAssign: 3
        },
        'Year 2': {
            students: 50,
            quizzes: 10,
            avgScore: 82,
            topicsLeft: 3,
            quizzesToAssign: 2
        },
        'Year 3': {
            students: 48,
            quizzes: 7,
            avgScore: 75,
            topicsLeft: 6,
            quizzesToAssign: 4
        },
        'Year 4': {
            students: 52,
            quizzes: 9,
            avgScore: 80,
            topicsLeft: 4,
            quizzesToAssign: 2
        }
    };

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
                        <PlusCircle size={18} className="mr-2"/> Assign Quiz
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
                                3
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
                    {/* Student List Section */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] p-6 rounded-xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white text-lg font-semibold">Student List</h3>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="bg-[#2D2B3D] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                {Object.keys(classStats).map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-[#2D2B3D] p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-400">Total Students</p>
                                    <Users className="text-purple-400" size={20}/>
                                </div>
                                <p className="text-2xl font-bold text-white mt-2">{classStats[selectedYear].students}</p>
                            </div>
                            <div className="bg-[#2D2B3D] p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-400">Class Average</p>
                                    <GraduationCap className="text-green-400" size={20}/>
                                </div>
                                <p className="text-2xl font-bold text-white mt-2">{classStats[selectedYear].avgScore}%</p>
                            </div>
                            <div className="bg-[#2D2B3D] p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-400">Topics Left</p>
                                    <BookOpen className="text-yellow-400" size={20}/>
                                </div>
                                <p className="text-2xl font-bold text-white mt-2">{classStats[selectedYear].topicsLeft}</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{scale: 1.02}}
                            onClick={() => navigate("/MyStudents")}
                            className="mt-4 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
                        >
                            View All Students
                        </motion.button>
                    </motion.div>

                    {/* Active Quizzes */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.1}}
                        className="bg-[#1E1C2E] p-6 rounded-xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white text-lg font-semibold">Active Quizzes</h3>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                onClick={() => navigate("/AssignQuizzes")}
                                className="flex items-center space-x-2 bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                            >
                                <PlusCircle size={18}/>
                                <span>New Quiz</span>
                            </motion.button>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((quiz) => (
                                <motion.div
                                    key={quiz}
                                    whileHover={{scale: 1.01}}
                                    className="bg-[#2D2B3D] p-4 rounded-lg flex items-center justify-between"
                                >
                                    <div>
                                        <h4 className="text-white font-semibold">Data Structures Quiz {quiz}</h4>
                                        <p className="text-gray-400">Due in 2 days • CSE-A Year 2</p>
                                    </div>
                                    <motion.button
                                        whileHover={{scale: 1.05}}
                                        className="text-purple-400 hover:text-purple-300"
                                    >
                                        <ChevronRight size={20}/>
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Activity and Announcements Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Activity */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2}}
                            className="bg-[#1E1C2E] rounded-xl p-6"
                        >
                            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
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
                                                    {activity.type === "quiz_completed" && `${activity.class} completed ${activity.subject}`}
                                                    {activity.type === "quiz_assigned" && `New quiz assigned for ${activity.class}`}
                                                    {activity.type === "topic_completed" && `Completed ${activity.topic} in ${activity.class}`}
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

                        {/* Announcements */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3}}
                            className="bg-[#1E1C2E] rounded-xl p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-white">Announcements</h2>
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    className="flex items-center space-x-2 bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                                >
                                    <Megaphone size={18}/>
                                    <span>New Announcement</span>
                                </motion.button>
                            </div>
                            <div className="space-y-4">
                                {announcements.map((announcement, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{opacity: 0, x: -20}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{delay: 0.1 * (index + 1)}}
                                        className="bg-[#2D2B3D] p-4 rounded-lg"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-purple-400 font-semibold">{announcement.from}</span>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-gray-400 text-sm">{announcement.time}</span>
                                                </div>
                                                <p className="text-white mt-2">{announcement.content}</p>
                                            </div>
                                            {announcement.type === 'important' && (
                                                <AlertCircle className="text-red-400" size={20}/>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
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