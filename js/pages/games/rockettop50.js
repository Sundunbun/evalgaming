document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch player data
        const players = await window.fetchPlayerData();
        
        // Create the top 50 table
        const top50HTML = createTop50Table(players);
        document.getElementById('player-leaderboard-container').innerHTML = top50HTML;
        
        // Add click handlers to rows
        addProfileClickHandlers();
        
    } catch (error) {
        console.error('Error loading top 50:', error);
        document.getElementById('player-leaderboard-container').innerHTML = 
            '<p class="error">Error loading top 50 rankings. Please try again later.</p>';
    }
});

function createTop50Table(players) {
    return `
        <div class="leaderboard">
            <div class="leaderboard-header">
                <div>RANK</div>
                <div>CHANGE</div>
                <div>PLAYER</div>
                <div>TEAM</div>
                <div>RECORD</div>
                <div>POINTS</div>
                <div>RATING</div>
            </div>
            ${players.map((player, index) => {
                const change = parseInt(player.Change) || 0;
                const wins = parseInt(player.Wins) || 0;
                const losses = parseInt(player.Losses) || 0;
                const points = parseInt(player.Points) || 0;
                const rating = parseFloat(player['Eval Score']) || 0;
                
                const changeClass = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
                const changeSymbol = change > 0 ? '↑' : change < 0 ? '↓' : '-';
                
                return `
                    <div class="leaderboard-row player-row" data-username="${player.Username || ''}" style="cursor: pointer;">
                        <div class="rank">${index + 1}</div>
                        <div class="change ${changeClass}">${changeSymbol}${Math.abs(change) || ''}</div>
                        <div class="player">
                            <div class="player-name">${player.Username || ''}</div>
                            <div class="player-info">${player['Real Name'] || ''}</div>
                        </div>
                        <div class="team">${player['Team Name'] || ''}</div>
                        <div class="record">${wins}-${losses}</div>
                        <div class="points">${points}</div>
                        <div class="rating">${rating.toFixed(0)}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function addProfileClickHandlers() {
    const rows = document.querySelectorAll('.player-row');
    rows.forEach(row => {
        row.addEventListener('click', () => {
            const username = row.dataset.username;
            if (username) {
                const profileUrl = `../../pages/players/rocket/${username.toLowerCase()}.html`;
                // Check if profile exists before navigating
                fetch(profileUrl)
                    .then(response => {
                        if (response.ok) {
                            window.location.href = profileUrl;
                        } else {
                            console.log('Profile page not found for:', username);
                            // Optionally show a message to the user
                            alert('Player profile coming soon!');
                        }
                    })
                    .catch(error => {
                        console.error('Error checking profile:', error);
                    });
            }
        });
    });
} 