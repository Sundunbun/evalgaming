// Shared utility functions

/**
 * Determine the base path for relative file imports based on the current location.
 * This helps in resolving paths dynamically for different directories.
 * 
 * @returns {string} The base path as a string.
 */
function getBasePath() {
    return window.location.pathname.includes('/pages/') ? '../../' : './';
}

/**
 * Fetches and processes player data from Google Sheets
 * @returns {Promise<Array>} Array of player objects with properties:
 * - Change (number)
 * - Real Name (string)
 * - Username (string)
 * - Position (string)
 * - Eval Score (number)
 * - Team Name (string)
 * - Location (string)
 */
async function fetchPlayerData() {
    // Use different sheet IDs based on the current page
    const path = window.location.pathname;
    let sheetId;
    
    if (path.includes('valpr')) {
        sheetId = '2PACX-1vTJi2B3uExkcdLHFKAwFOMOcq4xi-VjmQiazZyUAX00pN9ReNDkMsf7K9QlDBTmooAkIHN3sf8jdi90';
    } else if (path.includes('valorant')) {
        sheetId = '2PACX-1vRCc1ZFhoy74g3PypA0Ot-nGcCkyOwlI1DULlAd9cAFXCNY7hyBQ2TFBcIZwbtNpORL40ltDecbY7Xd';
    } else if (path.includes('smash')) {
        sheetId = '2PACX-1vTFkdRkr7K4S2uFqZ6szZmXOUhrKnT-Xi8dNlmwaSA4cQH1tjkFFgJXQytkvOHkdiZ_gL5D6u0T1KFe';
    }
    
    // If no specific page type is matched, use the Valorant sheet as default for global search
    if (!sheetId) {
        sheetId = '2PACX-1vRCc1ZFhoy74g3PypA0Ot-nGcCkyOwlI1DULlAd9cAFXCNY7hyBQ2TFBcIZwbtNpORL40ltDecbY7Xd';
    }
    
    return fetchGoogleSheetData(sheetId);
}

/**
 * Sorts players by a specific field
 * @param {Array} players Array of player objects
 * @param {string} field Field to sort by (e.g., 'Eval Score', 'Username')
 * @param {boolean} ascending True for ascending order, false for descending
 * @returns {Array} Sorted array of players
 */
function sortPlayers(players, field, ascending = true) {
    return [...players].sort((a, b) => {
        const modifier = ascending ? 1 : -1;
        if (typeof a[field] === 'number') {
            return (a[field] - b[field]) * modifier;
        }
        return a[field].localeCompare(b[field]) * modifier;
    });
}

/**
 * Filters players by position
 * @param {Array} players Array of player objects
 * @param {string} position Position to filter by (e.g., 'Duelist', 'Controller')
 * @returns {Array} Filtered array of players
 */
function filterByPosition(players, position) {
    return players.filter(player => player.Position === position);
}

/**
 * Gets top N players by Eval Score
 * @param {Array} players Array of player objects
 * @param {number} n Number of players to return
 * @returns {Array} Top N players
 */
function getTopPlayers(players, n = 10) {
    return sortPlayers(players, 'Eval Score', false).slice(0, n);
}

/**
 * Groups players by team
 * @param {Array} players Array of player objects
 * @returns {Object} Object with team names as keys and arrays of players as values
 */
function groupByTeam(players) {
    return players.reduce((teams, player) => {
        const teamName = player['Team Name'];
        if (!teams[teamName]) {
            teams[teamName] = [];
        }
        teams[teamName].push(player);
        return teams;
    }, {});
}

/**
 * Searches players by username or real name
 * @param {Array} players Array of player objects
 * @param {string} query Search query
 * @returns {Array} Matching players
 */
function searchPlayers(players, query) {
    const searchTerm = query.toLowerCase();
    return players.filter(player => 
        player.Username.toLowerCase().includes(searchTerm) ||
        player['Real Name'].toLowerCase().includes(searchTerm)
    );
}

/**
 * Fetches and processes team data from Google Sheets
 * @returns {Promise<Array>} Array of team objects with properties:
 * - Change (number)
 * - Team Name (string)
 * - Location (string)
 * - Eval Score (number)
 * - Wins (number)
 * - Losses (number)
 * - Points (number)
 */
async function fetchTeamData() {
    const path = window.location.pathname;
    let sheetId;
    
    if (path.includes('valorant') || path.includes('valpr')) {
        sheetId = '2PACX-1vTJi2B3uExkcdLHFKAwFOMOcq4xi-VjmQiazZyUAX00pN9ReNDkMsf7K9QlDBTmooAkIHN3sf8jdi90';
    } else if (path.includes('smash')) {
        sheetId = '2PACX-1vQE62SwQZY_ooAb4t7EvAn4fasrCJa2d_F7xX4QaKjA-uh0kV3YIMCceJf2KpSa3XoLKB02fetIokkH';
    }
    // Add more sheet IDs for other power rankings as needed
    
    if (!sheetId) {
        return [];
    }
    
    return fetchGoogleSheetData(sheetId);
}

// Add this to your existing utils.js
async function fetchGoogleSheetData(sheetId) {
    try {
        const response = await fetch(`https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?output=csv`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        
        // Parse CSV
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        
        return lines.slice(1).map(line => {
            const values = line.split(',');
            const item = {};
            headers.forEach((header, index) => {
                let value = values[index]?.trim() || '';
                
                // Convert numeric values
                if (['Change', 'Eval Score', 'Rating'].includes(header)) {
                    value = value ? parseFloat(value) : 0;
                }
                item[header] = value;
            });
            return item;
        });
    } catch (error) {
        console.error('Error fetching sheet data:', error);
        return [];
    }
}

// Export all functions
window.getBasePath = getBasePath;
window.fetchPlayerData = fetchPlayerData;
window.sortPlayers = sortPlayers;
window.filterByPosition = filterByPosition;
window.getTopPlayers = getTopPlayers;
window.groupByTeam = groupByTeam;
window.searchPlayers = searchPlayers;
window.fetchTeamData = fetchTeamData;
