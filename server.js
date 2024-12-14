const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configure OpenAI API
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// API Endpoint
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
        });

        const reply = response.data.choices[0]?.message?.content || "No response from OpenAI.";
        res.json({ botReply: reply });
    } catch (error) {
        console.error("Error from OpenAI API:", error);
        res.status(500).send("Error processing request");
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
