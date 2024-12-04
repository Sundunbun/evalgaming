// Global container references
let teamContainer;
let playerContainer;
let prPreviewContainer;
let top50PreviewContainer;

document.addEventListener('DOMContentLoaded', async () => {
    // Setup view switching
    const navButtons = document.querySelectorAll('.nav-button');
    const powerRankingsView = document.getElementById('power-rankings-view');
    const top50View = document.getElementById('top50-view');
    
    // Initialize container references
    teamContainer = document.getElementById('team-leaderboard-container');
    playerContainer = document.getElementById('player-leaderboard-container');
    prPreviewContainer = document.getElementById('pr-preview-container');
    top50PreviewContainer = document.getElementById('top50-preview-container');

    if (!powerRankingsView || !top50View || !teamContainer || !playerContainer) {
        console.error('Required view elements not found');
        return;
    }

    // Initial view setup - show power rankings by default
    powerRankingsView.classList.add('active');
    top50View.classList.remove('active');
    
    // Show correct preview based on active view
    updatePreviewVisibility('power');

    // Load both power rankings and top 50 data initially
    await Promise.all([
        loadPowerRankings(),
        loadTop50()
    ]);

    // Handle view switching
    navButtons.forEach(button => {
        button.addEventListener('click', () => switchView(button.dataset.view));
    });

    // Handle preview interactions
    document.addEventListener('click', (e) => {
        // Handle preview row clicks
        const previewRow = e.target.closest('.preview-row');
        if (previewRow) {
            const panel = previewRow.closest('.preview-panel');
            const viewId = panel.id === 'pr-preview' ? 'power' : 'top50';
            switchView(viewId);
            return;
        }

        // Handle view all button clicks
        const viewAllButton = e.target.closest('.view-all-button');
        if (viewAllButton) {
            const viewId = viewAllButton.dataset.view;
            switchView(viewId);
            return;
        }
    });
});

function switchView(viewId) {
    const navButtons = document.querySelectorAll('.nav-button');
    const powerRankingsView = document.getElementById('power-rankings-view');
    const top50View = document.getElementById('top50-view');

    // Update active button
    navButtons.forEach(btn => btn.classList.remove('active'));
    const targetButton = Array.from(navButtons).find(btn => btn.dataset.view === viewId);
    if (targetButton) {
        targetButton.classList.add('active');
    }

    // Update active view
    if (viewId === 'power') {
        powerRankingsView.classList.add('active');
        top50View.classList.remove('active');
    } else if (viewId === 'top50') {
        powerRankingsView.classList.remove('active');
        top50View.classList.add('active');
    }

    // Update preview visibility
    updatePreviewVisibility(viewId);
}

function updatePreviewVisibility(activeView) {
    const prPanel = document.getElementById('pr-preview');
    const top50Panel = document.getElementById('top50-preview');
    
    if (activeView === 'power') {
        // In Power Rankings view, show only Top 50 preview
        if (prPanel) {
            prPanel.style.display = 'none';
        }
        if (top50Panel) {
            top50Panel.style.display = 'block';
        }
    } else {
        // In Top 50 view, show only Power Rankings preview
        if (prPanel) {
            prPanel.style.display = 'block';
        }
        if (top50Panel) {
            top50Panel.style.display = 'none';
        }
    }
}

async function loadPowerRankings() {
    try {
        // Show loading states
        teamContainer.innerHTML = '<div class="loading">Loading Power Rankings...</div>';
        if (prPreviewContainer) {
            prPreviewContainer.innerHTML = '<div class="loading">Loading...</div>';
        }

        // Fetch team data
        const teams = await window.fetchTeamData();
        
        if (!teams || teams.length === 0) {
            throw new Error('No teams data received');
        }
        
        // Sort teams by Eval Score
        const sortedTeams = teams.sort((a, b) => {
            const aScore = parseFloat(a['Eval Score']) || 0;
            const bScore = parseFloat(b['Eval Score']) || 0;
            return bScore - aScore;
        });
        
        // Update main leaderboard
        const rankingsHTML = createPowerRankingsTable(sortedTeams);
        teamContainer.innerHTML = rankingsHTML;

        // Update preview
        if (prPreviewContainer) {
            const previewHTML = createPRPreview(sortedTeams.slice(0, 5));
            prPreviewContainer.innerHTML = previewHTML;
        }
        
    } catch (error) {
        console.error('Error loading power rankings:', error);
        teamContainer.innerHTML = '<p class="error">Error loading power rankings. Please try again later.</p>';
        if (prPreviewContainer) {
            prPreviewContainer.innerHTML = '<p class="error">Error loading preview.</p>';
        }
    }
}

async function loadTop50() {
    try {
        // Show loading states
        playerContainer.innerHTML = '<div class="loading">Loading Top 50...</div>';
        if (top50PreviewContainer) {
            top50PreviewContainer.innerHTML = '<div class="loading">Loading...</div>';
        }

        // Fetch player data
        const players = await window.fetchPlayerData();
        
        if (!players || players.length === 0) {
            throw new Error('No players data received');
        }
        
        // Sort players by Eval Score
        const sortedPlayers = players.sort((a, b) => {
            const aScore = parseFloat(a['Eval Score']) || 0;
            const bScore = parseFloat(b['Eval Score']) || 0;
            return bScore - aScore;
        });
        
        // Update main leaderboard
        const rankingsHTML = createTop50Table(sortedPlayers);
        playerContainer.innerHTML = rankingsHTML;

        // Update preview
        if (top50PreviewContainer) {
            const previewHTML = createTop50Preview(sortedPlayers.slice(0, 5));
            top50PreviewContainer.innerHTML = previewHTML;
        }
        
    } catch (error) {
        console.error('Error loading top 50:', error);
        playerContainer.innerHTML = '<p class="error">Error loading top 50 rankings. Please try again later.</p>';
        if (top50PreviewContainer) {
            top50PreviewContainer.innerHTML = '<p class="error">Error loading preview.</p>';
        }
    }
}

function createPowerRankingsTable(teams) {
    return `
        <table class="leaderboard-table power-rankings">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Change</th>
                    <th>Team</th>
                    <th>Location</th>
                    <th>Record</th>
                    <th>Points</th>
                    <th>Rating</th>
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
                    
                    const changeClass = change > 0 ? 'change-up' : change < 0 ? 'change-down' : 'change-none';
                    const changeSymbol = change > 0 ? '↑' : change < 0 ? '↓' : '-';
                    
                    return `
                        <tr>
                            <td>${index + 1}</td>
                            <td class="change-cell ${changeClass}">${changeSymbol} ${Math.abs(change)}</td>
                            <td class="team-info">
                                <div class="team-name">${teamName}</div>
                                <div class="team-location">${location}</div>
                            </td>
                            <td>${location}</td>
                            <td><strong>${wins}-${losses}</strong></td>
                            <td><strong>${points}</strong></td>
                            <td><strong>${evalScore.toFixed(2)}</strong></td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

function createTop50Table(players) {
    return `
        <table class="leaderboard-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Change</th>
                    <th>Player</th>
                    <th>Fighter</th>
                    <th>Team</th>
                    <th>Location</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                ${players.map((player, index) => {
                    const username = player.Username || '';
                    const realName = player['Real Name'] || '';
                    const fighter = player.Fighter || '';
                    const teamName = player['Team Name'] || '';
                    const location = player.Location || '';
                    const evalScore = parseFloat(player['Eval Score']) || 0;
                    const change = parseInt(player.Change) || 0;
                    
                    const changeClass = change > 0 ? 'change-up' : change < 0 ? 'change-down' : 'change-none';
                    const changeSymbol = change > 0 ? '↑' : change < 0 ? '↓' : '-';
                    
                    return `
                        <tr>
                            <td>${index + 1}</td>
                            <td class="change-cell ${changeClass}">${changeSymbol} ${Math.abs(change)}</td>
                            <td class="player-info">
                                <div class="username">${username}</div>
                                <div class="real-name">${realName}</div>
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

function createPRPreview(teams) {
    return `
        <div class="preview-content">
            ${teams.map((team, index) => {
                const teamName = team['Team Name'] || '';
                const evalScore = parseFloat(team['Eval Score']) || 0;
                
                return `
                    <div class="preview-row" role="button" tabindex="0">
                        <div class="preview-rank">${index + 1}</div>
                        <div class="preview-name">${teamName}</div>
                        <div class="preview-rating">${evalScore.toFixed(0)}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function createTop50Preview(players) {
    return `
        <div class="preview-content">
            ${players.map((player, index) => {
                const username = player.Username || '';
                const evalScore = parseFloat(player['Eval Score']) || 0;
                
                return `
                    <div class="preview-row" role="button" tabindex="0">
                        <div class="preview-rank">${index + 1}</div>
                        <div class="preview-name">${username}</div>
                        <div class="preview-rating">${evalScore.toFixed(0)}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}