document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('coachSignupForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            email: form.email.value,
            school: form.school.value,
            games: form.games.value
        };
        
        try {
            // Send data to Google Sheets
            const response = await fetch('YOUR_GOOGLE_SHEETS_WEB_APP_URL', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            // Send email notification
            const emailBody = `
                New Coach Signup:
                Name: ${formData.firstName} ${formData.lastName}
                Email: ${formData.email}
                School: ${formData.school}
                Games Available: ${formData.games}
            `;
            
            const mailtoLink = `mailto:eval.information@gmail.com?subject=New Coach Signup&body=${encodeURIComponent(emailBody)}`;
            window.location.href = mailtoLink;
            
            // Clear form
            form.reset();
            
            // Show success message
            alert('Thank you for signing up! We will be in touch soon.');
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting the form. Please try again.');
        }
    });
}); 