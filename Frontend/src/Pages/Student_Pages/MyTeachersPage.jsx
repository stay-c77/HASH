import React, {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import {
    Search, Bell, CheckCircle, Clock, AlertCircle, FileText,
    Book, BookMarked, Trophy, Users, LogOut,
    ChevronDown, ChevronUp, GraduationCap, Award, BookOpen, X
} from 'lucide-react';

// Faculty data
const facultyData = [
    {
        name: "Dr. Manoj T Joy",
        position: "Head of Department",
        department: "Computer Science & Engineering",
        education: "Ph.D. in Computer Science",
        specialization: "Artificial Intelligence, Machine Learning",
        experience: "20+ years in academia",
        research: "Published over 30 papers in international journals",
        image: "Images/Manoj.jpg"
    },
    {
        name: "Sandhya Ramakrishnan",
        position: "Professor",
        department: "Computer Science & Engineering",
        education: "M.Tech in Computer Science",
        specialization: "Database Management, Big Data Analytics",
        experience: "15+ years in teaching",
        research: "Published papers in data mining and analytics",
        image: "Images/Sandhya.jpg"
    },
    {
        name: "Thomas Varughese",
        position: "Associate Professor",
        department: "Computer Science & Engineering",
        education: "M.Tech in Information Technology",
        specialization: "Network Security, Cryptography",
        experience: "12+ years in academia",
        research: "Research focus on cybersecurity protocols",
        image: "Images/Thomas.jpg"
    },
    {
        name: "Tojin Xavier",
        position: "System Administrator",
        department: "IT Support",
        education: "B.Tech in Information Technology",
        specialization: "System Administration, Network Management",
        experience: "10+ years in IT infrastructure",
        research: "Expertise in managing enterprise systems and security",
        image: "Images/Tojin.jpg"
    },
    {
        name: "Midhuna Jyothi R",
        position: "Assistant Professor",
        department: "Computer Science & Engineering",
        education: "M.Tech in Computer Science",
        specialization: "Data Science, Artificial Intelligence",
        experience: "7+ years in teaching",
        research: "Research on deep learning applications",
        image: "Images/Midhuna.jpg"
    },
    {
        name: "Saumya Sadanandan",
        position: "Assistant Professor",
        department: "Computer Science & Engineering",
        education: "M.Tech in Computer Science",
        specialization: "Cloud Computing, IoT",
        experience: "6+ years in academia",
        research: "Published work on cloud security",
        image: "Images/Saumya.jpg"
    },
    {
        name: "Mini Joswin",
        position: "Assistant Professor",
        department: "Computer Science & Engineering",
        education: "M.Tech in Computer Science",
        specialization: "Software Engineering, Human-Computer Interaction",
        experience: "5+ years in academia",
        research: "Active research in UI/UX design methodologies",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&fit=crop"
    },
    {
        name: "Joms Antony",
        position: "Assistant Professor",
        department: "Computer Science & Engineering",
        education: "M.Tech in Cybersecurity",
        specialization: "Ethical Hacking, Digital Forensics",
        experience: "6+ years in teaching",
        research: "Conducted workshops on ethical hacking",
        image: "Images/Joms.jpg"
    },
    {
        name: "Jincy Lukose",
        position: "Assistant Professor",
        department: "Computer Science & Engineering",
        education: "M.Tech in Computer Science",
        specialization: "Software Engineering, Web Technologies",
        experience: "8+ years in teaching",
        research: "Active research in software testing methodologies",
        image: "Images/Jincy.jpg"
    },
    {
        name: "Dr. Scaria Alex",
        position: "Assistant Professor",
        department: "Computer Science & Engineering",
        education: "Ph.D. in Computer Science",
        specialization: "Computer Vision, Image Processing",
        experience: "10+ years in research and teaching",
        research: "Published multiple papers on AI and image processing",
        image: "Images/Scaria.jpg"
    },
    {
        name: "Selin Sam",
        position: "Assistant Professor",
        department: "Computer Science & Engineering",
        education: "M.Tech in Information Security",
        specialization: "Cryptography, Network Security",
        experience: "5+ years in academia",
        research: "Focus on blockchain technology for cybersecurity",
        image: "Images/Selin.jpg"
    },
    {
        name: "Jintu Ann John",
        position: "Assistant Professor",
        department: "Computer Science & Engineering",
        education: "M.Tech in Software Engineering",
        specialization: "Agile Development, DevOps",
        experience: "6+ years in teaching",
        research: "Research in continuous integration and delivery",
        image: "Images/Jintu.jpg"
    },
    {
        name: "Rajimol Raju",
        position: "Assistant Professor",
        department: "Computer Science & Engineering",
        education: "M.Tech in Data Analytics",
        specialization: "Big Data, Predictive Analytics",
        experience: "7+ years in academia",
        research: "Research on AI-driven analytics models",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&fit=crop"
    },
    {
        name: "Jisha Babu",
        position: "Assistant Professor",
        department: "Computer Science & Engineering",
        education: "M.Tech in Information Technology",
        specialization: "Embedded Systems, IoT",
        experience: "6+ years in teaching",
        research: "Development of smart IoT solutions",
        image: "Images/Jisha.jpg"
    },
    {
        name: "Jaison Mathew John",
        position: "Assistant Professor",
        department: "Computer Science & Engineering",
        education: "M.Tech in Computer Science",
        specialization: "Software Development, Mobile Computing",
        experience: "5+ years in academia",
        research: "Researching AI applications in mobile apps",
        image: "Images/Jaison.jpg"
    },
    {
        name: "Haris Xavier",
        position: "Examcell Supervisor",
        department: "Examinations",
        education: "B.Tech in Computer Science",
        specialization: "Exam Management, Student Evaluation",
        experience: "10+ years in academic administration",
        research: "Developing efficient exam scheduling methods",
        image: "Images/Haris.jpg"
    },
    {
        name: "R Harikrishnan",
        position: "Lab Instructor",
        department: "Computer Science & Engineering",
        education: "B.Tech in Computer Science",
        specialization: "System Maintenance, Hardware",
        experience: "12+ years in lab management",
        research: "Improving lab efficiency for practical learning",
        image: "Images/Hari.jpg"
    },
    {
        name: "P G Renjithkumar",
        position: "Lab Instructor",
        department: "Computer Science & Engineering",
        education: "Diploma in Computer Science",
        specialization: "Networking, System Administration",
        experience: "10+ years in academia",
        research: "Optimizing lab infrastructure",
        image: "Images/Renjith.jpg"
    }
];

const TeachersPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [expandedId, setExpandedId] = useState(null);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const toggleExpand = (index) => {
        setExpandedId(expandedId === index ? null : index);
    };

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            {/* Sidebar */}
            <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col">
                {/* Logo */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Hash - Quiz Learning Platform</h1>
                </div>
                <div className="border-b border-gray-700 mb-6"></div>

                <motion.div
                    whileHover={{scale: 1.02}}
                    className={`text-lg font-semibold mb-4 cursor-pointer transition-colors duration-200 ${
                        location.pathname === "/StudentDashboard" ? "text-purple-400" : "text-white hover:text-purple-400"
                    }`}
                    onClick={() => navigate("/StudentDashboard")}
                >
                    Dashboard
                </motion.div>

                <div className="border-b border-gray-700 mb-6"></div>

                {/* My Assignments Section */}
                <div className="mb-6">
                    <div className="text-[#8F8F8F] text-sm mb-3">ASSIGNMENTS</div>
                    <ul className="space-y-3">
                        <motion.li whileHover={{x: 4}}
                                   className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                   onClick={() => navigate("/CompletedQuizPage")}>
                            <CheckCircle size={18} className="mr-2"/> Completed Quizzes
                        </motion.li>
                        <motion.li whileHover={{x: 4}}
                                   className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                   onClick={() => navigate("/UpcomingQuizPage")}>
                            <Clock size={18} className="mr-2"/> Upcoming Quizzes
                        </motion.li>
                        <motion.li whileHover={{x: 4}}
                                   className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                   onClick={() => navigate("/PendingQuizPage")}>
                            <AlertCircle size={18} className="mr-2"/> Pending Quizzes
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
                            onClick={() => navigate("/PYQsPage")}
                        >
                            <FileText size={18} className="mr-2"/> PYQs
                        </motion.li>
                        <motion.li whileHover={{x: 4}}
                                   className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                   onClick={() => navigate("/SyllabusPage")}>
                            <Book size={18} className="mr-2"/> Syllabus
                        </motion.li>
                        <motion.li whileHover={{x: 4}}
                                   className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                   onClick={() => navigate("/MaterialsPage")}>
                            <BookMarked size={18} className="mr-2"/> Materials / Notes
                        </motion.li>
                    </ul>
                </div>

                <div className="border-b border-gray-700 mb-6"></div>

                {/* Ranks Section */}
                <div className="mb-6">
                    <div className="text-[#8F8F8F] text-sm mb-3">RANKS</div>
                    <ul className="space-y-3">
                        <motion.li whileHover={{x: 4}}
                                   className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                   onClick={() => navigate("/RanksPage")}>
                            <Trophy size={18} className="mr-2"/> View Ranks
                        </motion.li>
                    </ul>
                </div>

                <div className="border-b border-gray-700 mb-6"></div>

                {/* Teachers Section */}
                <div className="mb-6">
                    <div className="text-[#8F8F8F] text-sm mb-3">TEACHERS</div>
                    <ul className="space-y-3">
                        <li className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg">
                            <Users size={18} className="mr-2"/> My Teachers
                        </li>
                    </ul>
                </div>

                {/* Logout */}
                <motion.div whileHover={{scale: 1.02}} className="mt-auto">
                    <button
                        onClick={() => setLogoutModalOpen(true)}
                        className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] transition-all duration-200 p-2 rounded-lg w-full"
                    >
                        <LogOut size={18} className="mr-2"/> Logout
                    </button>
                </motion.div>
            </div>

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
                                <button
                                    onClick={() => setLogoutModalOpen(false)}
                                    className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-200"
                                >
                                    Yes, Logout
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Navbar */}
                <div className="bg-[#1E1C2E] p-4 flex justify-between items-center shadow-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                        <input
                            type="text"
                            placeholder="Search faculty..."
                            className="pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="flex items-center space-x-6">
                        <motion.button whileHover={{scale: 1.1}} className="relative">
                            <Bell size={24} className="text-gray-300 hover:text-white"/>
                            <span
                                className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">3</span>
                        </motion.button>
                        <div className="flex items-center space-x-3">
                            <span className="text-white">Welcome, User</span>
                            <motion.img
                                whileHover={{scale: 1.1}}
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Teachers Content */}
                <div className="p-8">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-2xl p-8"
                    >
                        <h2 className="text-3xl font-bold text-white mb-8">My Teachers</h2>
                        <div className="space-y-4">
                            {facultyData.map((faculty, index) => (
                                <motion.div
                                    layout
                                    key={index}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: index * 0.1}}
                                    className="bg-[#2D2B3D] rounded-xl overflow-hidden"
                                >
                                    <motion.div
                                        layout="position"
                                        className="p-6 cursor-pointer flex items-center justify-between"
                                        onClick={() => toggleExpand(index)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <motion.img
                                                layout="position"
                                                src={faculty.image}
                                                alt={faculty.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <motion.h3 layout="position" className="text-white font-semibold">
                                                    {faculty.name}
                                                </motion.h3>
                                                <motion.p layout="position" className="text-purple-400">
                                                    {faculty.position}
                                                </motion.p>
                                            </div>
                                        </div>
                                        <motion.div
                                            animate={{rotate: expandedId === index ? 180 : 0}}
                                            transition={{duration: 0.3}}
                                        >
                                            <ChevronDown className="text-gray-400"/>
                                        </motion.div>
                                    </motion.div>

                                    <AnimatePresence>
                                        {expandedId === index && (
                                            <motion.div
                                                initial={{height: 0, opacity: 0}}
                                                animate={{height: "auto", opacity: 1}}
                                                exit={{height: 0, opacity: 0}}
                                                transition={{duration: 0.3, ease: "easeInOut"}}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-6 space-y-4">
                                                    <div className="border-t border-gray-700 pt-4">
                                                        <motion.div
                                                            initial={{opacity: 0, y: 20}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.2}}
                                                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                                        >
                                                            <div className="space-y-3">
                                                                <motion.div
                                                                    initial={{x: -20, opacity: 0}}
                                                                    animate={{x: 0, opacity: 1}}
                                                                    transition={{delay: 0.3}}
                                                                    className="flex items-center space-x-2"
                                                                >
                                                                    <GraduationCap className="text-purple-400"
                                                                                   size={20}/>
                                                                    <p className="text-gray-300">{faculty.education}</p>
                                                                </motion.div>
                                                                <motion.div
                                                                    initial={{x: -20, opacity: 0}}
                                                                    animate={{x: 0, opacity: 1}}
                                                                    transition={{delay: 0.4}}
                                                                    className="flex items-center space-x-2"
                                                                >
                                                                    <Award className="text-purple-400" size={20}/>
                                                                    <p className="text-gray-300">{faculty.specialization}</p>
                                                                </motion.div>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <motion.div
                                                                    initial={{x: 20, opacity: 0}}
                                                                    animate={{x: 0, opacity: 1}}
                                                                    transition={{delay: 0.5}}
                                                                    className="flex items-center space-x-2"
                                                                >
                                                                    <Users className="text-purple-400" size={20}/>
                                                                    <p className="text-gray-300">{faculty.experience}</p>
                                                                </motion.div>
                                                                <motion.div
                                                                    initial={{x: 20, opacity: 0}}
                                                                    animate={{x: 0, opacity: 1}}
                                                                    transition={{delay: 0.6}}
                                                                    className="flex items-center space-x-2"
                                                                >
                                                                    <BookOpen className="text-purple-400" size={20}/>
                                                                    <p className="text-gray-300">{faculty.research}</p>
                                                                </motion.div>
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TeachersPage;