import React, { useState, useEffect } from 'react';

const QuizPage = () => {
  const [quiz, setQuiz] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Fetch quiz data from backend
    fetch('/api/get-quiz')
      .then(response => response.json())
      .then(data => setQuiz(data));
  }, []);

  const handleAnswerSelect = (answer) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmitQuiz = () => {
    // Submit answers and calculate score
    fetch('/api/submit-quiz', {
      method: 'POST',
      body: JSON.stringify({ answers }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
      .then(data => alert(`Your score is: ${data.score}`));
  };

  if (!quiz.questions) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Quiz: {quiz.title}</h1>
      <div className="mt-6 space-y-6">
        <p className="text-lg">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-lg font-semibold">{quiz.questions[currentQuestionIndex].question}</p>
          <ul className="mt-4">
            {quiz.questions[currentQuestionIndex].options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleAnswerSelect(option)}
                  className="block p-3 w-full text-left bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 bg-blue-500 text-white rounded-full mr-4"
          >
            Next Question
          </button>
          {currentQuestionIndex === quiz.questions.length - 1 && (
            <button
              onClick={handleSubmitQuiz}
              className="px-6 py-3 bg-green-500 text-white rounded-full"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
