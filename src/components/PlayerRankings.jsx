import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import allPlayers from '../assets/allplayers.png';
import pwrRankings from '../assets/pwrrankings.png';

const PlayerRankings = ({ initialView = null }) => {
  const [playerRankingsData, setPlayerRankingsData] = useState([]);
  const [teamRankingsData, setTeamRankingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState(initialView);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        // Fetch all required data
        const [playerResponse, teamResponse] = await Promise.all([
          fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQEjJcIIvqS_BzkOYEzQvWh0qCG7_jL00DyjC9EjOxc9Iy4idGMFmvZhrLaoC5RlwUpUmj4N4J_2qzk/pub?gid=1296752845&single=true&output=csv'),
          fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQEjJcIIvqS_BzkOYEzQvWh0qCG7_jL00DyjC9EjOxc9Iy4idGMFmvZhrLaoC5RlwUpUmj4N4J_2qzk/pub?gid=861121401&single=true&output=csv')
        ]);

        const [playerText, teamText] = await Promise.all([
          playerResponse.text(),
          teamResponse.text()
        ]);

        console.log('Raw player text:', playerText.substring(0, 200));

        // Parse CSV files
        const [playerResults, teamResults] = await Promise.all([
          new Promise((resolve) => {
            Papa.parse(playerText, {
              header: true,
              complete: resolve
            });
          }),
          new Promise((resolve) => {
            Papa.parse(teamText, {
              header: true,
              complete: resolve
            });
          })
        ]);

        console.log('Player data headers:', playerResults.data[0]);
        console.log('First player row:', playerResults.data[1]);

        // Process player data
        const validPlayerData = playerResults.data
          .filter(row => {
            // Skip header rows and empty rows
            if (row[' USERNAME'] === 'MAP' || row[' USERNAME'] === 'SUMMARY' || row[' USERNAME'] === 'MAR 13 , 2025 STANDARD CUSTOM') {
              return false;
            }
            // Check if we have valid data
            const isValid = row[' USERNAME'] && row['Kills'] && row['Death'] && row['Assists'] && row['EVAL'];
            if (!isValid) {
              console.log('Invalid row:', row);
            }
            return isValid;
          })
          .map(row => {
            // Helper function to check if a value is empty/blank
            const getValue = (value, key) => {
              console.log(`Processing ${key}:`, value);
              if (!value || value === '' || value === ' ' || value === undefined || value === null) {
                console.log(`${key} is empty, returning '-'`);
                return '-';
              }
              const numValue = Number(parseFloat(value).toFixed(1));
              if (isNaN(numValue)) {
                console.log(`${key} is not a number, returning '-'`);
                return '-';
              }
              return numValue;
            };

            const player = {
              username: row[' USERNAME'].trim(),
              kills: getValue(row['Kills'], 'Kills'),
              death: getValue(row['Death'], 'Death'),
              assists: getValue(row['Assists'], 'Assists'),
              eval: getValue(row['EVAL'], 'EVAL'),
              team: row['Team'] || 'Unknown Team',
              change: row['CHANGE'] ? Number(parseFloat(row['CHANGE']).toFixed(1)) : null,
              rank: row['Rank'] ? Number(row['Rank']) : null,
              // Additional stats for profile view
              Kills: getValue(row['Kills'], 'Kills'),
              Death: getValue(row['Death'], 'Death'),
              Assists: getValue(row['Assists'], 'Assists'),
              EVAL: getValue(row['EVAL'], 'EVAL'),
              Team: row['Team'] || 'Unknown Team',
              Rank: row['Rank'] ? Number(row['Rank']) : null,
              CHANGE: row['CHANGE'] ? Number(parseFloat(row['CHANGE']).toFixed(1)) : null,
              'Econ Rating': getValue(row['Econ Rating'], 'Econ Rating'),
              'First Bloods': getValue(row['First Bloods'], 'First Bloods'),
              Plants: getValue(row['Plants'], 'Plants'),
              Defuses: getValue(row['Defuses'], 'Defuses')
            };
            console.log('Processed player:', player);
            return player;
          })
          .sort((a, b) => {
            // Use rank column if available, otherwise fall back to EVAL
            if (a.rank !== null && b.rank !== null) {
              return a.rank - b.rank;
            }
            // If one has rank and other doesn't, prioritize the one with rank
            if (a.rank !== null) return -1;
            if (b.rank !== null) return 1;
            // Fall back to EVAL score only if neither has rank
            return b.eval - a.eval;
          });

        console.log('Processed player data:', validPlayerData.slice(0, 3));

        // Process team data
        const validTeamData = teamResults.data
          .filter(row => row['Team'])
          .map(row => ({
            ...row,
            rank: row['Rank'] ? Number(row['Rank']) : null
          }))
          .sort((a, b) => {
            // Always use rank column if available
            if (a.rank !== null && b.rank !== null) {
              return a.rank - b.rank;
            }
            // If one has rank and other doesn't, prioritize the one with rank
            if (a.rank !== null) return -1;
            if (b.rank !== null) return 1;
            // Fall back to EVAL score only if neither has rank
            return parseFloat(b['EVAL']) - parseFloat(a['EVAL']);
          });

        setPlayerRankingsData(validPlayerData);
        setTeamRankingsData(validTeamData);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  // Helper function to determine the color for change values
  const getChangeColor = (change) => {
    if (change === null) return 'text-gray-400';
    if (change === 0) return 'text-gray-400';
    return change > 0 ? 'text-green-500' : 'text-red-500';
  };

  // Helper function to get change symbol
  const getChangeSymbol = (change) => {
    if (change === null) return '–';
    return change >= 0 ? '↑' : '↓';
  };

  if (loading) return <div className="text-white text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!playerRankingsData.length) return <div className="text-white text-center py-8">No player data available</div>;

  if (selectedPlayer) {
    return (
      <div className="bg-black p-8 rounded-2xl shadow-2xl border border-purple-900/30">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Player Details</h2>
          <button
            onClick={() => setSelectedPlayer(null)}
            className="bg-[#1a1a1a] hover:bg-[#222] px-4 py-2 rounded-lg border border-[#333] hover:border-purple-500 transition-all duration-300 text-gray-300"
          >
            Back to Rankings
          </button>
        </div>
        <div className="bg-gradient-to-r from-purple-900/10 to-black p-8 rounded-xl border border-purple-900/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{selectedPlayer.username}</h3>
              <p className="text-gray-400 mb-2">Team: {selectedPlayer.team}</p>
              <p className="text-gray-400 mb-2">EVAL Score: {selectedPlayer.eval.toFixed(2)}</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Performance Stats</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-black/50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-white">{selectedPlayer.kills}</p>
                  <p className="text-sm text-gray-400">Kills</p>
                </div>
                <div className="bg-black/50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-white">{selectedPlayer.death}</p>
                  <p className="text-sm text-gray-400">Deaths</p>
                </div>
                <div className="bg-black/50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-white">{selectedPlayer.assists}</p>
                  <p className="text-sm text-gray-400">Assists</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h4 className="text-xl font-bold text-white mb-4">Additional Stats</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Kills */}
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">KILLS</p>
                <p className="text-lg font-bold text-white">{selectedPlayer.Kills || 0}</p>
              </div>
              
              {/* Death */}
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">DEATH</p>
                <p className="text-lg font-bold text-white">{selectedPlayer.Death || 0}</p>
              </div>
              
              {/* Assists */}
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">ASSISTS</p>
                <p className="text-lg font-bold text-white">{selectedPlayer.Assists || 0}</p>
              </div>
              
              {/* Econ Rating */}
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">ECON RATING</p>
                <p className="text-lg font-bold text-white">{selectedPlayer['Econ Rating'] || 0}</p>
              </div>
              
              {/* First Bloods */}
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">FIRST BLOODS</p>
                <p className="text-lg font-bold text-white">{selectedPlayer['First Bloods'] || 0}</p>
              </div>
              
              {/* Plants */}
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">PLANTS</p>
                <p className="text-lg font-bold text-white">{selectedPlayer.Plants || 0}</p>
              </div>
              
              {/* Defuses */}
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">DEFUSES</p>
                <p className="text-lg font-bold text-white">{selectedPlayer.Defuses || 0}</p>
              </div>
              
              {/* EVAL */}
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">EVAL</p>
                <p className="text-lg font-bold text-white">{selectedPlayer.EVAL || 0}</p>
              </div>
              
              {/* Team */}
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">TEAM</p>
                <p className="text-lg font-bold text-white">{selectedPlayer.Team || 'N/A'}</p>
              </div>
              
              {/* Rank */}
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">RANK</p>
                <p className="text-lg font-bold text-white">{selectedPlayer.Rank || 'N/A'}</p>
              </div>
              
              {/* CHANGE */}
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">CHANGE</p>
                <p className="text-lg font-bold text-white">{selectedPlayer.CHANGE || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!view) {
    return (
      <div className="bg-black p-8 rounded-2xl shadow-2xl border border-purple-900/30">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Player Rankings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => setView('top50')}
            className="bg-[#1a1a1a] hover:bg-[#222] p-5 rounded-xl border border-[#333] hover:border-purple-500 transition-all duration-300 flex flex-col items-center"
          >
            <img src="/assets/top50.png" alt="Top 50" className="h-12 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Top 50 Players</h3>
            <p className="text-gray-400 text-sm text-center">
              View the top 50 players ranked by EVAL score.
            </p>
          </button>
          <button
            onClick={() => setView('teams')}
            className="bg-[#1a1a1a] hover:bg-[#222] p-5 rounded-xl border border-[#333] hover:border-purple-500 transition-all duration-300 flex flex-col items-center"
          >
            <img src={pwrRankings} alt="Power Rankings" className="h-12 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Team Rankings</h3>
            <p className="text-gray-400 text-sm text-center">
              View team rankings and match records.
            </p>
          </button>
          <button
            onClick={() => setView('players')}
            className="bg-[#1a1a1a] hover:bg-[#222] p-5 rounded-xl border border-[#333] hover:border-purple-500 transition-all duration-300 flex flex-col items-center"
          >
            <img src={allPlayers} alt="All Players" className="h-12 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">All Players</h3>
            <p className="text-gray-400 text-sm text-center">
              View complete player rankings and statistics.
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black p-8 rounded-2xl shadow-2xl border border-purple-900/30">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">
          {view === 'top50' ? 'Top 50 Players' : view === 'players' ? 'All Players' : 'Team Rankings'}
        </h2>
        <button
          onClick={() => setView(null)}
          className="bg-[#1a1a1a] hover:bg-[#222] px-4 py-2 rounded-lg border border-[#333] hover:border-purple-500 transition-all duration-300 text-gray-300"
        >
          Back to Menu
        </button>
      </div>

      {view === 'teams' ? (
        <div className="grid gap-4">
          {teamRankingsData.map((team, index) => (
            <div key={index} className="flex items-center bg-gradient-to-r from-purple-900/10 to-black p-6 rounded-xl border border-purple-900/20 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <span className="text-purple-400 font-bold text-lg">#{index + 1}</span>
                  <div>
                    <p className="font-bold text-white text-lg">{team['Team']}</p>
                    <p className="text-sm text-gray-400">{team['Group'] || 'No Group'}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-1">Record: {team['Wins']}-{team['Losses']}-{team['Ties']}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-white text-lg">EVAL: {parseFloat(team['EVAL']).toFixed(1)}</p>
                {team['Change'] && (
                  <div className={`flex items-center justify-end gap-1 ${getChangeColor(parseFloat(team['Change']))}`}>
                    <span>{getChangeSymbol(parseFloat(team['Change']))}</span>
                    <span>{Math.abs(parseFloat(team['Change'])).toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {(view === 'top50' ? playerRankingsData.slice(0, 50) : playerRankingsData).map((player, index) => (
            <div 
              key={index} 
              onClick={() => handlePlayerClick(player)}
              className="flex items-center bg-gradient-to-r from-purple-900/10 to-black p-6 rounded-xl border border-purple-900/20 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:bg-purple-900/10"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <span className="text-purple-400 font-bold text-lg">#{index + 1}</span>
                  <p className="font-bold text-white text-lg">{player.username}</p>
                </div>
                <p className="text-sm text-gray-400 mt-1">{player.team}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-white text-lg">EVAL: {player.eval.toFixed(1)}</p>
                <p className="text-sm text-gray-400">{player.kills}-{player.death}-{player.assists}</p>
                {player.change !== null && (
                  <div className={`flex items-center justify-end gap-1 ${getChangeColor(player.change)}`}>
                    <span>{getChangeSymbol(player.change)}</span>
                    <span>{Math.abs(player.change).toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerRankings; 