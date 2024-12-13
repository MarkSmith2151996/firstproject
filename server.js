// server.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3000;

app.use(express.static("public")); // Serve static files (e.g., HTML, CSS, JS)
app.use(express.json()); // Middleware to parse JSON bodies

// Define OpenAI API key and endpoint
const OPENAI_API_KEY = "your-openai-api-key"; // Replace with your OpenAI API key
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

// Endpoint to handle chat
app.post("/chat", async (req, res) => {
    const userInput = req.body.userInput;
    
    // Request body for OpenAI's API
    const requestBody = {
        model: "gpt-3.5-turbo", // You can choose a different model if needed
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userInput }
        ]
    };

    try {
        const response = await fetch(OPENAI_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;

        // Send the bot's reply to the front-end
        res.json({ botReply });
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
