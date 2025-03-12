document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch team data
        const teams = await window.fetchTeamData();
        
        // Create the power rankings table
        const prHTML = createPowerRankingsTable(teams);
        document.getElementById('team-leaderboard-container').innerHTML = prHTML;
        
    } catch (error) {
        console.error('Error loading power rankings:', error);
        document.getElementById('team-leaderboard-container').innerHTML = 
            '<p class="error">Error loading power rankings. Please try again later.</p>';
    }
});

function createPowerRankingsTable(teams) {
    return `
        <div class="leaderboard">
            <div class="leaderboard-header">
                <div class="rank">Rank</div>
                <div class="change">Change</div>
                <div class="team">Team</div>
                <div class="record">Record</div>
                <div class="points">Points</div>
                <div class="rating">Rating</div>
            </div>
            ${teams.map((team, index) => {
                const change = parseInt(team.Change) || 0;
                const wins = parseInt(team.Wins) || 0;
                const losses = parseInt(team.Losses) || 0;
                const points = parseInt(team.Points) || 0;
                const rating = parseFloat(team['Eval Score']) || 0;
                
                const changeClass = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
                const changeSymbol = change > 0 ? '↑' : change < 0 ? '↓' : '-';
                
                return `
                    <div class="leaderboard-row">
                        <div class="rank">${index + 1}</div>
                        <div class="change ${changeClass}">${changeSymbol}${Math.abs(change) || ''}</div>
                        <div class="team">
                            <div class="team-name">${team['Team Name'] || ''}</div>
                            <div class="team-location">${team.Location || ''}</div>
                        </div>
                        <div class="record">${wins}-${losses}</div>
                        <div class="points">${points}</div>
                        <div class="rating">${rating.toFixed(0)}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
} 