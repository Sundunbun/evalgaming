document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch team data
        const teams = await window.fetchTeamData();
        console.log('Fetched teams data:', teams);
        
        if (!teams || teams.length === 0) {
            throw new Error('No teams data received');
        }
        
        // Sort teams by Eval Score
        const sortedTeams = teams.sort((a, b) => {
            const aScore = parseFloat(a['Eval Score']) || 0;
            const bScore = parseFloat(b['Eval Score']) || 0;
            return bScore - aScore;
        });
        
        // Create the power rankings table
        const prHTML = createPowerRankingsTable(sortedTeams);
        const container = document.getElementById('team-leaderboard-container');
        if (!container) {
            throw new Error('Container element not found');
        }
        container.innerHTML = prHTML;
        
    } catch (error) {
        console.error('Error loading power rankings:', error);
        const container = document.getElementById('team-leaderboard-container');
        if (container) {
            container.innerHTML = '<p class="error">Error loading power rankings. Please try again later.</p>';
        }
    }
});

function createPowerRankingsTable(teams) {
    return `
        <table class="leaderboard-table power-rankings">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Change</th>
                    <th>Name</th>
                    <th>Fighter</th>
                    <th>Team</th>
                    <th>Location</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                ${teams.map((team, index) => {
                    const username = team.Username || '';
                    const playerName = team['Player Name'] || '';
                    const fighter = team.Fighter || '';
                    const teamName = team['Team Name'] || '';
                    const location = team.Location || '';
                    const evalScore = parseFloat(team['Eval Score']) || 0;
                    const change = parseInt(team.Change) || 0;
                    
                    return `
                        <tr>
                            <td>${index + 1}</td>
                            <td class="change-cell">
                                ${getChangeIndicator(change)}
                                ${Math.abs(change)}
                            </td>
                            <td class="player-info">
                                <div class="player-name">${playerName}</div>
                                <div class="player-username">@${username}</div>
                            </td>
                            <td>${fighter}</td>
                            <td>${teamName}</td>
                            <td>${location}</td>
                            <td><strong>${evalScore.toFixed(2)}</strong></td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

function getChangeIndicator(change) {
    if (change > 0) return '<span class="change-up">↑</span>';
    if (change < 0) return '<span class="change-down">↓</span>';
    return '<span class="change-none">-</span>';
} 