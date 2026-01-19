document.addEventListener('DOMContentLoaded', () => {
    
    // Function to handle the actual logic
    async function setupForm(formId, statusId) {
        const form = document.getElementById(formId);
        const statusMsg = document.getElementById(statusId);

        // If this form isn't on the current page, skip it
        if (!form || !statusMsg) return;

        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const data = new FormData(event.target);
            statusMsg.innerHTML = "[...] SENDING SIGNAL...";
            statusMsg.style.color = "var(--text)";

            fetch(event.target.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    statusMsg.innerHTML = "[SUCCESS] SIGNAL RECEIVED. STATUS: 200 OK";
                    statusMsg.style.color = "var(--accent)";
                    form.reset();
                } else {
                    statusMsg.innerHTML = "[ERROR] TRANSMISSION FAILED. STATUS: 500";
                    statusMsg.style.color = "#ff5f56";
                }
            }).catch(error => {
                statusMsg.innerHTML = "[ERROR] NETWORK INTERRUPTED.";
                statusMsg.style.color = "#ff5f56";
            });
        });
    }

    // Initialize both possible forms
    setupForm('contact-form', 'form-status');      // For contact.html
    setupForm('home-contact-form', 'home-status'); // For index.html
});
