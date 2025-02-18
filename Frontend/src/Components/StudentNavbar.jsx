import React from 'react';
import { Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentNavbar = () => {
  return (
    <div className="bg-[#1E1C2E] p-4 flex justify-between items-center shadow-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="flex items-center space-x-6">
        <motion.button whileHover={{scale: 1.1}} className="relative">
          <Bell size={24} className="text-gray-300 hover:text-white"/>
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">
            3
          </span>
        </motion.button>
        <div className="flex items-center space-x-3">
          <span className="text-white">Welcome, User</span>
          <motion.img
            whileHover={{scale: 1.1}}
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentNavbar;