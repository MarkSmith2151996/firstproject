const { OpenAI } = require("openai");
require("dotenv").config();  // Ensure you have a .env file with your OpenAI API key

// OpenAI configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // Use your OpenAI API key here
});

// Serverless function handler
export default async function handler(req, res) {
    if (req.method === "POST") {
        const message = req.body.userInput;

        try {
            // Make request to OpenAI API
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",  // Change the model as needed
                messages: [{ role: "user", content: message }],
            });

            const reply = response.choices[0].message.content;

            // Send back the OpenAI response
            res.status(200).json({ botReply: reply });
        } catch (error) {
            console.error("Error processing request:", error);

            if (error.code === "insufficient_quota") {
                res.status(429).json({
                    message: "You have exceeded your OpenAI usage quota. Please check your plan and billing details.",
                    error: error.message,
                });
            } else {
                res.status(500).send("Error processing request");
            }
        }
    } else {
        // Handle unsupported HTTP methods
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
