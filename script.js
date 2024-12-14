document.getElementById("send-button").addEventListener("click", async function () {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    const chatOutput = document.getElementById("chat-output");
    chatOutput.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userInput }),
        });

        if (!response.ok) {
            throw new Error("Failed to connect to the server.");
        }

        const data = await response.json();
        chatOutput.innerHTML += `<div><strong>Bot:</strong> ${data.botReply}</div>`;
    } catch (error) {
        console.error("Error:", error);
        chatOutput.innerHTML += `<div><strong>Error:</strong> ${error.message || "Something went wrong!"}</div>`;
    } finally {
        document.getElementById("user-input").value = '';
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
});
