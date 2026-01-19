// This handles both the contact page form and the index page quick form
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Find the status div relative to the current form
        // It looks for a div with 'status' in the ID (form-status or home-status)
        const statusMsg = document.querySelector('[id*="status"]');
        
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
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        statusMsg.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        statusMsg.innerHTML = "[ERROR] TRANSMISSION FAILED. STATUS: 500";
                    }
                })
            }
        }).catch(error => {
            statusMsg.innerHTML = "[ERROR] NETWORK INTERRUPTED. CHECK CONNECTION.";
            statusMsg.style.color = "#ff5f56";
        });
    });
});
