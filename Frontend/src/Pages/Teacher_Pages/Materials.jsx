import React from "react";

import { FileText, Download, Plus, Search, Folder } from "lucide-react";

export default function Materials() {
  const materials = [
    {
      id: 1,
      subject: "Data Structures",
      materials: [
        {
          name: "Lecture Notes - Arrays and Linked Lists",
          type: "PDF",
          size: "2.5 MB",
          date: "2024-03-15"
        },
        {
          name: "Practice Problems - Trees",
          type: "PDF",
          size: "1.8 MB",
          date: "2024-03-14"
        }
      ]
    },
    {
      id: 2,
      subject: "Web Development",
      materials: [
        {
          name: "React Hooks Tutorial",
          type: "PDF",
          size: "3.2 MB",
          date: "2024-03-13"
        },
        {
          name: "State Management Guide",
          type: "PDF",
          size: "2.1 MB",
          date: "2024-03-12"
        }
      ]
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
              <h1 className="text-2xl font-bold text-white mb-2">Course Materials</h1>
              <p className="text-gray-400">Access and manage course materials and notes</p>
            </div>
            <button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Plus size={20} className="mr-2" />
              Upload Material
            </button>
          </div>

          <div className="bg-[#2D2B3E] rounded-lg p-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search materials..."
                className="w-full bg-[#1E1C2E] text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="grid gap-6">
            {materials.map((subject) => (
              <div key={subject.id} className="bg-[#2D2B3E] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Folder className="text-purple-400" size={24} />
                  <h2 className="text-xl font-semibold text-white">{subject.subject}</h2>
                </div>

                <div className="grid gap-4">
                  {subject.materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between bg-[#1E1C2E] p-4 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="text-purple-400 mr-3" size={20} />
                        <div>
                          <p className="text-white">{material.name}</p>
                          <p className="text-gray-400 text-sm">
                            {material.type} • {material.size} • {material.date}
                          </p>
                        </div>
                      </div>
                      <button className="flex items-center text-purple-400 hover:text-purple-300">
                        <Download size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}