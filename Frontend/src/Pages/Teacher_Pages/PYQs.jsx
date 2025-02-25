import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft, Search, Upload, Download,
    Filter, ChevronDown, Brain,
    X, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Dummy data for PYQs
const pyqsData = [
    {
        id: 1,
        subject: "Data Structures",
        year: "2023",
        semester: "Fall",
        difficulty: "Medium",
        commonTopics: ["Binary Trees", "Graph Algorithms"],
        fileSize: "2.5 MB"
    },
    {
        id: 2,
        subject: "Database Systems",
        year: "2023",
        semester: "Spring",
        difficulty: "Hard",
        commonTopics: ["Normalization", "Transaction Management"],
        fileSize: "1.8 MB"
    },
    {
        id: 3,
        subject: "Operating Systems",
        year: "2022",
        semester: "Fall",
        difficulty: "Medium",
        commonTopics: ["Process Scheduling", "Memory Management"],
        fileSize: "2.1 MB"
    }
];

const PYQs = () => {
    const navigate = useNavigate();
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const handleUpload = () => {
        // Handle file upload logic
        setUploadModalOpen(false);
    };

    const handleAnalyze = (pyqId) => {
        // Handle AI analysis logic
        console.log('Analyzing PYQ:', pyqId);
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
                    <h1 className="text-2xl font-bold">Previous Year Questions</h1>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setUploadModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                >
                    <Plus size={20} />
                    <span>Upload PYQ</span>
                </motion.button>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-[#1E1C2E] p-4 rounded-xl mb-6">
                <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search PYQs..."
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

            {/* PYQs List */}
            <div className="space-y-4">
                {pyqsData.map((pyq) => (
                    <motion.div
                        key={pyq.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#1E1C2E] p-6 rounded-xl"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                            <div>
                                <h3 className="text-xl font-semibold">{pyq.subject}</h3>
                                <div className="flex items-center space-x-4 mt-2">
                                    <span className="text-sm text-gray-400">{pyq.semester} {pyq.year}</span>
                                    <span className="text-sm text-purple-400">Difficulty: {pyq.difficulty}</span>
                                </div>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-400">Common Topics:</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {pyq.commonTopics.map((topic, index) => (
                                            <span
                                                key={index}
                                                className="text-xs bg-[#2D2B3D] text-purple-400 px-2 py-1 rounded"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => handleAnalyze(pyq.id)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-[#2D2B3D] rounded-lg hover:bg-[#3A3750] transition-colors"
                                >
                                    <Brain size={18} />
                                    <span>AI Analysis</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    <Download size={18} />
                                    <span>Download</span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Upload Modal */}
            <AnimatePresence>
                {uploadModalOpen && (
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
                                onClick={() => setUploadModalOpen(false)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Upload PYQ</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter subject name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Year & Semester
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            className="px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            placeholder="Year"
                                        />
                                        <select
                                            className="px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="fall">Fall</option>
                                            <option value="spring">Spring</option>
                                        </select>
                                    </div>
                                </div>
                                <div
                                    className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer"
                                >
                                    <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                                    <p className="text-gray-400">Click to upload or drag and drop</p>
                                    <p className="text-sm text-gray-500">PDF or Word files only</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    onClick={handleUpload}
                                    className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                                >
                                    Upload PYQ
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PYQs;