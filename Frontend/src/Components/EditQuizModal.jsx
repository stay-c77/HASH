import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Save } from 'lucide-react';

const EditQuizModal = ({ isOpen, onClose, quiz, onSave }) => {
  const [editedQuiz, setEditedQuiz] = useState(quiz);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...editedQuiz.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setEditedQuiz({ ...editedQuiz, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...editedQuiz.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setEditedQuiz({ ...editedQuiz, questions: updatedQuestions });
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    const updatedQuestions = [...editedQuiz.questions];
    updatedQuestions[questionIndex].correct_answer = value;
    setEditedQuiz({ ...editedQuiz, questions: updatedQuestions });
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = editedQuiz.questions.filter((_, i) => i !== index);
    setEditedQuiz({ ...editedQuiz, questions: updatedQuestions });
  };

  const handleSave = () => {
    onSave(editedQuiz);
    onClose();
  };

  if (!isOpen) return null;

  return (
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
        className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-[800px] max-h-[80vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Edit Quiz</h2>

        <div className="space-y-8">
          {editedQuiz.questions.map((question, questionIndex) => (
            <motion.div
              key={questionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: questionIndex * 0.1 }}
              className="bg-[#2D2B3D] p-6 rounded-lg relative"
            >
              <div className="absolute top-4 right-4 flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleDeleteQuestion(questionIndex)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={20} />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Question {questionIndex + 1}
                  </label>
                  <textarea
                    value={question.question}
                    onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                    className="w-full px-4 py-2 bg-[#1E1C2E] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Option {optionIndex + 1}
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                          className="flex-1 px-4 py-2 bg-[#1E1C2E] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                          type="radio"
                          name={`correct-answer-${questionIndex}`}
                          checked={parseInt(question.correct_answer) === optionIndex}
                          onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex.toString())}
                          className="form-radio h-5 w-5 text-purple-500 focus:ring-purple-500 bg-[#1E1C2E] border-gray-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Explanation
                  </label>
                  <textarea
                    value={question.explanation}
                    onChange={(e) => handleQuestionChange(questionIndex, 'explanation', e.target.value)}
                    className="w-full px-4 py-2 bg-[#1E1C2E] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={2}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-[#1E1C2E] pt-4 mt-6 border-t border-gray-700 flex justify-end space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleSave}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center space-x-2"
          >
            <Save size={20} />
            <span>Save Changes</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditQuizModal;