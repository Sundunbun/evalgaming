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
        <table class="leaderboard-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Change</th>
                    <th>Player</th>
                    <th>Position</th>
                    <th>Team</th>
                    <th>Location</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                ${players.map((player, index) => `
                    <tr class="player-row" data-username="${player.Username}" style="cursor: pointer;">
                        <td>${index + 1}</td>
                        <td class="change-cell">
                            ${getChangeIndicator(player.Change)}
                            ${Math.abs(player.Change)}
                        </td>
                        <td class="player-info">
                            <span class="username">${player.Username}</span>
                            <span class="real-name">${player['Real Name']}</span>
                        </td>
                        <td>${player.Position}</td>
                        <td>${player['Team Name']}</td>
                        <td>${player.Location}</td>
                        <td>${player['Eval Score'].toFixed(2)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function addProfileClickHandlers() {
    const rows = document.querySelectorAll('.player-row');
    rows.forEach(row => {
        row.addEventListener('click', () => {
            const username = row.dataset.username;
            if (username) {
                const profileUrl = `../../pages/players/valorant/${username.toLowerCase()}.html`;
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