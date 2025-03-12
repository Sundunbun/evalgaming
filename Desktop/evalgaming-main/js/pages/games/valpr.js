document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch team data
        const teams = await window.fetchTeamData();
        
        if (!teams || teams.length === 0) {
            throw new Error('No teams data received');
        }
        
        // Sort teams by Eval Score first
        const sortedTeams = teams.sort((a, b) => {
            const aEvalScore = parseFloat(a['Eval Score']) || 0;
            const bEvalScore = parseFloat(b['Eval Score']) || 0;
            return bEvalScore - aEvalScore;
        });
        
        // Create the power rankings table
        const prHTML = createPowerRankingsTable(sortedTeams);
        document.getElementById('team-leaderboard-container').innerHTML = prHTML;
        
    } catch (error) {
        console.error('Error loading power rankings:', error);
        document.getElementById('team-leaderboard-container').innerHTML = 
            '<p class="error">Error loading power rankings. Please try again later.</p>';
    }
});

function createPowerRankingsTable(teams) {
    if (!teams || teams.length === 0) {
        return '<div class="error">No team data available</div>';
    }

    return `
        <div class="leaderboard">
            <div class="leaderboard-header">
                <div class="rank">RANK</div>
                <div class="change">CHANGE</div>
                <div class="team">TEAM</div>
                <div class="record">RECORD</div>
                <div class="points">POINTS</div>
                <div class="eval-composite">EVAL<br>COMPOSITE</div>
            </div>
            ${teams.map((team, index) => {
                const teamName = team['Team Name'] || '';
                const location = team.Location || '';
                const wins = parseInt(team.Wins) || 0;
                const losses = parseInt(team.Losses) || 0;
                const points = parseInt(team.Points) || 0;
                const evalScore = parseFloat(team['Eval Score']) || 0;
                const change = parseInt(team.Change) || 0;
                
                const changeClass = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
                const changeSymbol = change > 0 ? '↑' : change < 0 ? '↓' : '-';
                
                return `
                    <div class="leaderboard-row">
                        <div class="rank">${index + 1}</div>
                        <div class="change ${changeClass}">${changeSymbol}${Math.abs(change) || ''}</div>
                        <div class="team">
                            <div class="team-name">${teamName}</div>
                            <div class="team-location">${location}</div>
                        </div>
                        <div class="record">${wins}-${losses}</div>
                        <div class="points">${points}</div>
                        <div class="eval-composite">${evalScore.toFixed(2)}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
} 