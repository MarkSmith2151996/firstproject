document.getElementById("send-button").addEventListener("click", async function () {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    // Display user input in chat output
    const chatOutput = document.getElementById("chat-output");
    chatOutput.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Send the input to the server and get the response
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();
        chatOutput.innerHTML += `<p><strong>ChatGPT:</strong> ${data.reply}</p>`;
    } catch (error) {
        console.error("Error:", error);
        chatOutput.innerHTML += `<p><strong>Error:</strong> Something went wrong!</p>`;
    }
});
