document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch player data
        const players = await window.fetchPlayerData();
        
        // Sort players by rating and get top 5
        const top5Players = players
            .sort((a, b) => (parseFloat(b['Eval Score']) || 0) - (parseFloat(a['Eval Score']) || 0))
            .slice(0, 5);
            
        // Create the top 5 preview
        const top5HTML = createTop5Preview(top5Players);
        document.getElementById('top5-preview-container').innerHTML = top5HTML;
        
        // Create the power rankings table
        const prHTML = createPowerRankingsTable(players);
        document.getElementById('team-leaderboard-container').innerHTML = prHTML;

        // Create the top 50 table
        const top50HTML = createTop50Table(players);
        document.getElementById('player-leaderboard-container').innerHTML = top50HTML;
        
        // Add button click handlers
        setupNavigationHandlers();
        
    } catch (error) {
        console.error('Error loading rankings:', error);
        document.getElementById('team-leaderboard-container').innerHTML = 
            '<p class="error">Error loading rankings. Please try again later.</p>';
    }
});

function createTop5Preview(players) {
    return players.map((player, index) => `
        <div class="preview-row">
            <div class="rank">${index + 1}</div>
            <div class="player-info">
                <div class="player-name">${player.Username || ''}</div>
                <div class="team-name">${player['Team Name'] || ''}</div>
            </div>
            <div class="rating">${(parseFloat(player['Eval Score']) || 0).toFixed(0)}</div>
        </div>
    `).join('');
}

function createTop50Table(players) {
    const sortedPlayers = players
        .sort((a, b) => (parseFloat(b['Eval Score']) || 0) - (parseFloat(a['Eval Score']) || 0))
        .slice(0, 50);

    return `
        <div class="leaderboard">
            <div class="leaderboard-header">
                <div>RANK</div>
                <div>CHANGE</div>
                <div>PLAYER</div>
                <div>POSITION</div>
                <div>TEAM</div>
                <div>RATING</div>
            </div>
            ${sortedPlayers.map((player, index) => {
                const change = parseInt(player.Change) || 0;
                const changeClass = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
                const changeSymbol = change > 0 ? '↑' : change < 0 ? '↓' : '-';
                
                return `
                    <div class="leaderboard-row">
                        <div class="rank">${index + 1}</div>
                        <div class="change ${changeClass}">${changeSymbol}${Math.abs(change) || ''}</div>
                        <div class="player">
                            <div class="player-name">${player.Username || ''}</div>
                            <div class="player-info">${player['Real Name'] || ''}</div>
                        </div>
                        <div class="position">${player.Position || ''}</div>
                        <div class="team">${player['Team Name'] || ''}</div>
                        <div class="rating">${(parseFloat(player['Eval Score']) || 0).toFixed(0)}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function setupNavigationHandlers() {
    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.dataset.view;
            
            // Update active button
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active view
            const powerView = document.getElementById('power-rankings-view');
            const top50View = document.getElementById('top50-view');
            
            if (view === 'power') {
                powerView.classList.add('active');
                top50View.classList.remove('active');
            } else if (view === 'top50') {
                powerView.classList.remove('active');
                top50View.classList.add('active');
            }
        });
    });
}

function createPowerRankingsTable(teams) {
    const sortedTeams = teams
        .sort((a, b) => (parseFloat(b['Eval Score']) || 0) - (parseFloat(a['Eval Score']) || 0));

    return `
        <div class="leaderboard">
            <div class="leaderboard-header">
                <div>RANK</div>
                <div>CHANGE</div>
                <div>TEAM</div>
                <div>RECORD</div>
                <div>POINTS</div>
                <div>RATING</div>
            </div>
            ${sortedTeams.map((team, index) => {
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