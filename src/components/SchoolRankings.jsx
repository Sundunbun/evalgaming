import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const SchoolRankings = () => {
  const [schoolRankingsData, setSchoolRankingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtw0aCa30R3_NMNHHUI11zR9x-VJT6FB3UpRPE4PnQf9XXCAzKvoHsJIIxLxGEle4yv2VMUOPB7P59/pub?output=csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const validData = results.data
              .filter(row => row['Team'])
              .sort((a, b) => parseFloat(a['Rank']) - parseFloat(b['Rank']));
            setSchoolRankingsData(validData);
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
  if (!schoolRankingsData.length) return <div className="text-white text-center py-8">No data available</div>;

  return (
    <div className="bg-[#0f0f1a] p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">School Rankings</h2>
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 text-sm border-b border-gray-800">
            <th className="text-left py-4 px-4">RANK</th>
            <th className="text-left py-4 px-4">TEAM NAME</th>
            <th className="text-center py-4 px-4">EVAL SCORE</th>
            <th className="text-center py-4 px-4">RECORD</th>
          </tr>
        </thead>
        <tbody>
          {schoolRankingsData.map((team, index) => (
            <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
              <td className="py-4 px-4 text-white">{team['Rank']}</td>
              <td className="py-4 px-4 text-white font-medium">{team['Team']}</td>
              <td className="py-4 px-4 text-white text-center">
                {parseFloat(team['EVAL']).toFixed(2)}
              </td>
              <td className="py-4 px-4 text-white text-center">
                {team['Wins']}-{team['Losses']}-{team['Ties']}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolRankings; 