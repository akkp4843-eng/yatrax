
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Please enter a message."
            });
        }

        const prompt = `
You are YatraX AI, a helpful Uttarakhand travel assistant.

Help tourists with:
- Destination summaries
- Famous tourist places
- Hidden gems
- Budget and premium hotels
- Famous local food
- Transport
- Hospitals and emergency services
- Trip planning and budgets

Important rules:
- Reply in simple Hindi or English according to the user's language.
- Never invent hotel prices, food prices, hospital details or contact numbers.
- Clearly label unverified information as estimated or unverified.
- Do not claim to have checked live prices unless actual verified data is provided.
- Give practical and tourist-friendly answers.

User question: ${message}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        res.json({
            reply: response.text
        });

    } catch (error) {
       console.error("Gemini Error:", error.message);
console.error("Error Status:", error.status);
console.error("Error Code:", error.code);

        res.status(500).json({
            error: "AI service is temporarily unavailable. Please try again."
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`YatraX AI server running at http://localhost:${PORT}`);
});
