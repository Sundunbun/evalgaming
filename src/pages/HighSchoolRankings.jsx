import React from 'react';
import { Link } from 'react-router-dom';
import gseLogo from '../assets/GSE_LOGO.png';
import pwrRankings from '../assets/pwrrankings.png';
import top50 from '../assets/top50.png';

export default function HighSchoolRankings() {
  const topSchools = [
    { rank: 1, name: "Westfield High School", record: "14-2" },
    { rank: 2, name: "Millburn Academy", record: "13-3" },
    { rank: 3, name: "East Brunswick Tech", record: "12-4" },
    { rank: 4, name: "Princeton High", record: "11-5" },
    { rank: 5, name: "Montclair Prep", record: "10-6" }
  ];

  return (
    <div className="w-full bg-[#0f0f1a] text-white py-16">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT SECTION - GSE Info and Rankings */}
        <div className="bg-black p-6 rounded-2xl shadow-2xl border border-purple-900/30">
          {/* GSE Logo and Info */}
          <div className="text-center">
            <img src={gseLogo} alt="Garden State Esports" className="w-32 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Garden State Esports</h2>
            <p className="text-gray-300 text-sm">
              Official high school esports league for New Jersey. Featuring competitive play across multiple titles and divisions.
            </p>
            <a 
              href="https://gsesports.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
            >
              Visit GSE Website
            </a>
          </div>

          {/* New Jersey Rankings */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-3">New Jersey Rankings</h3>
            <div className="space-y-2">
              {topSchools.map(school => (
                <div key={school.rank} className="flex items-center bg-black/50 p-2 rounded-lg border border-purple-900/20">
                  <div className="w-6 h-6 bg-purple-800 rounded-full flex items-center justify-center mr-2 font-bold text-xs">
                    {school.rank}
                  </div>
                  <p className="flex-1 font-bold text-white text-sm">{school.name}</p>
                  <p className="text-xs text-gray-400">Record: {school.record}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - Game Rankings */}
        <div className="bg-black p-6 rounded-2xl shadow-2xl border border-purple-900/30">
          <h2 className="text-2xl font-bold text-white mb-6">Game Rankings</h2>

          {/* Valorant Rankings */}
          <Link 
            to="/rankings/valorant" 
            className="block bg-[#1a1a1a] hover:bg-[#222] p-5 rounded-xl border border-[#333] hover:border-purple-500 transition-all duration-300"
          >
            <h3 className="text-lg font-bold text-white mb-2">Valorant Rankings</h3>
            <p className="text-gray-400 text-sm">
              View top schools and players competing in Valorant across New Jersey.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
