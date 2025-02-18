import React from "react";

import { Book, ChevronDown, ChevronUp, Clock, BookOpen } from "lucide-react";

export default function Syllabus() {
  const [expandedUnit, setExpandedUnit] = React.useState(0);

  const syllabusData = [
    {
      id: 1,
      subject: "Data Structures and Algorithms",
      units: [
        {
          title: "Unit 1: Introduction to Data Structures",
          topics: [
            "Arrays and Linked Lists",
            "Stacks and Queues",
            "Trees and Graphs",
            "Basic Algorithm Analysis"
          ],
          duration: "4 weeks"
        },
        {
          title: "Unit 2: Sorting and Searching",
          topics: [
            "Bubble Sort, Selection Sort",
            "Merge Sort, Quick Sort",
            "Linear Search, Binary Search",
            "Hashing Techniques"
          ],
          duration: "3 weeks"
        }
      ]
    },
    {
      id: 2,
      subject: "Web Development",
      units: [
        {
          title: "Unit 1: Frontend Basics",
          topics: [
            "HTML5 and CSS3",
            "JavaScript Fundamentals",
            "DOM Manipulation",
            "Responsive Design"
          ],
          duration: "3 weeks"
        },
        {
          title: "Unit 2: Advanced Frontend",
          topics: [
            "React.js Basics",
            "State Management",
            "API Integration",
            "Performance Optimization"
          ],
          duration: "4 weeks"
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
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Course Syllabus</h1>
            <p className="text-gray-400">View and manage your course syllabus</p>
          </div>

          <div className="grid gap-6">
            {syllabusData.map((subject) => (
              <div key={subject.id} className="bg-[#2D2B3E] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Book className="text-purple-400" size={24} />
                  <h2 className="text-xl font-semibold text-white">{subject.subject}</h2>
                </div>

                <div className="grid gap-4">
                  {subject.units.map((unit, index) => (
                    <div key={index} className="bg-[#1E1C2E] rounded-lg p-4">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setExpandedUnit(expandedUnit === index ? null : index)}
                      >
                        <div className="flex items-center gap-4">
                          <BookOpen className="text-purple-400" size={20} />
                          <h3 className="text-white font-medium">{unit.title}</h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center text-gray-400">
                            <Clock size={16} className="mr-2" />
                            {unit.duration}
                          </div>
                          {expandedUnit === index ? (
                            <ChevronUp className="text-purple-400" size={20} />
                          ) : (
                            <ChevronDown className="text-purple-400" size={20} />
                          )}
                        </div>
                      </div>

                      {expandedUnit === index && (
                        <div className="mt-4 pl-9">
                          <ul className="space-y-2">
                            {unit.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="text-gray-400">
                                • {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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