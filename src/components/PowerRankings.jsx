import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const PowerRankings = () => {
  const [powerRankingsData, setPowerRankingsData] = useState([]);
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
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtw0aCa30R3_NMNHHUI11zR9x-VJT6FB3UpRPE4PnQf9XXCAzKvoHsJIIxLxGEle4yv2VMUOPB7P59/pub?output=csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const validData = results.data
              .filter(row => row['Team Name'])
              .sort((a, b) => parseFloat(b['Team Eval Score']) - parseFloat(a['Team Eval Score']));
            setPowerRankingsData(validData);
            setLoading(false);
          },
          error: (error) => {
            setError('Error parsing data');
            setLoading(false);
          }
        });
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-white text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!powerRankingsData.length) return <div className="text-white text-center py-8">No data available</div>;

  return (
    <div className="bg-[#0f0f1a] p-6 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 text-sm border-b border-gray-800">
            <th className="text-left py-4 px-4">RANK</th>
            <th className="text-left py-4 px-4">CHANGE</th>
            <th className="text-left py-4 px-4">TEAM</th>
            <th className="text-center py-4 px-4">RECORD</th>
            <th className="text-center py-4 px-4">WIN %</th>
            <th className="text-center py-4 px-4">COMBAT SCORE</th>
            <th className="text-right py-4 px-4">EVAL SCORE</th>
          </tr>
        </thead>
        <tbody>
          {powerRankingsData.map((team, index) => (
            <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
              <td className="py-4 px-4 text-white">{index + 1}</td>
              <td className="py-4 px-4">
                {getChangeDisplay(team['Chnage'])} {/* Using the Chnage column */}
              </td>
              <td className="py-4 px-4 text-white font-medium">{team['Team Name']}</td>
              <td className="py-4 px-4 text-white text-center">
                {team['Wins']}-{team['Losses']}
              </td>
              <td className="py-4 px-4 text-white text-center">
                {parseFloat(team['Win %']).toFixed(1)}%
              </td>
              <td className="py-4 px-4 text-white text-center">
                {parseFloat(team['Team Combat Score']).toFixed(1)}
              </td>
              <td className="py-4 px-4 text-white text-right font-medium">
                {parseFloat(team['Team Eval Score']).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PowerRankings; 