import React from 'react';
import { Link } from 'react-router-dom';
import CoachSignupForm from '../pages/CoachSignup';
import coachImage from '../assets/coach2.png';

const CoachRecruitingPage = () => {
  return (
    <div 
      className="flex flex-col items-center w-full min-h-screen px-4 pb-32 pt-24" 
      style={{ backgroundColor: "#0f0f1a" }} // ✅ Ensure background applies
    >
      {/* 🔥 Hero Section */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-center md:text-left">
        {/* Left Content */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Overview of Eval for Coaches
          </h1>
          <p className="text-lg text-gray-400">
            Eval is built to support coaches by providing streamlined tools to 
            <span className="text-purple-400 font-semibold"> evaluate, track, and enhance player performance.</span>  
            With <span className="text-blue-400 font-semibold">data-driven insights</span>,  
            <span className="text-green-400 font-semibold"> team management tools</span>, and 
            <span className="text-indigo-400 font-semibold"> customizable analytics</span>, Eval makes 
            <span className="text-purple-400 font-semibold"> recruiting and player development easier than ever.</span>
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              to="/signup/coach"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-500 transition-all"
            >
              Start Recruiting
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img 
            src={coachImage}
            alt="Esports Coach"
            className="w-full max-w-lg rounded-lg object-cover"
          />
        </div>
      </div>

      {/* 🔹 Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto my-20">
        {/* ✅ Player Performance Evaluation */}
        <FeatureCard 
          title="Player Performance Evaluation" 
          points={[
            "Input, track, and visualize player performance metrics.",
            "Customizable evaluation criteria for specific skills."
          ]}
        />

        {/* ✅ Leaderboards and Rankings */}
        <FeatureCard 
          title="Leaderboards and Rankings" 
          points={[
            "Real-time insights into team standings.",
            "Customizable ranking metrics tailored to your needs."
          ]}
        />

        {/* ✅ Team Management Tools */}
        <FeatureCard 
          title="Team Management Tools" 
          points={[
            "Detailed team rosters and player profiles.",
            "Schedule and practice management built in."
          ]}
        />

        {/* ✅ Analytics and Reports */}
        <FeatureCard 
          title="Analytics and Reports" 
          points={[
            "Advanced player performance analytics.",
            "Shareable progress reports for team evaluation."
          ]}
        />
      </div>

      {/* 🔥 CTA Section */}
      <div 
        className="bg-[#1a1a1a] p-10 rounded-2xl w-full max-w-[800px] mx-auto mt-16 text-center"
        style={{ backgroundColor: "#1a1a1a" }} // ✅ Ensure background applies
      >
        <h2 className="text-4xl font-bold text-purple-500 mb-6">Join Eval as a Coach</h2>
        <p className="text-lg text-gray-300 mb-8">
          Gain access to powerful tools to <span className="text-blue-400 font-semibold">scout players</span>, 
          <span className="text-green-400 font-semibold"> track progress</span>, and 
          <span className="text-indigo-400 font-semibold"> manage recruiting</span> for your team.
        </p>
        <div className="flex justify-center">
          <CoachSignupForm />
        </div>
      </div>
    </div>
  );
};

/* 📌 Feature Card Component */
const FeatureCard = ({ title, points }) => (
  <div 
    className="bg-[#1E1B2C] p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all w-full"
    style={{ backgroundColor: "#1E1B2C" }} // ✅ Ensure background applies
  >
    <h3 className="text-2xl font-bold text-[#4299E1] mb-4">{title}</h3>
    <ul className="space-y-3 text-gray-300">
      {points.map((point, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="text-[#4299E1] text-lg mt-1.5">•</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default CoachRecruitingPage;
