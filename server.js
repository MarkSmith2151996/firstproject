const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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

// API endpoint
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", // or "gpt-4"
            messages: [{ role: "user", content: message }],
        });

        const reply = response.data.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing request");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

