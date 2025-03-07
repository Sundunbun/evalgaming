import React, { useState } from 'react';
import ValorantLeaderboard from '../components/ValorantLeaderboard';
import PowerRankings from '../components/PowerRankings';

const Valorant = () => {
  const [showPowerRankings, setShowPowerRankings] = useState(false);

  return (
    <div className="w-full bg-[#0f0f1a] text-white py-16">
     

      {/* 🔥 Full Rankings Section */}
      <section className="max-w-[800px] mx-auto py-16 px-4">
        {/* Header & Tabs */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Rankings</h2>
          <div className="flex bg-gray-600 rounded-lg p-1">
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                !showPowerRankings ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setShowPowerRankings(false)}
            >
              Top 50
            </button>
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                showPowerRankings ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setShowPowerRankings(true)}
            >
              Power Rankings
            </button>
          </div>
        </div>

        {/* Rankings Table */}
        <div className="rounded-lg bg-[#1a1a2e] p-6 shadow-lg">
          {showPowerRankings ? <PowerRankings /> : <ValorantLeaderboard />}
        </div>
      </section>
    </div>
  );
};

export default Valorant;
