document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = newsletterForm.querySelector('input[type="email"]');
    const subscribeButton = newsletterForm.querySelector('.subscribe-button');

    // Main signup form handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic email validation
        const emailInput = document.getElementById('email');
        if (!isValidEmail(emailInput.value)) {
            alert('Please enter a valid email address');
            return;
        }

        // Collect form data
        const formData = {
            highschool: document.getElementById('highschool').value,
            accountName: document.getElementById('account-name').value,
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            contactName: document.getElementById('contact-name').value,
            contactPhone: document.getElementById('contact-phone').value,
            email: emailInput.value,
            twitter: document.getElementById('twitter').value,
            accolades: document.getElementById('accolades').value
        };

        // Log the form submission
        console.log('Form submitted with data:', formData);
        alert('Registration submitted successfully! (Email functionality will be added later)');
        form.reset();
    });

    // Newsletter subscription handler
    subscribeButton.addEventListener('click', () => {
        const email = newsletterInput.value.trim();
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Log the newsletter subscription
        console.log('Newsletter subscription:', { email });
        alert('Thank you for subscribing! (Email functionality will be added later)');
        newsletterInput.value = '';
    });
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
} 