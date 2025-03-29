// This ensures common elements are loaded on every page
function loadCommonElements() {
    const basePath = window.getBasePath();
    
    // Add common CSS files if not already present
    const commonCss = [
        'css/shared/common.css',
        'css/shared/header.css',
        'css/shared/footer.css'
    ];
    
    commonCss.forEach(cssPath => {
        if (!document.querySelector(`link[href*="${cssPath}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = basePath + cssPath;
            document.head.appendChild(link);
        }
    });
    
    // Add header element if not present
    if (!document.getElementById('header')) {
        const header = document.createElement('header');
        header.id = 'header';
        document.body.insertBefore(header, document.body.firstChild);
    }
    
    // Add footer element if not present
    if (!document.getElementById('footer')) {
        const footer = document.createElement('footer');
        footer.id = 'footer';
        document.body.appendChild(footer);
    }
    
    // Add common scripts if not already present
    const commonScripts = [
        'js/shared/utils.js',
        'js/shared/header.js',
        'js/shared/footer.js'
    ];
    
    commonScripts.forEach(scriptPath => {
        if (!document.querySelector(`script[src*="${scriptPath}"]`)) {
            const script = document.createElement('script');
            script.src = basePath + scriptPath;
            document.body.appendChild(script);
        }
    });
}

// Run when the DOM is ready
document.addEventListener('DOMContentLoaded', loadCommonElements); 