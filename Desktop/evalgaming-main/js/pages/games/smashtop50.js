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
    const sortedPlayers = players
        .sort((a, b) => (parseFloat(b['Eval Score']) || 0) - (parseFloat(a['Eval Score']) || 0))
        .slice(0, 50);

    return `
        <div class="leaderboard">
            <div class="leaderboard-header">
                <div>RANK</div>
                <div>CHANGE</div>
                <div>PLAYER</div>
                <div>FIGHTER</div>
                <div>TEAM</div>
                <div>RATING</div>
            </div>
            ${sortedPlayers.map((player, index) => {
                const change = parseInt(player.Change) || 0;
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
                        <div class="fighter">${player.Fighter || ''}</div>
                        <div class="team">${player['Team Name'] || ''}</div>
                        <div class="rating">${(parseFloat(player['Eval Score']) || 0).toFixed(0)}</div>
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
                const profileUrl = `../../pages/players/smash/${username.toLowerCase()}.html`;
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

function getChangeIndicator(change) {
    if (change > 0) return '<span class="change-up">↑</span>';
    if (change < 0) return '<span class="change-down">↓</span>';
    return '<span class="change-none">-</span>';
} 