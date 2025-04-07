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
            const player = {
              username: row[' USERNAME'].trim(),
              kills: Number(parseFloat(row['Kills']).toFixed(1)),
              death: Number(parseFloat(row['Death']).toFixed(1)),
              assists: Number(parseFloat(row['Assists']).toFixed(1)),
              eval: Number(parseFloat(row['EVAL']).toFixed(1)),
              team: row['Team'] || 'Unknown Team',
              change: row['CHANGE'] ? Number(parseFloat(row['CHANGE']).toFixed(1)) : null,
              rank: row['rank'] ? Number(row['rank']) : null,
              // Add all other columns from the spreadsheet
              ...Object.fromEntries(
                Object.entries(row).filter(([key]) => ![' USERNAME', 'Kills', 'Death', 'Assists', 'EVAL', 'Team', 'CHANGE', 'rank'].includes(key))
                  .map(([key, value]) => {
                    // Try to parse numeric values and round them
                    const numValue = parseFloat(value);
                    if (!isNaN(numValue)) {
                      return [key, Number(numValue.toFixed(1))];
                    }
                    return [key, value];
                  })
              )
            };
            console.log('Processed player:', player);
            return player;
          })
          .sort((a, b) => {
            // Use rank column if available, otherwise fall back to EVAL
            if (a.rank !== null && b.rank !== null) {
              return a.rank - b.rank;
            }
            return b.eval - a.eval;
          });

        console.log('Processed player data:', validPlayerData.slice(0, 3));

        // Process team data
        const validTeamData = teamResults.data
          .filter(row => row['Team'])
          .map(row => ({
            ...row,
            rank: row['rank'] ? Number(row['rank']) : null
          }))
          .sort((a, b) => {
            // Use rank column if available, otherwise fall back to EVAL
            if (a.rank !== null && b.rank !== null) {
              return a.rank - b.rank;
            }
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
    return change >= 0 ? 'text-green-500' : 'text-red-500';
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
              {Object.entries(selectedPlayer)
                .filter(([key]) => !['username', 'kills', 'death', 'assists', 'eval', 'team'].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="bg-black/50 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">{key.replace(/_/g, ' ').toUpperCase()}</p>
                    <p className="text-lg font-bold text-white">{value}</p>
                  </div>
                ))}
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
                  <p className="font-bold text-white text-lg">{team['Team']}</p>
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