import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gseLogo from '../assets/GSE_LOGO.png';
import kellerLogo from '../assets/keller.png';
import psvLogo from '../assets/PSV.png';

const Partnerships = () => {
  useEffect(() => {
    document.title = "EVAL | Partnerships";
  }, []);

  return (
    <div className="bg-[#0f0f1a] text-white py-20 w-full">
      <div className="container mx-auto px-8">
        <h1 className="text-4xl font-bold text-white text-center mb-12">Our Partnerships</h1>

        {/* 🔹 Grid for Equal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 🏆 GSE Partnership */}
          <div className="flex flex-col items-center bg-[#1a1a2e] p-8 rounded-xl shadow-lg border border-purple-900/40 text-center min-h-[200px]">
            <img src={gseLogo} alt="Garden State Esports" className="w-40 h-auto mb-6" />
            <h2 className="text-2xl text-white font-bold mb-4">Garden State Esports</h2>
            <p className="text-gray-300 mb-6">
              The official high school esports league for New Jersey, featuring competitive play across multiple titles.
            </p>
            <a 
              href="https://gsesports.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition"
            >
              Visit GSE Website
            </a>
          </div>

          {/* 🚀 Keller Center Partnership */}
          <div className="flex flex-col items-center bg-[#1a1a2e] p-8 rounded-xl shadow-lg border border-purple-900/40 text-center min-h-[200px]">
            <img src={kellerLogo} alt="Keller Center" className="w-40 h-auto mb-6" />
            <h2 className="text-2xl text-white font-bold mb-4">Princeton Keller Center</h2>
            <p className="text-gray-300 mb-6">
              Princeton University's hub for entrepreneurship, innovation, and impact-driven startups.
            </p>
            <a 
              href="https://kellercenter.princeton.edu/people/startups-teams/eval" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition"
            >
              Visit Keller Center
            </a>
          </div>

          {/* 🏫 Princeton Student Ventures (PSV) */}
          <div className="flex flex-col items-center bg-[#1a1a2e] p-8 rounded-xl shadow-lg border border-purple-900/40 text-center min-h-[200px]">
            <img src={psvLogo} alt="Princeton Student Ventures" className="w-40 h-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Princeton Student Ventures</h2>
            <p className="text-gray-300 mb-6">
              Supporting Princeton student founders through funding, mentorship, and startup incubation.
            </p>
            <a 
              href="https://www.psv.vc/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition"
            >
              Visit PSV
            </a>
          </div>
        </div>

        {/* 📢 Become a Partner Section */}
        <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-8 rounded-xl border border-purple-500/40 mt-16 text-center w-full">
          <h3 className="text-3xl text-white font-bold mb-4">Become a Partner</h3>
          <p className="text-gray-300 text-lg max-w-[900px] mx-auto mb-8">
            Are you an organization interested in working with EVAL Gaming? Partner with us to expand opportunities for high school esports players nationwide.
          </p>
          <Link to="/partnership-signup" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition">
            Become a Partner
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Partnerships;
