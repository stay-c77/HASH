import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare, AlertTriangle, TrendingUp, Brain, Target, ChevronRight, BookOpen, Clock } from 'lucide-react';

const MyStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
      performance: 92,
      status: 'Excellent',
      subjects: ['Mathematics', 'Physics'],
      strengths: ['Problem Solving', 'Analytical Thinking'],
      weaknesses: ['Complex Equations'],
      recentActivity: {
        quizzes: 8,
        attendance: '95%',
        lastActive: '2 hours ago'
      },
      interventionNeeded: false
    },
    {
      id: 2,
      name: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
      performance: 78,
      status: 'Good',
      subjects: ['Chemistry', 'Biology'],
      strengths: ['Lab Work', 'Memorization'],
      weaknesses: ['Theory Application', 'Time Management'],
      recentActivity: {
        quizzes: 5,
        attendance: '85%',
        lastActive: '1 day ago'
      },
      interventionNeeded: true
    },
    {
      id: 3,
      name: 'Carol Williams',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop',
      performance: 65,
      status: 'Needs Improvement',
      subjects: ['Physics', 'Mathematics'],
      strengths: ['Conceptual Understanding'],
      weaknesses: ['Time Management', 'Problem Solving', 'Exam Preparation'],
      recentActivity: {
        quizzes: 3,
        attendance: '75%',
        lastActive: '3 days ago'
      },
      interventionNeeded: true
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
            <h1 className="text-2xl font-bold text-white">My Students</h1>
            <p className="text-gray-400">Monitor and support your students' progress</p>
          </div>

          <div className="flex flex-wrap gap-4">
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

            <select
              className="px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">All Students</option>
              <option value="needsHelp">Needs Help</option>
              <option value="performing">Well Performing</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Students List */}
        <div className="space-y-6">
          {students.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#2D2B3D] rounded-lg p-6"
            >
              {/* Student Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={student.avatar}
                    alt={student.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-white">{student.name}</h2>
                    <div className="flex space-x-2 mt-1">
                      {student.subjects.map((subject, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-[#1E1C2E] text-gray-300 px-2 py-1 rounded"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 bg-[#7C3AED] text-white px-4 py-2 rounded-lg hover:bg-[#6D2AE3] transition-colors"
                  >
                    <MessageSquare size={18} />
                    <span>Message</span>
                  </motion.button>
                  {student.interventionNeeded && (
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="flex items-center space-x-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-lg"
                    >
                      <AlertTriangle size={18} />
                      <span>Needs Attention</span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Overall Performance */}
                <div className="bg-[#1E1C2E] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Overall Performance</span>
                    <TrendingUp size={18} className={student.performance >= 80 ? 'text-green-500' : 'text-yellow-500'} />
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${student.performance}%` }}
                      className={`h-full rounded-full ${
                        student.performance >= 90 ? 'bg-green-500' :
                        student.performance >= 70 ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}
                    />
                  </div>
                  <span className="text-white font-semibold">{student.performance}%</span>
                </div>

                {/* Recent Activity */}
                <div className="bg-[#1E1C2E] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Recent Activity</span>
                    <Clock size={18} className="text-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Quizzes Taken:</span>
                      <span className="text-white">{student.recentActivity.quizzes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Attendance:</span>
                      <span className="text-white">{student.recentActivity.attendance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Active:</span>
                      <span className="text-white">{student.recentActivity.lastActive}</span>
                    </div>
                  </div>
                </div>

                {/* Learning Style */}
                <div className="bg-[#1E1C2E] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Learning Analysis</span>
                    <Brain size={18} className="text-purple-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Target size={16} className="text-green-500" />
                      <span className="text-gray-400">Strengths:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {student.strengths.map((strength, idx) => (
                        <span key={idx} className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded">
                          {strength}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <AlertTriangle size={16} className="text-yellow-500" />
                      <span className="text-gray-400">Areas for Improvement:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {student.weaknesses.map((weakness, idx) => (
                        <span key={idx} className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded">
                          {weakness}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-2 bg-[#1E1C2E] text-white px-4 py-2 rounded-lg hover:bg-[#2A283A] transition-colors"
                >
                  <BookOpen size={18} />
                  <span>View Detailed Progress</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-2 bg-[#1E1C2E] text-white px-4 py-2 rounded-lg hover:bg-[#2A283A] transition-colors"
                >
                  <Target size={18} />
                  <span>Set Learning Goals</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-2 bg-[#1E1C2E] text-white px-4 py-2 rounded-lg hover:bg-[#2A283A] transition-colors"
                >
                  <MessageSquare size={18} />
                  <span>Send Feedback</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MyStudents;