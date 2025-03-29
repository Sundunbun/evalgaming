document.addEventListener('DOMContentLoaded', async () => {
    // Initialize views
    const powerRankingsView = document.getElementById('power-rankings-view');
    const top50View = document.getElementById('top50-view');
    
    // Load initial data
    try {
        // Load power rankings data
        const teams = await window.fetchTeamData();
        const prHTML = createPowerRankingsTable(teams);
        document.getElementById('team-leaderboard-container').innerHTML = prHTML;
        
        // Load top 50 data
        const players = await window.fetchPlayerData();
        const top50HTML = createTop50Table(players);
        document.getElementById('player-leaderboard-container').innerHTML = top50HTML;
    } catch (error) {
        console.error('Error loading data:', error);
    }

    // Handle view switching
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.getAttribute('data-view');
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active view
            if (view === 'power') {
                powerRankingsView.classList.add('active');
                top50View.classList.remove('active');
            } else if (view === 'top50') {
                powerRankingsView.classList.remove('active');
                top50View.classList.add('active');
            }
        });
    });
});

function createPowerRankingsTable(teams) {
    if (!teams || teams.length === 0) {
        return '<div class="error">No team data available</div>';
    }

    return `
        <table class="leaderboard-table">
            <thead>
                <tr>
                    <th>RANK</th>
                    <th>CHANGE</th>
                    <th>TEAM</th>
                    <th>RECORD</th>
                    <th>POINTS</th>
                    <th>EVAL COMPOSITE</th>
                </tr>
            </thead>
            <tbody>
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
                        <tr>
                            <td class="rank">${index + 1}</td>
                            <td class="change ${changeClass}">${changeSymbol}${Math.abs(change)}</td>
                            <td class="team-info">
                                <div class="team-name">${teamName}</div>
                                <div class="team-location">${location}</div>
                            </td>
                            <td class="record">${wins}-${losses}</td>
                            <td class="points">${points}</td>
                            <td class="eval-composite">${evalScore.toFixed(2)}</td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

function createTop50Table(players) {
    if (!players || players.length === 0) {
        return '<div class="error">No player data available</div>';
    }

    // Sort players by Eval Score
    const sortedPlayers = [...players].sort((a, b) => {
        return parseFloat(b['Eval Score']) - parseFloat(a['Eval Score']);
    });

    return `
        <table class="leaderboard-table">
            <thead>
                <tr>
                    <th>RANK</th>
                    <th>CHANGE</th>
                    <th>PLAYER</th>
                    <th>TEAM</th>
                    <th>GROUP</th>
                    <th>EVAL COMPOSITE</th>
                </tr>
            </thead>
            <tbody>
                ${sortedPlayers.map((player, index) => {
                    const change = parseInt(player.Change) || 0;
                    const rating = parseFloat(player['Eval Score']) || 0;
                    
                    const changeClass = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
                    const changeSymbol = change > 0 ? '↑' : change < 0 ? '↓' : '-';
                    
                    return `
                        <tr>
                            <td class="rank">${index + 1}</td>
                            <td class="change ${changeClass}">${changeSymbol}${Math.abs(change)}</td>
                            <td class="player-info">
                                <div class="player-name">${player.Username || ''}</div>
                                <div class="player-realname">${player['Real Name'] || ''}</div>
                            </td>
                            <td class="position">${player.Position || ''}</td>
                            <td class="team">${player['Team Name'] || ''}</td>
                            <td class="eval-composite">${rating.toFixed(2)}</td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}