// Banner.js
import React from 'react';

const Banner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 via-black to-white text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          OpenAI GPT Marketplace for Web3
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Explore the power of AI with GPT technology in the decentralized web.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Banner;
