import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";
import {Star} from 'lucide-react';
import StudentNavbar from '../../Components/StudentNavbar';
import StudentSidebar from '../../Components/StudentSidebar';
import LogoutModal from '../../Components/LogoutModal';

const CompletedQuizPage = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompletedQuizzes = async () => {
            try {
                const userStr = localStorage.getItem("user");
                if (!userStr) {
                    throw new Error("User data not found");
                }

                const user = JSON.parse(userStr);
                if (!user.student_id) {
                    throw new Error("Student ID not found");
                }

                const response = await fetch(`http://localhost:8000/api/completed-quizzes/${user.student_id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch completed quizzes");
                }

                const data = await response.json();
                setCompletedQuizzes(data.quizzes || []);
            } catch (err) {
                console.error("Error fetching completed quizzes:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompletedQuizzes();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const getGradeColor = (grade) => {
        const gradeMap = {
            5: 'text-green-400', // A+
            4: 'text-green-500', // A
            3: 'text-blue-400',  // B
            2: 'text-yellow-500', // C
            1: 'text-orange-500', // D
            0: 'text-red-500'     // F
        };
        return gradeMap[grade] || 'text-gray-400';
    };

    const getGradeLetter = (grade) => {
        const gradeMap = {
            5: 'A+',
            4: 'A',
            3: 'B',
            2: 'C',
            1: 'D',
            0: 'F'
        };
        return gradeMap[grade] || 'N/A';
    };

    const getScoreBackground = (score) => {
        if (score >= 90) return 'bg-green-500';
        if (score >= 80) return 'bg-blue-500';
        if (score >= 70) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    if (loading) {
        return (
            <div className="flex h-screen bg-[#2D2B3D]">
                <StudentSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="CompletedQuizPage"/>
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            <StudentSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="CompletedQuizPage"/>

            <div className="flex-1 overflow-auto">
                <StudentNavbar/>

                <div className="p-6">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Completed Quizzes</h2>

                        {error ? (
                            <div className="text-red-500 p-4 rounded-lg bg-[#2D2B3D]">
                                Error: {error}
                            </div>
                        ) : completedQuizzes.length === 0 ? (
                            <div className="text-center text-gray-400 p-8">
                                No completed quizzes found
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {completedQuizzes.map((quiz, index) => (
                                    <motion.div
                                        key={quiz.quiz_id}
                                        initial={{opacity: 0, x: -20}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{delay: index * 0.1}}
                                        className="bg-[#2D2B3D] rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-4 flex-1">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-white mb-2">
                                                        {quiz.topic_display_name}
                                                    </h3>
                                                    <p className="text-gray-400">{quiz.subject_name}</p>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    <div>
                                                        <p className="text-gray-400 text-sm">Total Questions</p>
                                                        <p className="text-white font-semibold">{quiz.no_of_questions}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-400 text-sm">Correct Answers</p>
                                                        <p className="text-green-400 font-semibold">{quiz.correct_answers}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-400 text-sm">Wrong Answers</p>
                                                        <p className="text-red-400 font-semibold">{quiz.incorrect_answers}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-400 text-sm">Grade</p>
                                                        <p className={`font-bold text-xl ${getGradeColor(quiz.grade)}`}>
                                                            {getGradeLetter(quiz.grade)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-4">
                                                    <div className={`${getScoreBackground(quiz.percentage)} px-3 py-1 rounded-full`}>
                                                        <p className="text-white font-semibold">{quiz.percentage}%</p>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <p className="text-gray-400">
                                                            by {quiz.teacher_name} ({quiz.subject_name})
                                                        </p>
                                                    </div>
                                                </div>

                                                {quiz.percentage < 70 && (
                                                    <motion.div
                                                        initial={{opacity: 0, y: 10}}
                                                        animate={{opacity: 1, y: 0}}
                                                        className="flex items-start space-x-2 bg-[#1E1C2E] p-3 rounded-lg"
                                                    >
                                                        <div>
                                                            <p className="text-yellow-500 font-semibold">Recommendation</p>
                                                            <p className="text-gray-400">
                                                                Review {quiz.topic_display_name} materials to improve your understanding of this topic.
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>

                                            {quiz.top_performer && (
                                                <div className="ml-6 flex flex-col items-center">
                                                    <p className="text-gray-400 text-sm mb-2">Top Performer</p>
                                                    <motion.img
                                                        whileHover={{scale: 1.1}}
                                                        src={quiz.top_performer.avatar || "https://via.placeholder.com/40"}
                                                        alt={quiz.top_performer.name}
                                                        className="w-12 h-12 rounded-full mb-2"
                                                    />
                                                    <p className="text-white text-sm font-semibold">
                                                        {quiz.top_performer.name}
                                                    </p>
                                                    <div className="flex items-center space-x-1 mt-1">
                                                        <Star className="text-yellow-500" size={16}/>
                                                        <p className="text-yellow-500 font-semibold">
                                                            {quiz.top_performer.score}%
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <LogoutModal
                isOpen={logoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
};

export default CompletedQuizPage;