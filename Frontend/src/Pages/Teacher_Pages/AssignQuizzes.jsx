import React from "react";
import { Plus, Book, Clock, Users, Calendar } from "lucide-react";

export default function AssignQuizzes() {
  const quizTemplates = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      subject: "Web Development",
      questions: 15,
      duration: "30 min",
      difficulty: "Intermediate"
    },
    {
      id: 2,
      title: "Python Basics",
      subject: "Programming",
      questions: 20,
      duration: "45 min",
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Advanced Algorithms",
      subject: "Computer Science",
      questions: 10,
      duration: "60 min",
      difficulty: "Advanced"
    }
  ];

  return (
    <div className="flex h-screen bg-[#1E1C2E]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Assign Quizzes</h1>
              <p className="text-gray-400">Create and assign new quizzes to your students</p>
            </div>
            <button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Plus size={20} className="mr-2" />
              Create New Quiz
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizTemplates.map((template) => (
              <div key={template.id} className="bg-[#2D2B3E] rounded-lg p-6 hover:bg-[#3A3750] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{template.title}</h3>
                    <p className="text-purple-400">{template.subject}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    template.difficulty === "Beginner" ? "bg-green-500" :
                    template.difficulty === "Intermediate" ? "bg-yellow-500" :
                    "bg-red-500"
                  } text-white`}>
                    {template.difficulty}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Book size={16} className="mr-2" />
                    {template.questions} questions
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    {template.duration}
                  </div>
                </div>

                <button className="w-full bg-[#1E1C2E] hover:bg-purple-600 text-white py-2 rounded-lg transition-colors">
                  Assign Quiz
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}