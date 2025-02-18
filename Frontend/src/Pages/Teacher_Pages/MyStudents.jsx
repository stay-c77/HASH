import React from "react";

import { Search, Mail, Phone, MapPin, Plus } from "lucide-react";

export default function MyStudents() {
  const students = [
    {
      id: 1,
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      phone: "+1 234 567 8901",
      location: "New York, USA",
      course: "Data Structures",
      progress: 85,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
    },
    {
      id: 2,
      name: "James Miller",
      email: "james.miller@example.com",
      phone: "+1 234 567 8902",
      location: "Los Angeles, USA",
      course: "Web Development",
      progress: 92,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces"
    },
    {
      id: 3,
      name: "Sophia Chen",
      email: "sophia.chen@example.com",
      phone: "+1 234 567 8903",
      location: "San Francisco, USA",
      course: "Database Systems",
      progress: 78,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces"
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
              <h1 className="text-2xl font-bold text-white mb-2">My Students</h1>
              <p className="text-gray-400">Manage and track your students</p>
            </div>
            <button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Plus size={20} className="mr-2" />
              Add Student
            </button>
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
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-16 h-16 rounded-full border-2 border-purple-500"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{student.name}</h3>
                      <p className="text-purple-400 mb-4">{student.course}</p>
                      <div className="grid gap-2">
                        <div className="flex items-center text-gray-400">
                          <Mail size={16} className="mr-2" />
                          {student.email}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Phone size={16} className="mr-2" />
                          {student.phone}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <MapPin size={16} className="mr-2" />
                          {student.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-4 border-purple-600">
                      <span className="text-xl font-bold text-white">{student.progress}%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
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