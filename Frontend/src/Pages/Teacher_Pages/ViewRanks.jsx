import React from "react";

import { Trophy, Star, Medal, Search } from "lucide-react";

export default function ViewRanks() {
  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      rank: 1,
      score: 985,
      subject: "Data Structures",
      level: "Master",
      progress: 98
    },
    {
      id: 2,
      name: "Sarah Williams",
      rank: 2,
      score: 945,
      subject: "Web Development",
      level: "Expert",
      progress: 94
    },
    {
      id: 3,
      name: "Michael Brown",
      rank: 3,
      score: 920,
      subject: "Database Systems",
      level: "Advanced",
      progress: 92
    }
  ];

  return (
    <div className="flex h-screen bg-[#1E1C2E]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Student Rankings</h1>
            <p className="text-gray-400">View and track student performance rankings</p>
          </div>

          <div className="bg-[#2D2B3E] rounded-lg p-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search students..."
                className="w-full bg-[#1E1C2E] text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="grid gap-4">
            {students.map((student) => (
              <div key={student.id} className="bg-[#2D2B3E] rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      student.rank === 1 ? "bg-yellow-500" :
                      student.rank === 2 ? "bg-gray-400" :
                      "bg-orange-500"
                    }`}>
                      {student.rank === 1 ? (
                        <Trophy size={24} className="text-white" />
                      ) : student.rank === 2 ? (
                        <Medal size={24} className="text-white" />
                      ) : (
                        <Star size={24} className="text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{student.name}</h3>
                      <p className="text-purple-400">{student.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{student.score}</p>
                    <p className="text-gray-400">points</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">{student.level}</span>
                    <span className="text-gray-400">{student.progress}%</span>
                  </div>
                  <div className="w-full bg-[#1E1C2E] rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${student.progress}%` }}
                    ></div>
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