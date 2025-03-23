import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Bell, Search, Plus, Wand2, X, ChevronDown,
    CheckCircle, FileText, Book, BookMarked,
    Trophy, Users, LogOut, Edit2, Eye
} from 'lucide-react';
import {motion, AnimatePresence} from "framer-motion";
import axios from 'axios';

const AssignQuizzes = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [modules, setModules] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedModuleId, setSelectedModuleId] = useState(null);
    const [generatedQuiz, setGeneratedQuiz] = useState(null);
    const [currentTeacherId, setCurrentTeacherId] = useState(null);

    // Quiz configuration state
    const [quizConfig, setQuizConfig] = useState({
        subject: '',
        moduleId: '',
        topicId: '',
        difficulty: 'medium',
        questionCount: 10,
        timeLimit: 30,
        dueDate: '',
        class: ''
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.teacher_id) {
            setCurrentTeacherId(user.teacher_id);
        }
    }, []);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (user?.teacher_id) {
                    const response = await axios.get(`http://localhost:8000/api/subjects/${user.teacher_id}`);
                    if (response.data?.subjects) {
                        setSubjects(response.data.subjects);
                    }
                }
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
        };
        fetchSubjects();
    }, []);

    useEffect(() => {
        const fetchModules = async () => {
            if (quizConfig.subject) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/modules/${quizConfig.subject}`);
                    setModules(response.data.modules);
                } catch (error) {
                    console.error('Error fetching modules:', error);
                }
            }
        };
        fetchModules();
    }, [quizConfig.subject]);

    useEffect(() => {
        const fetchTopics = async () => {
            if (selectedModuleId) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/topics/${selectedModuleId}`);
                    if (response.data?.topics) {
                        setTopics(response.data.topics);
                    }
                } catch (error) {
                    console.error("Error fetching topics:", error);
                }
            }
        };
        if (selectedModuleId) {
            fetchTopics();
        }
    }, [selectedModuleId]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setQuizConfig(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenerateQuiz = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/generate-quiz', {
                topic_id: quizConfig.topicId,
                difficulty: quizConfig.difficulty,
                question_count: quizConfig.questionCount
            });

            let quizData = response.data?.quiz;

            // Debug: Check the raw response
            console.log("Raw Quiz Data:", quizData);

            // If response is a string, clean & parse it
            if (typeof quizData === 'string' && quizData.startsWith("```json")) {
                quizData = quizData.replace(/```json\n?/, '').replace(/\n?```/, '');
                quizData = JSON.parse(quizData); // Convert to object
            }

            // If quizData is already an object, no need to parse
            if (typeof quizData === 'object' && quizData !== null) {
                // ✅ Add Debugging Log Here
                console.log("Full Quiz Data:", JSON.stringify(quizData, null, 2));

                setGeneratedQuiz(quizData);
                setPreviewModalOpen(true);
            } else {
                console.error("Unexpected quiz format:", quizData);
            }
        } catch (error) {
            console.error("Error generating quiz:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleUploadQuiz = async () => {
        try {
            const quizData = {
                teacher_id: currentTeacherId,
                subject_id: quizConfig.subject,
                topic_id: quizConfig.topicId,
                difficulty: quizConfig.difficulty,
                questions: generatedQuiz.questions,
                time_limit: quizConfig.timeLimit,
                due_date: quizConfig.dueDate,
                class: quizConfig.class
            };

            await axios.post('http://localhost:8000/api/upload-quiz', quizData);
            navigate('/TeacherDashboard');
        } catch (error) {
            console.error("Error uploading quiz:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    // Preview Modal Component
    const PreviewModal = ({isOpen, onClose}) => {
        if (!isOpen || !generatedQuiz) return null;

        return (
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
                    className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-[800px] max-h-[80vh] overflow-y-auto text-white relative"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    >
                        <X size={20}/>
                    </button>

                    <h2 className="text-2xl font-bold mb-6">Quiz Preview</h2>

                    <div className="space-y-6">
                        {generatedQuiz.questions.map((question, index) => (
                            <div key={index} className="bg-[#2D2B3D] p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">
                                    Question {index + 1}: {question.question}
                                </h3>
                                <div className="space-y-3">
                                    {question.options.map((option, optionIndex) => {
                                        // Ensure `correct_answer` is compared correctly
                                        const isCorrect = parseInt(question.correct_answer) === optionIndex;

                                        return (
                                            <div
                                                key={optionIndex}
                                                className={`p-3 rounded-lg border ${
                                                    isCorrect
                                                        ? 'bg-green-500/20 border-green-500 font-bold text-green-400'
                                                        : 'bg-[#1E1C2E] border-gray-600'
                                                }`}
                                            >
                                                {option}
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* ✅ Add this section to explicitly display the correct answer */}
                                <p className="mt-2 text-sm text-gray-300">
                                    <strong>Correct
                                        Answer:</strong> {question.options[parseInt(question.correct_answer)]}
                                </p>
                                <p className="text-sm text-gray-400">
                                    <strong>Explanation:</strong> {question.explanation}
                                </p>
                            </div>
                        ))}
                    </div>


                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Edit Quiz
                        </button>
                        <button
                            onClick={handleUploadQuiz}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                            Upload Quiz
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )
            ;
    };

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            {/* Sidebar */}
            <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col">
                {/* Sidebar content */}
                <div className="flex-1 flex flex-col min-h-0">
                    {/* Logo */}
                    <div className="mb-8">
                        <img
                            src="../Images/HashLogoDashboard.png"
                            alt="Hash Logo"
                            className="h-12 w-auto"
                        />
                    </div>

                    {/* Navigation items */}
                    <nav className="flex-1 space-y-6">
                        <div>
                            <h3 className="text-[#8F8F8F] text-sm mb-3">QUIZZES</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center text-white bg-[#3A3750] p-2 rounded-lg">
                                    <Plus size={18} className="mr-2"/> Assign Quiz
                                </li>
                                <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                                    <CheckCircle size={18} className="mr-2"/> Completed Quizzes
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-[#8F8F8F] text-sm mb-3">RESOURCES</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                                    <Book size={18} className="mr-2"/> Syllabus
                                </li>
                                <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                                    <FileText size={18} className="mr-2"/> PYQs
                                </li>
                                <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                                    <BookMarked size={18} className="mr-2"/> Materials
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-[#8F8F8F] text-sm mb-3">STUDENTS</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                                    <Users size={18} className="mr-2"/> Student Section
                                </li>
                                <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                                    <Trophy size={18} className="mr-2"/> Ranks Section
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Logout button */}
                    <button
                        onClick={() => setLogoutModalOpen(true)}
                        className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] p-2 rounded-lg"
                    >
                        <LogOut size={18} className="mr-2"/> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Navbar */}
                <div className="bg-[#1E1C2E] p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={20}/>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Bell size={24} className="text-gray-300"/>
                            <span
                                className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">3</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-white">Dr. Smith</span>
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Quiz Configuration Form */}
                <div className="p-6">
                    <div className="bg-[#1E1C2E] rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Create New Quiz</h2>

                        <div className="space-y-6">
                            {/* Basic Quiz Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <select
                                        name="subject"
                                        value={quizConfig.subject}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none"
                                    >
                                        <option value="">Select subject</option>
                                        {subjects.map(subject => (
                                            <option key={subject.subject_id} value={subject.subject_id}>
                                                {subject.subject_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Module
                                    </label>
                                    <select
                                        name="moduleId"
                                        value={quizConfig.moduleId}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            setSelectedModuleId(e.target.value);
                                        }}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none"
                                        disabled={!quizConfig.subject}
                                    >
                                        <option value="">Select module</option>
                                        {modules.map(module => (
                                            <option key={module.module_id} value={module.module_id}>
                                                {module.module_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Topic
                                    </label>
                                    <select
                                        name="topicId"
                                        value={quizConfig.topicId}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none"
                                        disabled={!quizConfig.moduleId}
                                    >
                                        <option value="">Select topic</option>
                                        {topics.map(topic => (
                                            <option key={topic.topic_id} value={topic.topic_id}>
                                                {topic.topic_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Difficulty Level
                                    </label>
                                    <select
                                        name="difficulty"
                                        value={quizConfig.difficulty}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none"
                                    >
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>
                            </div>

                            {/* Quiz Settings */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Number of Questions
                                    </label>
                                    <input
                                        type="number"
                                        name="questionCount"
                                        value={quizConfig.questionCount}
                                        onChange={handleInputChange}
                                        min="1"
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Time Limit (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        name="timeLimit"
                                        value={quizConfig.timeLimit}
                                        onChange={handleInputChange}
                                        min="1"
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={quizConfig.dueDate}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Class Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Select Class
                                </label>
                                <select
                                    name="class"
                                    value={quizConfig.class}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none"
                                >
                                    <option value="">Select a class</option>
                                    <option value="CSE-A">CSE-A</option>
                                    <option value="CSE-B">CSE-B</option>
                                    <option value="CSE-C">CSE-C</option>
                                </select>
                            </div>

                            {/* Generate Quiz Button */}
                            <div className="flex justify-end">
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    onClick={handleGenerateQuiz}
                                    disabled={loading}
                                    className="flex items-center space-x-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
                                >
                                    <Wand2 size={20}/>
                                    <span>{loading ? 'Generating...' : 'Generate Quiz'}</span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            <PreviewModal
                isOpen={previewModalOpen}
                onClose={() => setPreviewModalOpen(false)}
            />

            {/* Logout Modal */}
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
                                    className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
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