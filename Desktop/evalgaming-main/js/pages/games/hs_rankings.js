document.addEventListener('DOMContentLoaded', function () {
    const basePath = window.getBasePath();

    // Inject Header and Footer
    fetch(`${basePath}components/header.html`)
        .then(response => response.text())
        .then(data => document.getElementById('header').innerHTML = data);

    fetch(`${basePath}components/footer.html`)
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data);

    console.log("High School Rankings page loaded successfully.");
});
