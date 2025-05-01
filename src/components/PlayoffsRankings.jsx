import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

const TournamentRankings = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from Google Sheets...');
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQEjJcIIvqS_BzkOYEzQvWh0qCG7_jL00DyjC9EjOxc9Iy4idGMFmvZhrLaoC5RlwUpUmj4N4J_2qzk/pub?gid=1943489818&single=true&output=csv');
        const csvData = await response.text();
        console.log('CSV data received:', csvData.substring(0, 200) + '...');
        
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            console.log('Raw data:', results.data);
            const processedPlayers = results.data
              .filter(player => player.Rank && player.Username)
              .map(player => ({
                rank: parseInt(player.Rank),
                username: player.Username,
                team: player.Team,
                evalScore: parseFloat(player.EVAL) || 0,
                mainAgent: player['Main Agent'],
                role: player.Role,
                kills: parseFloat(player.Kills) || 0,
                deaths: parseFloat(player.Death) || 0,
                assists: parseFloat(player.Assists) || 0,
                acs: parseFloat(player.ACS) || 0,
                econRating: parseFloat(player['Econ Rating']) || 0,
                kast: parseFloat(player['KAST%']) || 0,
                akast: parseFloat(player['AKAST%']) || 0,
                headshot: parseFloat(player['Headshot %']) || 0,
                adr: parseFloat(player.ADR) || 0,
                tradePercentage: parseFloat(player['Trade Percentage']) || 0,
                clutchFactor: parseFloat(player['Clutch Factor']) || 0
              }))
              .sort((a, b) => a.rank - b.rank);
            
            console.log('Processed players:', processedPlayers);
            setPlayers(processedPlayers);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setError('Error parsing CSV data');
            setLoading(false);
          }
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePlayerClick = (player) => {
    navigate('/tournament-player-profile', { state: { player } });
  };

  const getRankStyle = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500 to-yellow-700 text-white shadow-lg shadow-yellow-500/20';
    if (rank <= 3) return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-lg shadow-gray-500/20';
    if (rank <= 5) return 'bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-lg shadow-amber-500/20';
    return 'bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm';
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex justify-center items-center">
      <div className="text-white text-2xl">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex justify-center items-center">
      <div className="text-red-500 text-2xl">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Playoffs Rankings
        </h1>
        
        <div className="overflow-hidden rounded-2xl shadow-2xl">
          <div className="bg-gray-800/50 backdrop-blur-sm">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                  <th className="py-6 px-8 text-left text-blue-400 font-bold text-xl">Rank</th>
                  <th className="py-6 px-8 text-left text-blue-400 font-bold text-xl">Username</th>
                  <th className="py-6 px-8 text-left text-blue-400 font-bold text-xl">Team</th>
                  <th className="py-6 px-8 text-left text-blue-400 font-bold text-xl">Kills</th>
                  <th className="py-6 px-8 text-left text-blue-400 font-bold text-xl">Deaths</th>
                  <th className="py-6 px-8 text-left text-blue-400 font-bold text-xl">Assists</th>
                  <th className="py-6 px-8 text-left text-blue-400 font-bold text-xl">ACS</th>
                  <th className="py-6 px-8 text-left text-blue-400 font-bold text-xl">Main Agent</th>
                  <th className="py-6 px-8 text-left text-blue-400 font-bold text-xl">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {players.map((player) => (
                  <tr 
                    key={player.username} 
                    className={`transition-all duration-300 cursor-pointer ${getRankStyle(player.rank)}`}
                    onClick={() => handlePlayerClick(player)}
                  >
                    <td className="py-6 px-8 font-bold text-xl">#{player.rank}</td>
                    <td className="py-6 px-8 font-bold text-xl">{player.username}</td>
                    <td className="py-6 px-8 font-bold text-xl">{player.team}</td>
                    <td className="py-6 px-8 font-bold text-xl">{player.kills.toFixed(1)}</td>
                    <td className="py-6 px-8 font-bold text-xl">{player.deaths.toFixed(1)}</td>
                    <td className="py-6 px-8 font-bold text-xl">{player.assists.toFixed(1)}</td>
                    <td className="py-6 px-8 font-bold text-xl">{player.acs.toFixed(1)}</td>
                    <td className="py-6 px-8 font-bold text-xl">{player.mainAgent}</td>
                    <td className="py-6 px-8 font-bold text-xl">{player.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentRankings; 
