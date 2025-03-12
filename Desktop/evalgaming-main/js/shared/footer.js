document.addEventListener('DOMContentLoaded', function() {
    const basePath = window.getBasePath();
    
    const footerHTML = `
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">
                        <img src="${basePath}images/logos/eval-white.png" alt="EVAL">
                    </div>
                    <p>Empowering esports athletes and coaches with data-driven insights.</p>
                </div>
                <div class="footer-section">
                    <h3>Games</h3>
                    <ul>
                        <li><a href="${basePath}pages/games/valorant.html">VALORANT</a></li>
                        <li><a href="${basePath}pages/games/rocket.html">Rocket League</a></li>
                        <li><a href="${basePath}pages/games/smash.html">Super Smash Bros</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="${basePath}pages/signup.html">Player Sign Up</a></li>
                        <li><a href="${basePath}pages/recruiting/coaches.html">For Coaches</a></li>
                        <li><a href="${basePath}pages/about.html">About Us</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Connect</h3>
                    <div class="social-links">
                        <a href="https://x.com/home?lang=en" class="social-link" target="_blank">Twitter</a>
                        <a href="https://www.instagram.com/evalprogaming/" class="social-link" target="_blank">Instagram</a>
                        <a href="#" class="social-link">Discord</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 EVAL. All rights reserved.</p>
            </div>
        </div>
    `;
    
    // Get the footer element and insert the content
    const footerElement = document.getElementById('footer');
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
    }
});
