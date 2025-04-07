import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gseLogo from '../assets/GSE_LOGO.png';
import pwrRankings from '../assets/pwrrankings.png';
import top50 from '../assets/top50.png';
import allPlayers from '../assets/allplayers.png';
import Papa from 'papaparse';

export default function HighSchoolRankings() {
  const [teamRankingsData, setTeamRankingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch team data from Google Sheet
        const teamResponse = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQEjJcIIvqS_BzkOYEzQvWh0qCG7_jL00DyjC9EjOxc9Iy4idGMFmvZhrLaoC5RlwUpUmj4N4J_2qzk/pub?gid=861121401&single=true&output=csv');
        const teamText = await teamResponse.text();

        // Parse CSV file
        const teamResults = await new Promise((resolve) => {
          Papa.parse(teamText, {
            header: true,
            complete: resolve
          });
        });

        // Process team data
        const validTeamData = teamResults.data
          .filter(row => row['Team'])
          .sort((a, b) => parseFloat(b['EVAL']) - parseFloat(a['EVAL']));

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

  // Get top 5 teams from the fetched data
  const topSchools = teamRankingsData.slice(0, 5).map((team, index) => ({
    rank: index + 1,
    name: team['Team'],
    record: `${team['Wins']}-${team['Losses']}-${team['Ties']}`
  }));

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
            <Link 
              to="/rankings/valorant" 
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
            >
              Valorant Rankings
            </Link>
          </div>

          {/* New Jersey Rankings */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-3">New Jersey Rankings</h3>
            {loading ? (
              <div className="text-center py-4">Loading rankings...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : (
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
            )}
          </div>
        </div>

        {/* RIGHT SECTION - Game Rankings */}
        <div className="bg-black p-6 rounded-2xl shadow-2xl border border-purple-900/30">
          <h2 className="text-2xl font-bold text-white mb-6">Game Rankings</h2>

          {/* Top 50 Button */}
          <Link 
            to="/rankings/valorant?view=top50" 
            className="block bg-[#1a1a1a] hover:bg-[#222] p-5 rounded-xl border border-[#333] hover:border-purple-500 transition-all duration-300 mb-4"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src={top50} alt="Top 50" className="h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Top 50 Players</h3>
            <p className="text-gray-400 text-sm">
              View the top 50 players ranked by EVAL score.
            </p>
          </Link>

          {/* Team Rankings Button */}
          <Link 
            to="/rankings/valorant?view=teams" 
            className="block bg-[#1a1a1a] hover:bg-[#222] p-5 rounded-xl border border-[#333] hover:border-purple-500 transition-all duration-300 mb-4"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src={pwrRankings} alt="Power Rankings" className="h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Team Rankings</h3>
            <p className="text-gray-400 text-sm">
              View team rankings and match records.
            </p>
          </Link>

          {/* Player Rankings Button */}
          <Link 
            to="/rankings/valorant?view=players" 
            className="block bg-[#1a1a1a] hover:bg-[#222] p-5 rounded-xl border border-[#333] hover:border-purple-500 transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src={allPlayers} alt="All Players" className="h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">All Players</h3>
            <p className="text-gray-400 text-sm">
              View complete player rankings and statistics.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
