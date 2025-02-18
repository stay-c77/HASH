import React from "react";

import { FileText, Download, Calendar, Book } from "lucide-react";

export default function PYQs() {
  const previousQuestions = [
    {
      id: 1,
      year: "2023",
      subject: "Data Structures",
      semester: "Fall",
      papers: [
        { name: "Mid Term", size: "2.5 MB" },
        { name: "Final Term", size: "3.1 MB" }
      ]
    },
    {
      id: 2,
      year: "2023",
      subject: "Web Development",
      semester: "Spring",
      papers: [
        { name: "Mid Term", size: "1.8 MB" },
        { name: "Final Term", size: "2.2 MB" }
      ]
    },
    {
      id: 3,
      year: "2022",
      subject: "Database Systems",
      semester: "Fall",
      papers: [
        { name: "Mid Term", size: "2.1 MB" },
        { name: "Final Term", size: "2.8 MB" }
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-[#1E1C2E]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Previous Year Questions</h1>
            <p className="text-gray-400">Access and download previous year question papers</p>
          </div>

          <div className="grid gap-6">
            {previousQuestions.map((pyq) => (
              <div key={pyq.id} className="bg-[#2D2B3E] rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{pyq.subject}</h3>
                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        {pyq.year}
                      </div>
                      <div className="flex items-center">
                        <Book size={16} className="mr-2" />
                        {pyq.semester}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {pyq.papers.map((paper, index) => (
                    <div key={index} className="flex items-center justify-between bg-[#1E1C2E] p-4 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="text-purple-400 mr-3" size={20} />
                        <div>
                          <p className="text-white">{paper.name}</p>
                          <p className="text-gray-400 text-sm">{paper.size}</p>
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