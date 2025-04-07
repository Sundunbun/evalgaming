import React, { useEffect } from "react";
import valorantHeader from "../assets/valorant_header.png";
import valorantWhite from "../assets/valorant_white.png";
import eLogoWhite from "../assets/eLOGO_white.png";
import { Link } from "react-router-dom";

const HomePage = () => {
  useEffect(() => {
    document.title = "EVAL";
  }, []);

  return (
    <div className="relative w-full bg-[#0f0f1a] text-white flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-20 md:py-32">
      
      {/* LEFT SIDE - College Esports Recruiting */}
      <div className="max-w-lg md:w-1/2">
        {/* EVAL Logo */}
        <div className="flex flex-col justify-center">
          <div className="text-center">
            <img src={eLogoWhite} alt="EVAL Gaming Logo" className="w-64 mx-auto mb-6" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            The College Esports Recruiting Platform
          </h1>
        </div>
        <ul className="text-gray-400 text-lg mt-6 space-y-2">
          <li>✔️ <span className="text-white">Verified College Coaches</span></li>
          <li>✔️ <span className="text-white">Free Accounts for Players</span></li>
          <li>✔️ <span className="text-white">$50 Million+ in Scholarships Available</span></li>
        </ul>
      </div>

      {/* RIGHT SIDE - Valorant Rankings */}
      <div className="flex flex-col items-center text-center md:w-1/2 mt-12 md:mt-0">
        
        {/* Stacked Images */}
        <div className="relative flex flex-col items-center">
          <img 
            src={valorantHeader} 
            alt="Valorant Header" 
            className="w-80 md:w-[22rem]"
          />
          <img 
            src={valorantWhite} 
            alt="Valorant Logo" 
            className="w-44 md:w-48 -mt-5"
          />
        </div>

        {/* Text Section */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-4">
          Valorant Rankings
        </h2>
        <p className="text-lg text-gray-300 mt-2 max-w-sm md:max-w-md">
          Eval Gaming & GSE bring you the top 5 v 5 Valorant rankings this spring! 🏆 NJ's best battle for the top spot.
        </p>

        {/* Riot-Style Button with Correct Link */}
        <Link 
          to="/rankings/valorant"  // ✅ Corrected path to go to Valorant Rankings
          className="mt-6 bg-[#007bff] hover:bg-[#005bb5] text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300"
        >
          <span>View Rankings</span>
          <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

    </div>
  );
};

export default HomePage;
