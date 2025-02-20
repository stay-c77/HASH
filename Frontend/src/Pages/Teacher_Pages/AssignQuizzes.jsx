import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft, Plus, Wand2, Clock, Users,
    BookOpen, Calendar, ChevronDown, X
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const AssignQuiz = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
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
        navigate('/teacher-dashboard');
    };

    const handleGenerateWithAI = () => {
        setShowAIModal(true);
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
                    <h1 className="text-2xl font-bold">Assign New Quiz</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#1E1C2E] rounded-xl p-6"
                >
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
                                <button
                                    onClick={() => {
                                        // Handle AI generation
                                        setShowAIModal(false);
                                    }}
                                    className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Wand2 size={18} />
                                    <span>Generate Questions</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AssignQuiz;