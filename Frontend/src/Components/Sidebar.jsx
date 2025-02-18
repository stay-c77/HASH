import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, Users, ClipboardList, Activity, LogOut, CheckCircle, Book, BookMarked, Trophy, Eye } from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Hash - Quiz Learning Platform</h1>
      </div>

      <div className="border-b border-gray-700 mb-6"></div>
      <div
        className={`text-lg font-semibold mb-4 cursor-pointer ${isActive('/') ? 'text-purple-400' : 'text-white hover:text-purple-400'}`}
        onClick={() => navigate('/')}
      >
        Dashboard
      </div>

      <div className="border-b border-gray-700 mb-6"></div>

      <div className="mb-6">
        <div className="text-[#8F8F8F] text-sm mb-3">ASSIGNMENTS</div>
        <ul className="space-y-3">
          <li
            className={`flex items-center cursor-pointer ${isActive('/completed-quizzes') ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
            onClick={() => navigate('/completed-quizzes')}
          >
            <CheckCircle size={18} className="mr-2"/> Completed Quizzes
          </li>
          <li
            className={`flex items-center cursor-pointer ${isActive('/assign-quizzes') ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
            onClick={() => navigate('/assign-quizzes')}
          >
            <ClipboardList size={18} className="mr-2"/> Assign Quizzes
          </li>
        </ul>
      </div>

      <div className="border-b border-gray-700 mb-6"></div>

      <div className="mb-6">
        <div className="text-[#8F8F8F] text-sm mb-3">MY SUBJECTS</div>
        <ul className="space-y-3">
          <li
            className={`flex items-center cursor-pointer ${isActive('/pyqs') ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
            onClick={() => navigate('/pyqs')}
          >
            <FileText size={18} className="mr-2"/> PYQs
          </li>
          <li
            className={`flex items-center cursor-pointer ${isActive('/syllabus') ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
            onClick={() => navigate('/syllabus')}
          >
            <Book size={18} className="mr-2"/> Syllabus
          </li>
          <li
            className={`flex items-center cursor-pointer ${isActive('/materials') ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
            onClick={() => navigate('/materials')}
          >
            <BookMarked size={18} className="mr-2"/> Materials / Notes
          </li>
        </ul>
      </div>

      <div className="border-b border-gray-700 mb-6"></div>

      <div className="mb-6">
        <div className="text-[#8F8F8F] text-sm mb-3">RANKS</div>
        <ul className="space-y-3">
          <li
            className={`flex items-center cursor-pointer ${isActive('/view-ranks') ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
            onClick={() => navigate('/view-ranks')}
          >
            <Trophy size={18} className="mr-2"/> View Ranks
          </li>
        </ul>
      </div>

      <div className="border-b border-gray-700 mb-6"></div>

      <div className="mb-6">
        <div className="text-[#8F8F8F] text-sm mb-3">STUDENT</div>
        <ul className="space-y-3">
          <li
            className={`flex items-center cursor-pointer ${isActive('/my-students') ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
            onClick={() => navigate('/my-students')}
          >
            <Users size={18} className="mr-2"/> My Students
          </li>
        </ul>
      </div>

      <div className="mt-auto">
        <button className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] transition-all duration-200 p-2 rounded-lg w-full">
          <LogOut size={18} className="mr-2"/> Logout
        </button>
      </div>
    </div>
  );
}