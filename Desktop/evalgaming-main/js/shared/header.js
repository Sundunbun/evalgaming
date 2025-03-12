document.addEventListener('DOMContentLoaded', function() {
    const basePath = window.getBasePath();
    
    const headerHTML = `
        <div class="header-container">
            <div class="header-content">
                <a href="${basePath}index.html" class="logo">
                    <div class="logo-star-container">
                        <span class="logo-star">★</span>
                    </div>
                    <img src="${basePath}images/logos/eval-white.png" alt="EVAL">
                </a>
                <nav class="main-nav">
                    <div class="nav-item">
                        <a href="${basePath}pages/games/hs_rankings.html" class="nav-link">High School RANKINGS</a>
                    </div>
                    <div class="nav-item">
                        <button class="dropdown-btn">RECRUITING</button>
                        <div class="dropdown-content">
                            <a href="${basePath}pages/signup.html">For Players</a>
                            <a href="${basePath}pages/recruiting/coaches.html">For Coaches</a>
                        </div>
                    </div>
                    <a href="${basePath}pages/about.html" class="nav-link">ABOUT</a>
                </nav>
                <div class="header-right">
                    <div class="search-container">
                        <input type="text" id="global-search" placeholder="Search players...">
                        <div id="search-results" class="search-results"></div>
                    </div>
                    <a href="${basePath}pages/signup.html" class="get-ranked">GET RANKED</a>
                </div>
            </div>
        </div>
    `;
    
    // Get the header element and insert the content
    const headerElement = document.getElementById('header');
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
    }

    // Setup search functionality
    setupGlobalSearch();

    // Setup dropdown functionality
    const dropdowns = document.querySelectorAll('.nav-item');
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-btn');
        const content = dropdown.querySelector('.dropdown-content');

        if (button && content) {
            // Show dropdown on hover
            dropdown.addEventListener('mouseenter', () => {
                content.classList.add('active');
                button.classList.add('active');
            });

            // Hide dropdown when mouse leaves
            dropdown.addEventListener('mouseleave', () => {
                content.classList.remove('active');
                button.classList.remove('active');
            });
        }
    });
});

async function setupGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');
    let players = [];

    try {
        // Fetch players data when setting up search
        players = await window.fetchPlayerData();
    } catch (error) {
        console.error('Error fetching player data:', error);
    }

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const matches = players.filter(player => 
            player.Username.toLowerCase().includes(query) ||
            player['Real Name'].toLowerCase().includes(query)
        ).slice(0, 5); // Limit to top 5 results

        if (matches.length > 0) {
            searchResults.innerHTML = matches.map(player => `
                <div class="search-result-item">
                    <div class="player-info">
                        <span class="username">${player.Username}</span>
                        <span class="real-name">${player['Real Name']}</span>
                    </div>
                    <div class="player-details">
                        <span class="team">${player['Team Name']}</span>
                        <span class="position">${player.Position}</span>
                    </div>
                </div>
            `).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="no-results">No players found</div>';
            searchResults.style.display = 'block';
        }
    });

    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    // Show results when focusing on search
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length >= 2) {
            searchResults.style.display = 'block';
        }
    });
}
