import React, { useState } from 'react';

const CreateQuiz = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleGenerateQuiz = () => {
    // Fetch quiz data from backend
    fetch(`/api/generate-quiz?topic=${topic}&difficulty=${difficulty}`)
      .then(response => response.json())
      .then(data => setQuestions(data.questions));
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-800">Create Quiz</h1>
      <div className="mt-6 space-y-4">
        <label className="text-lg text-gray-700">Select Topic</label>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="math">Math</option>
          <option value="science">Science</option>
          {/* Add other topics */}
        </select>
        <label className="text-lg text-gray-700">Select Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={handleGenerateQuiz} className="px-6 py-3 bg-green-500 text-white rounded-full mt-4">Generate Quiz</button>

        <div className="mt-6">
          {questions.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Generated Questions</h2>
              <ul className="mt-4 space-y-2">
                {questions.map((question, index) => (
                  <li key={index} className="p-4 bg-white shadow rounded-lg">
                    <p className="text-lg text-gray-800">{question}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
