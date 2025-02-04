import React from 'react';

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
      <div className="mt-6 space-y-6">
        <button className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600">Create New Quiz</button>
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Previous Quizzes</h2>
          <ul className="mt-4 space-y-2">
            <li className="p-4 bg-white shadow rounded-lg">
              <p className="text-lg text-gray-800">Math Quiz - Level 1</p>
              <button className="mt-2 text-sm text-blue-500">Edit Quiz</button>
            </li>
            {/* Repeat for each quiz */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
