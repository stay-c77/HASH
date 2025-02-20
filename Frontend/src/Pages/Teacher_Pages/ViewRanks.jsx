import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Filter, Download, Search, Calendar, ChevronDown } from 'lucide-react';

const ViewRanks = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const rankLevels = [
    {
      name: 'Master',
      color: 'bg-purple-500',
      students: [
        { name: 'John Doe', score: 98, subject: 'Mathematics', date: '2024-03-15', certificate: true },
        { name: 'Jane Smith', score: 96, subject: 'Physics', date: '2024-03-14', certificate: true }
      ]
    },
    {
      name: 'Advanced',
      color: 'bg-blue-500',
      students: [
        { name: 'Mike Johnson', score: 88, subject: 'Chemistry', date: '2024-03-13', certificate: true },
        { name: 'Sarah Williams', score: 86, subject: 'Biology', date: '2024-03-12', certificate: false }
      ]
    },
    {
      name: 'Beginner',
      color: 'bg-green-500',
      students: [
        { name: 'Tom Brown', score: 78, subject: 'Mathematics', date: '2024-03-11', certificate: false },
        { name: 'Lisa Davis', score: 76, subject: 'Physics', date: '2024-03-10', certificate: false }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1E1C2E] rounded-xl p-6"
      >
        {/* Header and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-white">Rankings</h1>
            <p className="text-gray-400">Track student performance and achievements</p>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Subject Filter */}
            <select
              className="px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">All Subjects</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
            </select>

            {/* Date Range Filter */}
            <select
              className="px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>

        {/* Rank Levels */}
        <div className="space-y-6">
          {rankLevels.map((level, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#2D2B3D] rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Trophy className={`text-white ${level.color === 'bg-purple-500' ? 'text-purple-500' : level.color === 'bg-blue-500' ? 'text-blue-500' : 'text-green-500'}`} size={24} />
                  <h2 className="text-xl font-semibold text-white">{level.name} Level</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 bg-[#1E1C2E] text-white px-4 py-2 rounded-lg hover:bg-[#2A283A] transition-colors"
                >
                  <Download size={18} />
                  <span>Download Certificates</span>
                </motion.button>
              </div>

              {/* Students Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-700">
                      <th className="text-left py-3">Rank</th>
                      <th className="text-left py-3">Name</th>
                      <th className="text-left py-3">Subject</th>
                      <th className="text-left py-3">Score</th>
                      <th className="text-left py-3">Date</th>
                      <th className="text-left py-3">Certificate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {level.students.map((student, studentIndex) => (
                      <motion.tr
                        key={studentIndex}
                        whileHover={{ backgroundColor: 'rgba(124, 58, 237, 0.1)' }}
                        className="border-b border-gray-700"
                      >
                        <td className="py-4 text-white">{studentIndex + 1}</td>
                        <td className="py-4 text-white">{student.name}</td>
                        <td className="py-4 text-white">{student.subject}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded ${
                            student.score >= 90 ? 'bg-green-500' :
                            student.score >= 80 ? 'bg-blue-500' :
                            'bg-yellow-500'
                          } text-white`}>
                            {student.score}%
                          </span>
                        </td>
                        <td className="py-4 text-gray-400">{student.date}</td>
                        <td className="py-4">
                          {student.certificate ? (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              className="text-purple-500 hover:text-purple-400"
                            >
                              <Download size={18} />
                            </motion.button>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ViewRanks;