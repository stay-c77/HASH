import React from 'react';
import { Eye } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#2D2B3D] flex items-center justify-center p-4">
      <div className="w-full max-w-[1100px] bg-[#1E1C2E] rounded-3xl overflow-hidden flex shadow-2xl">
        {/* Left Side - Image Section */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          {/* Replace this URL with your desired background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('Images/LoginPage-Background.jpg')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C2E]/80 to-transparent" />
          <div className="relative z-10 p-12 flex flex-col h-full">
            {/* Logo */}
            <div className="text-white text-2xl font-bold mb-auto">
              {/* Replace with your logo */}
              LOGO
            </div>
            {/* Tagline */}
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-4">Quiz Smart,<br />Learn Fast</h2>
              {/* Dots navigation */}
              <div className="flex gap-2 mt-6">
                <div className="w-8 h-1 bg-gray-500 rounded-full"></div>
                <div className="w-8 h-1 bg-gray-500 rounded-full"></div>
                <div className="w-8 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl text-white font-bold">Login to your Account</h1>
          </div>

          <form className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First name"
                className="flex-1 bg-[#2D2B3D] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Last name"
                className="flex-1 bg-[#2D2B3D] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-[#2D2B3D] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-[#2D2B3D] text-white rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F8F8F]">
                <Eye size={20} />
              </button>
            </div>

            <label className="flex items-center gap-2 text-[#8F8F8F]">
              <input type="checkbox" className="rounded bg-[#2D2B3D] border-[#8F8F8F]" />
              I agree to the Terms & Conditions
            </label>

            <button
              type="submit"
              className="w-full bg-[#7C3AED] text-white rounded-lg p-3 font-medium hover:bg-[#6D28D9] transition-colors"
            >
              Create account
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2D2B3D]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1E1C2E] text-[#8F8F8F]">Or register with</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-[#2D2B3D] text-white rounded-lg p-3 hover:bg-[#363447] transition-colors"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Google
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-[#2D2B3D] text-white rounded-lg p-3 hover:bg-[#363447] transition-colors"
              >
                <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5" />
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;