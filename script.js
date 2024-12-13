// script.js
document.getElementById("send-button").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() !== "") {
        // Display user's input
        const chatOutput = document.getElementById("chat-output");
        chatOutput.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

        // Send user input to the server for GPT-3 processing
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput })
        });

        const data = await response.json();
        const botMessage = data.botReply;

        // Display the chatbot's reply
        chatOutput.innerHTML += `<div><strong>Bot:</strong> ${botMessage}</div>`;
        document.getElementById("user-input").value = ''; // Clear input
        chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to the bottom
    }
});
