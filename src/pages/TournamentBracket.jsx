import { useState } from "react"

export default function TournamentBracket() {
    const [teams, setTeams] = useState({
        round1: [
            { team1: "SENTINELS", score1: 0, team2: "SENTINELS", score2: 0 },
            { team1: "SENTINELS", score1: 0, team2: "SENTINELS", score2: 0 },
            { team1: "SENTINELS", score1: 0, team2: "SENTINELS", score2: 0 },
            { team1: "SENTINELS", score1: 0, team2: "SENTINELS", score2: 0 },
        ],
        round2: [
            { team1: "SENTINELS", score1: 0, team2: "SENTINELS", score2: 0 },
            { team1: "SENTINELS", score1: 0, team2: "SENTINELS", score2: 0 },
        ],
        round3: [{ team1: "SENTINELS", score1: 0, team2: "SENTINELS", score2: 0 }],
    })

    return (
        <div className="relative min-h-screen w-full bg-[#0a2a1c] bg-opacity-90 p-4 font-sans text-white">
            {/* Background pattern - subtle lines */}
            <div className="absolute inset-0 z-0 opacity-10">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="absolute h-full w-px bg-white" style={{ left: `${i * 5}%` }} />
                ))}
            </div>

            {/* Valorant Logo and Title */}
            <div className="relative z-10 mx-auto mb-8 mt-8 flex flex-col items-center justify-center">
                <div className="mb-2 text-[#4aedc4]">
                    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 0L100 50L50 100L0 50L50 0Z" fill="none" stroke="#4aedc4" strokeWidth="5" />
                        <path
                            d="M30 30L50 50M50 50L70 30M50 50L30 70M50 50L70 70"
                            stroke="#4aedc4"
                            strokeWidth="5"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
                <div className="text-xl font-bold text-[#4aedc4]">VALORANT</div>
                <h1 className="mt-2 text-7xl font-extrabold tracking-wider">BRACKETS</h1>
            </div>

            {/* Tournament Bracket - Complete Redesign with Grid */}
        <div className="relative z-10 mx-auto mt-12 grid grid-cols-3 gap-4 px-4">
        {/* Round 1 - Quarter Finals */}
            <div className="flex flex-col justify-between space-y-4">
                <div className="flex flex-col">
                    <div className="mb-1 text-xs text-[#4aedc4]">MATCH 1</div>
                    <div className="relative">
                        <div className="border border-[#4aedc4]/50">
                            <div className="flex justify-between border-b border-[#4aedc4]/50 bg-black/20 px-4 py-2">
                                <div className="font-bold">{teams.round1[0].team1}</div>
                                <div className="font-bold">{teams.round1[0].score1}</div>
                            </div>
                            <div className="flex justify-between bg-black/20 px-4 py-2">
                                <div className="font-bold">{teams.round1[0].team2}</div>
                                <div className="font-bold">{teams.round1[0].score2}</div>
                            </div>
                        </div>
                        <div className="mt-1 text-xs text-[#4aedc4]/80">
                            23:00 IST, 19<sup>TH</sup> MARCH
                        </div>
                        {/* Connector line */}
                        <div className="absolute right-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-[#4aedc4]"></div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="mb-1 text-xs text-[#4aedc4]">MATCH 1</div>
                    <div className="relative">
                        <div className="border border-[#4aedc4]/50">
                            <div className="flex justify-between border-b border-[#4aedc4]/50 bg-black/20 px-4 py-2">
                                <div className="font-bold">{teams.round1[1].team1}</div>
                                <div className="font-bold">{teams.round1[1].score1}</div>
                            </div>
                            <div className="flex justify-between bg-black/20 px-4 py-2">
                                <div className="font-bold">{teams.round1[1].team2}</div>
                                <div className="font-bold">{teams.round1[1].score2}</div>
                            </div>
                        </div>
                        <div className="mt-1 text-xs text-[#4aedc4]/80">
                            23:00 IST, 19<sup>TH</sup> MARCH
                        </div>
                        {/* Connector line */}
                        <div className="absolute right-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-[#4aedc4]"></div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="mb-1 text-xs text-[#4aedc4]">MATCH 1</div>
                    <div className="relative">
                        <div className="border border-[#4aedc4]/50">
                            <div className="flex justify-between border-b border-[#4aedc4]/50 bg-black/20 px-4 py-2">
                                <div className="font-bold">{teams.round1[2].team1}</div>
                                <div className="font-bold">{teams.round1[2].score1}</div>
                            </div>
                            <div className="flex justify-between bg-black/20 px-4 py-2">
                                <div className="font-bold">{teams.round1[2].team2}</div>
                                <div className="font-bold">{teams.round1[2].score2}</div>
                            </div>
                        </div>
                        <div className="mt-1 text-xs text-[#4aedc4]/80">
                            23:00 IST, 19<sup>TH</sup> MARCH
                        </div>
                        {/* Connector line */}
                        <div className="absolute right-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-[#4aedc4]"></div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="mb-1 text-xs text-[#4aedc4]">MATCH 1</div>
                    <div className="relative">
                        <div className="border border-[#4aedc4]/50">
                            <div className="flex justify-between border-b border-[#4aedc4]/50 bg-black/20 px-4 py-2">
                                <div className="font-bold">{teams.round1[3].team1}</div>
                                <div className="font-bold">{teams.round1[3].score1}</div>
                            </div>
                            <div className="flex justify-between bg-black/20 px-4 py-2">
                                <div className="font-bold">{teams.round1[3].team2}</div>
                                <div className="font-bold">{teams.round1[3].score2}</div>
                            </div>
                        </div>
                        <div className="mt-1 text-xs text-[#4aedc4]/80">
                            23:00 IST, 19<sup>TH</sup> MARCH
                        </div>
                        {/* Connector line */}
                        <div className="absolute right-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-[#4aedc4]"></div>
                    </div>
                </div>
            </div>

            {/* Connector Column 1 */}
            <div className="relative">
                {/* Top pair connector */}
                <div className="absolute left-0 top-[12.5%] h-[25%] w-1/2 border-b-2 border-r-2 border-t-2 border-[#4aedc4]"></div>

                {/* Bottom pair connector */}
                <div className="absolute bottom-[12.5%] left-0 h-[25%] w-1/2 border-b-2 border-r-2 border-t-2 border-[#4aedc4]"></div>

                {/* Round 2 - Semi Finals */}
                <div className="flex h-full flex-col justify-around">
                    <div className="flex flex-col">
                        <div className="mb-1 text-xs text-[#4aedc4]">MATCH 1</div>
                        <div className="relative">
                            <div className="border border-[#4aedc4]/50">
                                <div className="flex justify-between border-b border-[#4aedc4]/50 bg-black/20 px-4 py-2">
                                    <div className="font-bold">{teams.round2[0].team1}</div>
                                    <div className="font-bold">{teams.round2[0].score1}</div>
                                </div>
                                <div className="flex justify-between bg-black/20 px-4 py-2">
                                    <div className="font-bold">{teams.round2[0].team2}</div>
                                    <div className="font-bold">{teams.round2[0].score2}</div>
                                </div>
                            </div>
                            <div className="mt-1 text-xs text-[#4aedc4]/80">
                                23:00 IST, 19<sup>TH</sup> MARCH
                            </div>
                            {/* Connector line */}
                            <div className="absolute right-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-[#4aedc4]"></div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="mb-1 text-xs text-[#4aedc4]">MATCH 1</div>
                        <div className="relative">
                            <div className="border border-[#4aedc4]/50">
                                <div className="flex justify-between border-b border-[#4aedc4]/50 bg-black/20 px-4 py-2">
                                    <div className="font-bold">{teams.round2[1].team1}</div>
                                    <div className="font-bold">{teams.round2[1].score1}</div>
                                </div>
                                <div className="flex justify-between bg-black/20 px-4 py-2">
                                    <div className="font-bold">{teams.round2[1].team2}</div>
                                    <div className="font-bold">{teams.round2[1].score2}</div>
                                </div>
                            </div>
                            <div className="mt-1 text-xs text-[#4aedc4]/80">
                                23:00 IST, 19<sup>TH</sup> MARCH
                            </div>
                            {/* Connector line */}
                            <div className="absolute right-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-[#4aedc4]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Connector Column 2 */}
            <div className="relative">
                {/* Final connector */}
                <div className="absolute left-0 top-[37.5%] h-[25%] w-1/2 border-b-2 border-r-2 border-t-2 border-[#4aedc4]"></div>

                {/* Round 3 - Finals */}
                <div className="flex h-full flex-col justify-center">
                    <div className="flex flex-col">
                        <div className="mb-1 text-xs text-[#4aedc4]">MATCH 1</div>
                        <div className="border border-[#4aedc4]/50">
                            <div className="flex justify-between border-b border-[#4aedc4]/50 bg-black/20 px-4 py-2">
                                <div className="font-bold">{teams.round3[0].team1}</div>
                                <div className="font-bold">{teams.round3[0].score1}</div>
                            </div>
                            <div className="flex justify-between bg-black/20 px-4 py-2">
                                <div className="font-bold">{teams.round3[0].team2}</div>
                                <div className="font-bold">{teams.round3[0].score2}</div>
                            </div>
                        </div>
                        <div className="mt-1 text-xs text-[#4aedc4]/80">
                            23:00 IST, 19<sup>TH</sup> MARCH
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}
