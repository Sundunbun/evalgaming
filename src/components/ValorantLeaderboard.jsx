import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; // You'll need to install this: npm install papaparse

const ValorantLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getChangeDisplay = (change) => {
    const changeNum = parseInt(change);
    if (changeNum > 0) {
      return <span className="text-green-500">↑{changeNum}</span>;
    } else if (changeNum < 0) {
      return <span className="text-red-500">↓{Math.abs(changeNum)}</span>;
    }
    return <span className="text-gray-500">-</span>;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSH70f5FEiYnOu23SIoPzuNCslgyYRJhQL9tFmC5DAbrtSf9uSZRD56DIJPNl24SiH2o4xfxW0Z_eTy/pub?output=csv');
        const csvText = await response.text();
        console.log('CSV Text:', csvText);
        
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            console.log('Parsed results:', results);
            const validData = results.data
              .filter(row => row['Player Name'] && row['Eval Score'])
              .sort((a, b) => parseFloat(b['Eval Score']) - parseFloat(a['Eval Score']));
            console.log('Valid data:', validData);
            setLeaderboardData(validData);
            setLoading(false);
          },
          error: (error) => {
            console.error('Parse error:', error);
            setError('Error parsing data');
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  if (!leaderboardData.length) {
    return <div className="text-white text-center py-8">No data available</div>;
  }

  return (
    <div className="bg-[#0f0f1a] p-6 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 text-sm border-b border-gray-800">
            <th className="text-left py-4 px-4">RANK</th>
            <th className="text-left py-4 px-4">CHANGE</th>
            <th className="text-left py-4 px-4">PLAYER</th>
            <th className="text-left py-4 px-4">POSITION</th>
            <th className="text-left py-4 px-4">TEAM</th>
            <th className="text-right py-4 px-4">EVAL COMPOSITE</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player, index) => (
            <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
              <td className="py-4 px-4 text-white">{index + 1}</td>
              <td className="py-4 px-4">
                {getChangeDisplay(player.change)}
              </td>
              <td className="py-4 px-4">
                <div>
                  <div className="text-white font-medium">{player['Player Name']}</div>
                  <div className="text-gray-500 text-sm">{player['Player ID'] || 'Player ID'}</div>
                </div>
              </td>
              <td className="py-4 px-4 text-white">
                {player.Position || 'Controller'}
              </td>
              <td className="py-4 px-4 text-white">
                {player.Team || 'Team Name'}
              </td>
              <td className="py-4 px-4 text-right text-white font-medium">
                {parseFloat(player['Eval Score']).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ValorantLeaderboard; 