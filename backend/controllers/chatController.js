const masaratContext = require('../utils/masaratKnowledge');

const handleChat = async (req, res) => {
    const { message, history } = req.body;

    try {
        const formattedHistory = (history || []).map(msg => ({
            role: msg.role === 'model' ? 'assistant' : 'user',
            content: msg.parts[0].text
        }));

        const isFirstMessage = formattedHistory.length === 0;
        let finalMessage = message;
        
        if (isFirstMessage) {
            finalMessage = `تعليمات صارمة للإجابة:\n${masaratContext}\n\nسؤال المستخدم:\n${message}`;
        }

        formattedHistory.push({ role: 'user', content: finalMessage });

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openrouter/free",
                messages: formattedHistory,
            })
        });

        const data = await response.json();

        if (!response.ok || !data.choices || !data.choices[0]) {
            throw new Error(data.error?.message || "Invalid response format from OpenRouter");
        }
        
        res.status(200).json({ text: data.choices[0].message.content });
    } catch (error) {
        console.error("OpenRouter API Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { handleChat };