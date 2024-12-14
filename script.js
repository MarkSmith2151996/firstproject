document.getElementById("send-button").addEventListener("click", async function () {
    const userInputElement = document.getElementById("user-input");
    const userInput = userInputElement.value;
    if (!userInput.trim()) return;

    const chatOutput = document.getElementById("chat-output");
    
    // Safely add user message
    const userMessageElement = document.createElement('div');
    userMessageElement.innerHTML = `<strong>You:</strong> ${escapeHtml(userInput)}`;
    chatOutput.appendChild(userMessageElement);

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Safely add bot response
        const botMessageElement = document.createElement('div');
        botMessageElement.innerHTML = `<strong>Bot:</strong> ${escapeHtml(data.botReply)}`;
        chatOutput.appendChild(botMessageElement);

        userInputElement.value = '';
        chatOutput.scrollTop = chatOutput.scrollHeight;
    } catch (error) {
        console.error("Error:", error);
        
        // Safely add error message
        const errorMessageElement = document.createElement('div');
        errorMessageElement.innerHTML = `<strong>Error:</strong> ${escapeHtml(error.message || 'Something went wrong!')}`;
        chatOutput.appendChild(errorMessageElement);
    }
});

// Helper function to escape HTML to prevent XSS
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}