document.addEventListener('DOMContentLoaded', async function() {
    // Function to create a preview item
    function createPreviewItem(rank, data, isPR) {
        const profileLink = isPR ? '' : `onclick="window.location.href='pages/players/${data.game.toLowerCase()}/${data.name.toLowerCase().replace(/\s+/g, '-')}.html'"`;
        const className = isPR ? 'preview-item' : 'preview-item clickable';
        
        return `
            <div class="${className}" ${profileLink}>
                <div class="rank">${rank}</div>
                <div class="change ${data.change > 0 ? 'positive' : data.change < 0 ? 'negative' : ''}">
                    ${data.change > 0 ? '↑' : data.change < 0 ? '↓' : '–'}${Math.abs(data.change)}
                </div>
                <div class="team-info">
                    <div class="name">${data.name}</div>
                    ${data.region ? `<div class="region">${data.region}</div>` : ''}
                </div>
                <div class="record">${data.record || ''}</div>
                <div class="rating">${data.score}</div>
            </div>
        `;
    }

    // Function to create preview header
    function createPreviewHeader(isPR) {
        return `
            <div class="preview-header">
                <div class="rank">Rank</div>
                <div class="change">Change</div>
                <div class="team-info">${isPR ? 'Team' : 'Player'}</div>
                <div class="record">Record</div>
                <div class="rating">Rating</div>
            </div>
        `;
    }

    // Function to populate preview box with data
    async function populatePreview(containerId, data, isPR = true) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const headerHTML = createPreviewHeader(isPR);
        const previewHTML = data.slice(0, 5).map((item, index) => 
            createPreviewItem(index + 1, item, isPR)
        ).join('');

        container.innerHTML = headerHTML + previewHTML;
    }

    // Setup tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const previewBox = button.closest('.preview-box');
            previewBox.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            previewBox.querySelectorAll('.preview-content').forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            const contentId = button.getAttribute('data-tab');
            document.getElementById(contentId).classList.add('active');
        });
    });

    try {
        // VALORANT Data
        const valorantPRData = [
            { name: "Team SoloMid", region: "NA", record: "24-6", score: "2850", change: 2 },
            { name: "Cloud9", region: "NA", record: "22-8", score: "2720", change: -1 },
            { name: "100 Thieves", region: "NA", record: "21-9", score: "2680", change: 1 },
            { name: "Sentinels", region: "NA", record: "20-10", score: "2645", change: 0 },
            { name: "NRG", region: "NA", record: "19-11", score: "2610", change: 3 }
        ];
        const valorantTop50Data = [
            { name: "TenZ", region: "NA", record: "89%", score: "98.5", change: 0, game: "valorant" },
            { name: "Yay", region: "NA", record: "87%", score: "97.8", change: 1, game: "valorant" },
            { name: "Derke", region: "EU", record: "86%", score: "97.2", change: -1, game: "valorant" },
            { name: "Cryocells", region: "NA", record: "85%", score: "96.9", change: 2, game: "valorant" },
            { name: "Zekken", region: "NA", record: "84%", score: "96.5", change: -1, game: "valorant" }
        ];
        await populatePreview('valorant-pr', valorantPRData, true);
        await populatePreview('valorant-top50', valorantTop50Data, false);

        // Rocket League Data
        const rocketPRData = [
            { name: "NRG Esports", region: "NA", record: "25-5", score: "2890", change: 0 },
            { name: "G2 Esports", region: "NA", record: "23-7", score: "2845", change: 2 },
            { name: "Team Vitality", region: "EU", record: "22-8", score: "2780", change: -1 },
            { name: "Spacestation", region: "NA", record: "21-9", score: "2755", change: 1 },
            { name: "FaZe Clan", region: "NA", record: "20-10", score: "2720", change: -2 }
        ];
        const rocketTop50Data = [
            { name: "Jstn", region: "NA", record: "90%", score: "98.2", change: 0, game: "rocket" },
            { name: "Monkey Moon", region: "EU", record: "88%", score: "97.5", change: 1, game: "rocket" },
            { name: "Vatira", region: "EU", record: "87%", score: "97.1", change: -1, game: "rocket" },
            { name: "Firstkiller", region: "NA", record: "86%", score: "96.8", change: 0, game: "rocket" },
            { name: "Rise", region: "NA", record: "85%", score: "96.4", change: 2, game: "rocket" }
        ];
        await populatePreview('rocket-pr', rocketPRData, true);
        await populatePreview('rocket-top50', rocketTop50Data, false);

        // Smash Data
        const smashPRData = [
            { name: "MkLeo", region: "MX", record: "26-4", score: "2950", change: 0 },
            { name: "Tweek", region: "NA", record: "24-6", score: "2880", change: 0 },
            { name: "Sparg0", region: "MX", record: "23-7", score: "2840", change: 2 },
            { name: "Light", region: "NA", record: "22-8", score: "2795", change: -1 },
            { name: "Dabuz", region: "NA", record: "21-9", score: "2760", change: 1 }
        ];
        const smashTop50Data = [
            { name: "Glutonny", region: "EU", record: "88%", score: "97.8", change: 1, game: "smash" },
            { name: "Riddles", region: "CA", record: "87%", score: "97.2", change: -1, game: "smash" },
            { name: "Cosmos", region: "NA", record: "86%", score: "96.9", change: 0, game: "smash" },
            { name: "Maister", region: "MX", record: "85%", score: "96.5", change: 2, game: "smash" },
            { name: "Kola", region: "NA", record: "84%", score: "96.2", change: -1, game: "smash" }
        ];
        await populatePreview('smash-pr', smashPRData, true);
        await populatePreview('smash-top50', smashTop50Data, false);

    } catch (error) {
        console.error('Error populating previews:', error);
    }
}); 