document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get inputs
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple Sanitization: Remove any HTML tags to prevent XSS
            const sanitize = (str) => {
                const temp = document.createElement('div');
                temp.textContent = str;
                return temp.innerHTML;
            };

            const cleanData = {
                name: sanitize(name),
                email: sanitize(email),
                message: sanitize(message)
            };

            // Status message
            formStatus.textContent = "Sending...";
            formStatus.style.color = "var(--text-secondary)";

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: JSON.stringify(cleanData),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = "Message sent successfully!";
                    formStatus.style.color = "var(--accent)";
                    contactForm.reset();
                } else {
                    throw new Error();
                }
            } catch (err) {
                formStatus.textContent = "Oops! There was a problem sending your message.";
                formStatus.style.color = "red";
            }
        });
    }
});