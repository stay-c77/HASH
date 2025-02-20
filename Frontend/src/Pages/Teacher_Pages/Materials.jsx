import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft, Search, Upload, Download,
    FileText, Brain, ChevronDown, Folder,
    X, Plus, BookOpen, File
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Dummy data for materials
const materialsData = [
    {
        id: 1,
        subject: "Data Structures",
        type: "Lecture Notes",
        topic: "Binary Trees",
        uploadDate: "2024-02-20",
        size: "1.2 MB",
        format: "PDF"
    },
    {
        id: 2,
        subject: "Database Systems",
        type: "Presentation",
        topic: "SQL Basics",
        uploadDate: "2024-02-19",
        size: "2.8 MB",
        format: "PPT"
    },
    {
        id: 3,
        subject: "Operating Systems",
        type: "Tutorial",
        topic: "Process Scheduling",
        uploadDate: "2024-02-18",
        size: "1.5 MB",
        format: "PDF"
    }
];

const Materials = () => {
    const navigate = useNavigate();
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const handleUpload = () => {
        // Handle file upload logic
        setUploadModalOpen(false);
    };

    const handleGenerateSummary = (materialId) => {
        // Handle AI summary generation
        console.log('Generating summary for:', materialId);
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
                    <h1 className="text-2xl font-bold">Materials & Notes</h1>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setUploadModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                >
                    <Plus size={20} />
                    <span>Upload Material</span>
                </motion.button>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-[#1E1C2E] p-4 rounded-xl mb-6">
                <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search materials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <select
                            className="px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                        >
                            <option value="all">All Types</option>
                            <option value="notes">Lecture Notes</option>
                            <option value="presentations">Presentations</option>
                            <option value="tutorials">Tutorials</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Materials List */}
            <div className="space-y-4">
                {materialsData.map((material) => (
                    <motion.div
                        key={material.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#1E1C2E] p-6 rounded-xl"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-[#2D2B3D] rounded-lg">
                                    {material.format === 'PDF' ? (
                                        <FileText className="text-red-400" size={24} />
                                    ) : (
                                        <File className="text-blue-400" size={24} />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">{material.subject}</h3>
                                    <p className="text-gray-400">{material.topic}</p>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <span className="text-sm text-gray-400">{material.type}</span>
                                        <span className="text-sm text-gray-400">{material.size}</span>
                                        <span className="text-sm text-gray-400">{material.uploadDate}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => handleGenerateSummary(material.id)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-[#2D2B3D] rounded-lg hover:bg-[#3A3750] transition-colors"
                                >
                                    <Brain size={18} />
                                    <span>AI Summary</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 rounded-lg hover:bg- purple-700 transition-colors"
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
                            <h2 className="text-xl font-semibold mb-4">Upload Material</h2>
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
                                        Topic
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter topic name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Material Type
                                    </label>
                                    <select className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                                        <option value="notes">Lecture Notes</option>
                                        <option value="presentation">Presentation</option>
                                        <option value="tutorial">Tutorial</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div
                                    className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer"
                                >
                                    <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                                    <p className="text-gray-400">Click to upload or drag and drop</p>
                                    <p className="text-sm text-gray-500">PDF, PPT, or DOCX files</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    onClick={handleUpload}
                                    className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                                >
                                    Upload Material
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Materials;