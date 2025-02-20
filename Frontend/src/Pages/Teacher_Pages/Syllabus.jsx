import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft, Search, CheckCircle, Clock,
    BookOpen, ChevronDown, ChevronRight,
    Plus, X
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Dummy data for syllabus
const syllabusData = [
    {
        id: 1,
        subject: "Data Structures",
        units: [
            {
                title: "Unit 1: Introduction to Data Structures",
                topics: [
                    { name: "Arrays and Linked Lists", completed: true },
                    { name: "Stacks and Queues", completed: true },
                    { name: "Trees and Graphs", completed: false }
                ],
                progress: 66
            },
            {
                title: "Unit 2: Advanced Data Structures",
                topics: [
                    { name: "Binary Search Trees", completed: false },
                    { name: "AVL Trees", completed: false },
                    { name: "Hash Tables", completed: false }
                ],
                progress: 0
            }
        ]
    },
    {
        id: 2,
        subject: "Database Systems",
        units: [
            {
                title: "Unit 1: Database Fundamentals",
                topics: [
                    { name: "Introduction to DBMS", completed: true },
                    { name: "ER Diagrams", completed: true },
                    { name: "Relational Model", completed: true }
                ],
                progress: 100
            },
            {
                title: "Unit 2: SQL and Normalization",
                topics: [
                    { name: "Basic SQL", completed: true },
                    { name: "Advanced Queries", completed: false },
                    { name: "Normal Forms", completed: false }
                ],
                progress: 33
            }
        ]
    }
];

const Syllabus = () => {
    const navigate = useNavigate();
    const [addTopicModalOpen, setAddTopicModalOpen] = useState(false);
    const [expandedSubjects, setExpandedSubjects] = useState(new Set());

    const toggleSubject = (id) => {
        const newExpanded = new Set(expandedSubjects);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedSubjects(newExpanded);
    };

    const handleAddTopic = () => {
        // Handle adding new topic
        setAddTopicModalOpen(false);
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
                    <h1 className="text-2xl font-bold">Syllabus</h1>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setAddTopicModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                >
                    <Plus size={20} />
                    <span>Add Topic</span>
                </motion.button>
            </div>

            {/* Search Bar */}
            <div className="bg-[#1E1C2E] p-4 rounded-xl mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search in syllabus..."
                        className="w-full pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </div>

            {/* Syllabus Content */}
            <div className="space-y-6">
                {syllabusData.map((subject) => (
                    <motion.div
                        key={subject.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#1E1C2E] rounded-xl overflow-hidden"
                    >
                        <div
                            className="p-6 cursor-pointer"
                            onClick={() => toggleSubject(subject.id)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <BookOpen className="text-purple-500" size={24} />
                                    <h2 className="text-xl font-semibold">{subject.subject}</h2>
                                </div>
                                <motion.div
                                    animate={{ rotate: expandedSubjects.has(subject.id) ? 90 : 0 }}
                                >
                                    <ChevronRight size={24} />
                                </motion.div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {expandedSubjects.has(subject.id) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-gray-700"
                                >
                                    {subject.units.map((unit, unitIndex) => (
                                        <div key={unitIndex} className="p-6 border-b border-gray-700 last:border-b-0">
                                            <h3 className="text-lg font-semibold mb-4">{unit.title}</h3>
                                            <div className="space-y-3">
                                                {unit.topics.map((topic, topicIndex) => (
                                                    <div
                                                        key={topicIndex}
                                                        className="flex items-center justify-between bg-[#2D2B3D] p-3 rounded-lg"
                                                    >
                                                        <div className="flex items-center space-x-3">
                                                            {topic.completed ? (
                                                                <CheckCircle className="text-green-500" size={20} />
                                                            ) : (
                                                                <Clock className="text-yellow-500" size={20} />
                                                            )}
                                                            <span>{topic.name}</span>
                                                        </div>
                                                        <span className={`text-sm ${topic.completed ? 'text-green-500' : 'text-yellow-500'}`}>
                                                            {topic.completed ? 'Completed' : 'Pending'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-4">
                                                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                                                    <span>Progress</span>
                                                    <span>{unit.progress}%</span>
                                                </div>
                                                <div className="w-full bg-[#2D2B3D] rounded-full h-2">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${unit.progress}%` }}
                                                        className="bg-purple-600 h-2 rounded-full"
                                                    ></motion.div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Add Topic Modal */}
            <AnimatePresence>
                {addTopicModalOpen && (
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
                                onClick={() => setAddTopicModalOpen(false)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Add New Topic</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <select className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                                        <option value="">Select Subject</option>
                                        {syllabusData.map(subject => (
                                            <option key={subject.id} value={subject.id}>
                                                {subject.subject}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Unit
                                    </label>
                                    <select className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                                        <option value="">Select Unit</option>
                                        <option value="unit1">Unit 1</option>
                                        <option value="unit2">Unit 2</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Topic Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter topic name"
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    onClick={handleAddTopic}
                                    className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                                >
                                    Add Topic
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Syllabus;