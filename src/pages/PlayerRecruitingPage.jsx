import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import playersImage from '../assets/players.png'; // ✅ Ensure the correct path

const PlayerRecruitingPage = () => {
  useEffect(() => {
    document.title = "EVAL | Player Recruiting";
  }, []);

  return (
    <div className="w-full bg-[#0f0f1a] text-white">
      {/* ✅ Centered Container with Increased Top Padding */}
      <div className="max-w-screen-lg mx-auto px-4 pb-24 pt-32">

        {/* 🔥 Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          {/* Left Content */}
          <div className="flex flex-col space-y-4">
            <h1 className="text-5xl text-white font-bold leading-tight">
              The Global Esports <br /> Recruiting Platform
            </h1>
            <p className="text-base text-gray-400">
              Build your esports career with Eval! Showcase your skills, track progress, 
              and connect with verified college recruiters.
            </p>
            <Link
              to="/signup/player"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-purple-500 transition-colors"
            >
              Create Free Account
            </Link>
          </div>

          {/* Right Image */}
          <div className="w-full flex justify-center">
            <img 
              src={playersImage}
              alt="EVAL Official"
              className="w-full max-w-sm h-auto rounded-lg object-cover"
            />
          </div>
        </div>

        {/* 🔹 Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard 
            title="Player Performance Tracking" 
            points={[
              "Track and showcase individual performance metrics.",
              "Customizable evaluation criteria for specific strengths."
            ]}
          />
          <FeatureCard 
            title="Leaderboards and Rankings" 
            points={[
              "Real-time leaderboards across schools and leagues.",
              "Customizable metrics to highlight unique skills."
            ]}
          />
          <FeatureCard 
            title="Recruiting Profiles" 
            points={[
              "Comprehensive player profiles with stats and highlights.",
              "Shareable links for recruiters to view your progress."
            ]}
          />
          <FeatureCard 
            title="Analytics and Reports" 
            points={[
              "Advanced performance analytics for in-depth insights.",
              "Shareable progress reports for recruiters and coaches."
            ]}
          />
        </div>

        {/* 🔥 Why Join Eval? Section */}
        <div className="bg-[#1a1a1a] p-8 rounded-2xl max-w-lg mx-auto mt-24 text-center">
          <h2 className="text-3xl font-bold text-purple-500 mb-6">Why Join Eval?</h2>
          <ul className="space-y-4 text-base text-gray-300">
            <li>✅ Showcase your skills to college recruiters</li>
            <li>✅ Track your progress and improvement</li>
            <li>✅ Get noticed by top collegiate esports programs</li>
            <li>✅ Access recruitment resources and expert guidance</li>
          </ul>
          <div className="mt-8">
            <Link 
              to="/signup/player"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-xl text-base font-semibold hover:bg-purple-500 transition-colors"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 📌 Feature Card Component */
const FeatureCard = ({ title, points }) => (
  <div className="bg-[#1E1B2C] p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
    <h3 className="text-2xl font-bold text-[#4299E1] mb-4">{title}</h3>
    <ul className="space-y-3">
      {points.map((point, index) => (
        <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
          <span className="text-[#4299E1] text-lg">•</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default PlayerRecruitingPage;
