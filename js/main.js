document.addEventListener('DOMContentLoaded', () => {
    const handleSubmission = async (event) => {
        event.preventDefault();
        
        const form = event.target;
        const data = new FormData(form);
        const status = document.getElementById('home-status') || document.getElementById('form-status');

        if (status) {
            status.innerHTML = "[...] SENDING SIGNAL...";
            status.style.color = "var(--text)";
        }

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                if (status) {
                    status.innerHTML = "[SUCCESS] SIGNAL RECEIVED. STATUS: 200 OK";
                    status.style.color = "var(--accent)";
                }
                form.reset();
            } else {
                if (status) {
                    status.innerHTML = "[ERROR] TRANSMISSION FAILED.";
                    status.style.color = "#ff5f56";
                }
            }
        } catch (error) {
            if (status) {
                status.innerHTML = "[ERROR] NETWORK INTERRUPTED.";
                status.style.color = "#ff5f56";
            }
        }
    };

    const allForms = document.querySelectorAll('form');
    allForms.forEach(f => {
        f.addEventListener('submit', handleSubmission);
    });
});
