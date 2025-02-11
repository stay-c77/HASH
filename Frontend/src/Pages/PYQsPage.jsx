import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
import {
  FileText,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  Book,
  BookMarked,
  Trophy,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/LoginPage");
  };

  const subjects = [
    "Internetworking with TCP/IP",
    "Algorithm Analysis & Design",
    "Data Science",
    "Industrial Economics & Foreign trade",
    "Digital Image Processing",
    "Soft Computing",
    "Course Viva",
    "Computer Networks Lab",
  ];

  const pyqs = [
    "AAD/KTUS6IT/QNP2019SC/MAR2022",
    "AAD/KTUS6IT/QNP2018SC/SEP2021",
    "AAD/KTUS6IT/QNP2017SC/JUN2020",
  ];

  return (
    <div className="flex h-screen bg-[#2D2B3D]">
      {/* Sidebar */}
      <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Hash - Quiz Learning Platform</h1>
        </div>
        <div className="border-b border-gray-700 mb-6"></div>

        <div
            className={`text-lg font-semibold mb-4 cursor-pointer transition-colors duration-200 ${
                location.pathname === "/StudentDashboard" ? "text-purple-400" : "text-white hover:text-purple-400"
            }`}
            onClick={() => navigate("/StudentDashboard")}
        >
          Dashboard
        </div>

        <div className="border-b border-gray-700 mb-6"></div>

        {/* My Assignments Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">ASSIGNMENTS</div>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <CheckCircle size={18} className="mr-2"/> Completed Quizzes
            </li>
            <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <Clock size={18} className="mr-2"/> Upcoming Quizzes
            </li>
            <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <AlertCircle size={18} className="mr-2"/> Pending Quizzes
            </li>
          </ul>
        </div>

        <div className="border-b border-gray-700 mb-6"></div>

        {/* My Subjects Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">RESOURCES</div>
          <ul className="space-y-3">
            <li className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg">
              <FileText size={18} className="mr-2"/> PYQs
            </li>
            <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <Book size={18} className="mr-2"/> Syllabus
            </li>
            <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <BookMarked size={18} className="mr-2"/> Materials / Notes
            </li>
          </ul>
        </div>

        <div className="border-b border-gray-700 mb-6"></div>

        {/* Ranks Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">RANKS</div>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <Trophy size={18} className="mr-2"/> View Ranks
            </li>
          </ul>
        </div>

        <div className="border-b border-gray-700 mb-6"></div>

        {/* Teachers Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">TEACHERS</div>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <Users size={18} className="mr-2"/> My Teachers
            </li>
          </ul>
        </div>

        {/* Logout at bottom */}
        <div className="mt-auto">
          <button
              onClick={handleLogout}
              className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] transition-all duration-200 p-2 rounded-lg"
          >
            <LogOut size={18} className="mr-2"/> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Navbar */}
        <div className="bg-[#1E1C2E] p-4 flex justify-between items-center shadow-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
            <input
                type="text"
                placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative">
              <Bell size={24} className="text-gray-300 hover:text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">3</span>
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-white">Welcome, User</span>
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-[#1E1C2E] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Previous Year Question Papers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject, index) => (
                <motion.div
                  key={index}
                  initial={{ height: "5rem" }}
                  animate={{ height: expandedSubject === index ? "auto" : "5rem" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="bg-[#2D2B3D] p-4 rounded-lg cursor-pointer"
                  onClick={() => setExpandedSubject(expandedSubject === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-semibold">{subject}</h3>
                    <FileText className="text-[#7C3AED]" size={24} />
                  </div>

                  {/* PYQs Dropdown with Animation */}
                  <AnimatePresence>
                    {expandedSubject === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }} // Smooth close animation
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="mt-4 bg-[#1E1C2E] p-3 rounded-lg"
                      >
                        <h4 className="text-gray-300">PYQs:</h4>
                        <ul className="text-gray-400 text-sm mt-2 space-y-1">
                          {pyqs.map((pyq, pyqIndex) => (
                            <li key={pyqIndex} className="hover:text-white cursor-pointer">
                              {pyq}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
