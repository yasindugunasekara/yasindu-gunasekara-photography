const { GoogleGenerativeAI } = require("@google/generative-ai");

const chatWithGemini = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are Yasindu Gunasekara Photography's professional assistant.  
Only answer about photography services, packages, prices, and booking.  
Keep answers very short, simple, and friendly.  

Rules:
- If user says "I want shoot", ask what type (event, portrait, birthday, wedding, beach, campus, shows).  
- When they tell the type, reply with a short package detail: coverage time, photo count, and price.  
- If they want to book, ask for contact details and event date.  
- Never answer unrelated questions.  

Customer: ${message}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error("Gemini chat error:", err.message || err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  chatWithGemini,
};
