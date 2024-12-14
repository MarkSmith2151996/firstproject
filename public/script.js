document.getElementById("send-button").addEventListener("click", async function () {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    const chatOutput = document.getElementById("chat-output");
    chatOutput.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

    try {
        const response = await fetch("http://localhost:3000/chat", {  // Use localhost:3000
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput }),
        });

        const data = await response.json();
        chatOutput.innerHTML += `<div><strong>Bot:</strong> ${data.botReply}</div>`;
        document.getElementById("user-input").value = '';
        chatOutput.scrollTop = chatOutput.scrollHeight;
    } catch (error) {
        console.error("Error:", error);
        chatOutput.innerHTML += `<div><strong>Error:</strong> Something went wrong!</div>`;
    }
});
