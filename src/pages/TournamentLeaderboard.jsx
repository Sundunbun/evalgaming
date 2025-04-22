import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from "lucide-react"


export default function TournamentLeaderboard() {

  useEffect(() => {
    document.title = "EVAL | Tournament Leaderboard";
  }, []);

  const [expanded, setExpanded] = useState(false)

  // Top 5 players with highlighted styling
  const topPlayers = [
    { rank: 1, name: "DRALH", rating: 99 },
    { rank: 2, name: "ZEN", rating: 94 },
    { rank: 3, name: "VATIRA", rating: 94 },
    { rank: 4, name: "ATOW", rating: 94 },
    { rank: 5, name: "FIRSTKILLER", rating: 93 },
  ]

  // Players 6-50 in the grid format
  const remainingPlayers = [
    { rank: 6, name: "NWPO", rating: 93 },
    { rank: 7, name: "LOSTT", rating: 92 },
    { rank: 8, name: "YANXNZ", rating: 92 },
    { rank: 9, name: "RVRB", rating: 92 },
    { rank: 10, name: "ATOMIC", rating: 92 },
    { rank: 11, name: "TREX1", rating: 91 },
    { rank: 12, name: "DANIEL", rating: 91 },
    { rank: 13, name: "LJ", rating: 91 },
    { rank: 14, name: "BEASTMODE", rating: 91 },
    { rank: 15, name: "NASS", rating: 91 },
    { rank: 16, name: "ATOMIK", rating: 91 },
    { rank: 17, name: "EXOTIIK", rating: 90 },
    { rank: 18, name: "MONKEY MOON", rating: 90 },
    { rank: 19, name: "KNEESRZ", rating: 90 },
    { rank: 20, name: "CHRONIC", rating: 90 },
    { rank: 21, name: "APPARENTLYACK", rating: 90 },
    { rank: 22, name: "ARCHIE", rating: 90 },
    { rank: 23, name: "DRUFINHO", rating: 90 },
    { rank: 24, name: "ITACHI", rating: 89 },
    { rank: 25, name: "SYPICAL", rating: 89 },
    { rank: 26, name: "JOVO", rating: 89 },
    { rank: 27, name: "GALY", rating: 88 },
    { rank: 28, name: "JOREZ", rating: 88 },
    { rank: 29, name: "OALY", rating: 88 },
    { rank: 30, name: "KRYPTO", rating: 88 },
    { rank: 31, name: "SWIFTZ", rating: 88 },
    { rank: 32, name: "BALZ", rating: 88 },
    { rank: 33, name: "FROSTY", rating: 88 },
    { rank: 34, name: "JUICY", rating: 87 },
    { rank: 35, name: "RISE", rating: 87 },
    { rank: 36, name: "ACCRO", rating: 87 },
    { rank: 37, name: "SEIKOO", rating: 87 },
    { rank: 38, name: "REZEARS", rating: 87 },
    { rank: 39, name: "MOTTA", rating: 87 },
    { rank: 40, name: "REVEZY", rating: 87 },
    { rank: 41, name: "CHEESE", rating: 87 },
    { rank: 42, name: "CRR", rating: 87 },
    { rank: 43, name: "MAJICBEAR", rating: 87 },
    { rank: 44, name: "YUMI", rating: 86 },
    { rank: 45, name: "RETALS", rating: 86 },
    { rank: 46, name: "LIISP", rating: 86 },
    { rank: 47, name: "INNOVATOR", rating: 86 },
    { rank: 48, name: "FROSTY", rating: 86 },
    { rank: 49, name: "FINCHIP", rating: 85 },
    { rank: 50, name: "BANANAHEAD", rating: 85 },
  ]

  // Function to determine background color based on rank
  const getBackgroundColor = (rank) => {
    if (rank === 1) return "from-cyan-600 to-cyan-800"
    if (rank <= 4) return "from-yellow-500 to-yellow-700"
    if (rank === 5) return "from-red-600 to-red-800"
    return "from-blue-700 to-blue-900"
  }

  // Function to determine text color based on rank
  const getTextColor = (rank) => {
    if (rank === 1) return "text-cyan-300"
    if (rank <= 4) return "text-yellow-300"
    if (rank === 5) return "text-red-300"
    return "text-white"
  }

  return (
    <div className="bg-gray-900 p-4 md:p-6 max-w-3xl mx-auto rounded-lg">
      <div className="mb-4">


        <h1 className="text-white text-center text-2xl md:text-3xl font-bold tracking-wider mb-1">
          TOURNAMENT TOP 50 PLAYERS LIST
        </h1>
        <p className="text-center text-gray-400 text-sm mb-4">RATING</p>

        <div className="grid grid-cols-3 text-xs text-gray-400 mb-1 px-2">
          <div>RANKING</div>
          <div className="text-center">PLAYER</div>
          <div className="text-right">OVERALL</div>
        </div>
      </div>

      {/* Top 5 Players */}
      <div className="space-y-1 mb-4">
        {topPlayers.map((player) => (
          <div
            key={player.rank}
            className={`grid grid-cols-3 items-center p-2 bg-gradient-to-r ${getBackgroundColor(player.rank)} rounded`}
          >
            <div className="text-white font-bold text-xl">{player.rank}</div>
            <div className={`text-center font-bold text-xl ${getTextColor(player.rank)}`}>{player.name}</div>
            <div className="text-right text-white font-bold text-xl">{player.rating}</div>
          </div>
        ))}
      </div>

      {/* Toggle button for remaining players */}
      <button
        className="flex items-center justify-center w-full text-gray-300 text-sm mb-2"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <>
            Show Less <ChevronUp className="ml-1 h-4 w-4" />
          </>
        ) : (
          <>
            Show More <ChevronDown className="ml-1 h-4 w-4" />
          </>
        )}
      </button>

      {/* Remaining Players Grid */}
      {expanded && (
        <div className="grid grid-cols-5 gap-1 text-xs">
          {remainingPlayers.map((player) => (
            <div key={player.rank} className="bg-gradient-to-r from-blue-900 to-blue-950 p-1 rounded">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{player.rank}</span>
                <span className="text-white font-medium">{player.rating}</span>
              </div>
              <div className="text-center text-gray-300 truncate font-medium">{player.name}</div>
            </div>
          ))}
        </div>
      )}

      <div className="text-right text-xs text-gray-500 mt-2">EVAL</div>
    </div>
  )
}
