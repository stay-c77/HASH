import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="bg-[#1E1C2E] text-white p-4 flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#2D2B3E] text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 hover:bg-[#2D2B3E] rounded-lg">
          <Bell size={20} />
          <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
        </button>

        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium">Welcome, Teacher</span>
          <img
            src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=100&h=100&fit=crop&crop=faces"
            alt="Teacher profile"
            className="w-10 h-10 rounded-full border-2 border-purple-500"
          />
        </div>
      </div>
    </div>
  );
}