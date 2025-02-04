import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50">
      <header className="text-center p-6">
        <h1 className="text-4xl font-bold text-blue-600">AI Quiz Generator</h1>
        <p className="mt-4 text-lg text-gray-700">Automating quiz creation to make teaching easier!</p>
      </header>
      <div className="mt-6 space-x-4">
        <button className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600">Teacher Portal</button>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">Student Portal</button>
      </div>
      <footer className="mt-10 text-sm text-gray-500">© 2025 AI Quiz Generator</footer>
    </div>
  );
};

export default Home;
