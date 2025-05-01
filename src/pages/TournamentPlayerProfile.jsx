import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TournamentPlayerProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { player } = location.state || {};

  if (!player) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">No player data available</p>
      </div>
    );
  }

  const stats = [
    { label: 'Kills', value: player.kills },
    { label: 'Deaths', value: player.deaths },
    { label: 'Assists', value: player.assists },
    { label: 'ACS', value: player.acs.toFixed(1) },
    { label: 'Econ Rating', value: player.econRating.toFixed(1) },
    { label: 'KAST%', value: player.kast.toFixed(1) + "%"},
    { label: 'AKAST%', value: player.akast.toFixed(1) + "%" },
    { label: 'Headshot %', value: player.headshot.toFixed(1) + "%"},
    { label: 'ADR', value: player.adr.toFixed(1) },
    { label: 'Trade Percentage', value: player.tradePercentage.toFixed(1) + "%" },
    { label: 'Clutch Factor', value: player.clutchFactor.toFixed(2) }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Back to Rankings
      </button>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
            <span className="text-3xl font-bold">#{player.rank}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{player.username}</h1>
            <p className="text-gray-600">{player.team}</p>
            <p className="text-gray-600">Main Agent: {player.mainAgent}</p>
            <p className="text-gray-600">Role: {player.role}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Player Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentPlayerProfile; 
