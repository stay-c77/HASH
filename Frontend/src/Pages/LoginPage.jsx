import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        'Images/LoginPage-Background.jpg',
        'Images/LoginPage-Background2.jpg',
        'Images/LoginPage-Background3.jpg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 7000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#2D2B3D] flex items-center justify-center p-4">
            <div className="w-full max-w-[1100px] bg-[#1E1C2E] rounded-3xl overflow-hidden flex shadow-2xl">

                {/* Left Side - Image Section (Slideshow) */}
                <div className="hidden lg:flex lg:w-1/2 relative">
                    {slides.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                            style={{ backgroundImage: `url('${image}')` }}
                        />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C2E]/80 to-transparent" />
                    <div className="relative z-10 p-12 flex flex-col h-full">
                        <div
                            className="absolute -top-4 left-1 bg-no-repeat bg-center bg-contain"
                            style={{ backgroundImage: "url('Images/HashLogo.png')", width: "150px", height: "150px" }}
                        />
                        <div className="text-white mt-auto">
                            <h2 className="text-4xl font-bold mb-6">Quiz Smart,<br />Learn Fast</h2>
                            <div className="flex gap-2">
                                {slides.map((_, index) => (
                                    <div key={index} className={`w-8 h-1 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-500'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form Section */}
                <div className="w-full lg:w-1/2 p-8 md:p-12">
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="text-3xl text-white font-bold">Login to your Account</h1>
                    </div>

                    <form className="space-y-6">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {/* Password Input with Show/Hide Toggle */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full bg-[#2D2B3D] text-white rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F8F8F]"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#7C3AED] text-white rounded-lg p-3 font-medium hover:bg-[#6D28D9] transition-colors"
                        >
                            Login to your account
                        </button>

                        <div className="relative my-10">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#2D2B3D]"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#1E1C2E] text-[#8F8F8F]">Or login with</span>
                            </div>
                        </div>

                        <div className="flex gap-6">
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

export default LoginPage;
