import { useState } from "react"

export default function TournamentBracket() {
  const [teams, setTeams] = useState({
    round1: [
      { team1: "SENTINELS", score1: 13, team2: "OPTIC", score2: 9 },
      { team1: "FNATIC", score1: 13, team2: "LOUD", score2: 11 },
      { team1: "DRX", score1: 13, team2: "NAVI", score2: 7 },
      { team1: "G2", score1: 13, team2: "T1", score2: 10 },
    ],
    round2: [
      { team1: "SENTINELS", score1: 13, team2: "FNATIC", score2: 11 },
      { team1: "DRX", score1: 13, team2: "G2", score2: 8 },
    ],
    round3: [{ team1: "SENTINELS", score1: 13, team2: "DRX", score2: 10 }],
  })

  const getMatchCardStyle = (round, index) => {
    if (round === 'round3') {
      return 'bg-gradient-to-r from-yellow-500 to-yellow-700 text-white scale-110';
    }
    if (round === 'round2') {
      return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white scale-105';
    }
    return 'bg-white';
  };

  const getMatchCardSize = (round) => {
    if (round === 'round3') return 'p-6';
    if (round === 'round2') return 'p-5';
    return 'p-4';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Tournament Bracket
        </h1>
        
        <div className="grid grid-cols-3 gap-12">
          {/* Round 1 - Quarter Finals */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-8 text-center text-blue-400 border-b-2 border-blue-400 pb-2">
              Quarter Finals
            </h2>

            <div className="flex flex-col space-y-8">
              {teams.round1.map((match, index) => (
                <div key={index} className="flex flex-col">
                  <div className="mb-2 text-sm text-blue-300">Match {index + 1}</div>
                  <div className={`border border-gray-700 rounded-lg overflow-hidden shadow-lg ${getMatchCardStyle('round1', index)} ${getMatchCardSize('round1')}`}>
                    <div className="flex justify-between border-b border-gray-700 bg-gray-800 px-4 py-3">
                      <div className="font-bold text-lg">{match.team1}</div>
                      <div className="font-bold text-lg">{match.score1}</div>
                    </div>
                    <div className="flex justify-between bg-gray-800 px-4 py-3">
                      <div className="font-bold text-lg">{match.team2}</div>
                      <div className="font-bold text-lg">{match.score2}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    23:00 IST, 19<sup>TH</sup> MARCH
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Round 2 - Semi Finals */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-8 text-center text-purple-400 border-b-2 border-purple-400 pb-2">
              Semi Finals
            </h2>

            <div className="flex flex-col space-y-8">
              {teams.round2.map((match, index) => (
                <div key={index} className="flex flex-col">
                  <div className="mb-2 text-sm text-purple-300">Match {index + 1}</div>
                  <div className={`border border-gray-700 rounded-lg overflow-hidden shadow-lg ${getMatchCardStyle('round2', index)} ${getMatchCardSize('round2')}`}>
                    <div className="flex justify-between border-b border-gray-700 bg-gray-800 px-4 py-3">
                      <div className="font-bold text-xl">{match.team1}</div>
                      <div className="font-bold text-xl">{match.score1}</div>
                    </div>
                    <div className="flex justify-between bg-gray-800 px-4 py-3">
                      <div className="font-bold text-xl">{match.team2}</div>
                      <div className="font-bold text-xl">{match.score2}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    23:00 IST, 20<sup>TH</sup> MARCH
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Round 3 - Finals */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-8 text-center text-yellow-400 border-b-2 border-yellow-400 pb-2">
              Finals
            </h2>

            <div className="flex flex-col">
              <div className="mb-2 text-sm text-yellow-300">Grand Final</div>
              <div className={`border border-gray-700 rounded-lg overflow-hidden shadow-lg ${getMatchCardStyle('round3')} ${getMatchCardSize('round3')}`}>
                <div className="flex justify-between border-b border-gray-700 bg-gray-800 px-4 py-4">
                  <div className="font-bold text-2xl">{teams.round3[0].team1}</div>
                  <div className="font-bold text-2xl">{teams.round3[0].score1}</div>
                </div>
                <div className="flex justify-between bg-gray-800 px-4 py-4">
                  <div className="font-bold text-2xl">{teams.round3[0].team2}</div>
                  <div className="font-bold text-2xl">{teams.round3[0].score2}</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                23:00 IST, 21<sup>ST</sup> MARCH
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
