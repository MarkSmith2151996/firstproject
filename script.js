document.getElementById("send-button").addEventListener("click", async function () {
    const userInputElement = document.getElementById("user-input");
    const chatOutput = document.getElementById("chat-output");
    const userInput = userInputElement.value.trim();

    if (!userInput) return;

    // Safely add user message
    const addMessage = (role, message) => {
        const messageElement = document.createElement("div");
        messageElement.innerHTML = `<strong>${role}:</strong> ${escapeHtml(message)}`;
        chatOutput.appendChild(messageElement);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    };

    addMessage("You", userInput);

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userInput }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        addMessage("Bot", data.botReply);
    } catch (error) {
        console.error("Error:", error);
        addMessage("Error", error.message || "Something went wrong!");
    } finally {
        userInputElement.value = "";
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