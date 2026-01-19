
const contactForm = document.getElementById('contact-form');
const statusMsg = document.getElementById('form-status');

contactForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const data = new FormData(event.target);
    statusMsg.innerHTML = "[...] SENDING SIGNAL...";
    statusMsg.style.color = "var(--text)";

    fetch(event.target.action, {
        method: contactForm.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            statusMsg.innerHTML = "[SUCCESS] SIGNAL RECEIVED. STATUS: 200 OK";
            statusMsg.style.color = "var(--accent)";
            contactForm.reset();
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
