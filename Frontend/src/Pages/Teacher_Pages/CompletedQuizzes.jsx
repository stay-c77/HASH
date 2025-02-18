import React from "react";

import { Search, Calendar, User, Clock } from "lucide-react";

export default function CompletedQuizzes() {
  const completedQuizzes = [
    {
      id: 1,
      title: "Introduction to React",
      subject: "Web Development",
      students: 45,
      date: "2024-03-15",
      duration: "45 min",
      avgScore: 85
    },
    {
      id: 2,
      title: "Data Structures Basics",
      subject: "Computer Science",
      students: 38,
      date: "2024-03-14",
      duration: "60 min",
      avgScore: 78
    },
    {
      id: 3,
      title: "Database Management",
      subject: "Information Systems",
      students: 42,
      date: "2024-03-13",
      duration: "30 min",
      avgScore: 92
    }
  ];

  return (
    <div className="flex h-screen bg-[#1E1C2E]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Completed Quizzes</h1>
            <p className="text-gray-400">View and analyze completed quiz results</p>
          </div>

          <div className="bg-[#2D2B3E] rounded-lg p-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search quizzes..."
                className="w-full bg-[#1E1C2E] text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="grid gap-4">
            {completedQuizzes.map((quiz) => (
              <div key={quiz.id} className="bg-[#2D2B3E] rounded-lg p-6 hover:bg-[#3A3750] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{quiz.title}</h3>
                    <p className="text-purple-400">{quiz.subject}</p>
                  </div>
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                    {quiz.avgScore}% avg
                  </span>
                </div>
                <div className="flex items-center gap-6 text-gray-400">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    {quiz.date}
                  </div>
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    {quiz.students} students
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    {quiz.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}