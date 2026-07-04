import  { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

// سياق المعرض المخصص (RAG) لضمان دقة الإجابات باللغة العربية
const masaratContext = `
أنت مرشد ذكي لمعرض "مسارات - رحلة عبر هوية مصر".
معلومات عن المعرض والموقع الإلكتروني:
- المعرض يستعرض ثقافات، تراث، وهوية المحافظات المصرية.
موقع المعرض وطرق الوصول:
- يقع المعرض في "العاصمة الإدارية الجديدة".
- من "القليوبية": الطريق الدائري الإقليمي، أو مواصلات لرمسيس ثم القطار الكهربائي الخفيف (LRT).
- من "رمسيس": مترو الخط الثالث لمحطة "عدلي منصور"، ثم الـ LRT.
الأجنحة والأقسام:
- الاستقبال (Reception): نقطة البداية.
- المسرح (Theater): عروض التنورة والتحطيب.
- جناح القاهرة (Cairo): التراث الإسلامي والقبطي.
- جناح الإسكندرية (Alexandria): التراث اليوناني الروماني.
- جناح أسوان (Aswan): سحر النوبة والعمارة النوبية.
- جناح الأقصر (Luxor): الحضارة الفرعونية القديمة.
- جناح سيوة (Siwa): التراث الأمازيغي والتمور وبحيرات الملح.
قواعد الاستجابة:
- إجاباتك ودودة، احترافية، وموجزة. لا تخترع معلومات من خارج هذا السياق.
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Welcome to Masarat — your intelligent guide to Egypt's cultural journey. Ask me anything about the exhibition, or how to get here!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { role: 'user', text: textToSend }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true); 

    try {
      const historyToSend = messages
        .filter((msg, index) => index !== 0) 
        .map(msg => ({ 
            role: msg.role === 'model' ? 'assistant' : 'user', 
            content: msg.text 
        }));

      const isFirstMessage = historyToSend.length === 0;
      let finalMessage = textToSend;
      
      if (isFirstMessage) {
          finalMessage = `تعليمات صارمة للإجابة:\n${masaratContext}\n\nسؤال المستخدم:\n${textToSend}`;
      }

      historyToSend.push({ role: 'user', content: finalMessage });

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "openrouter/free", 
            messages: historyToSend,
        })
      });
      
      const data = await response.json();

      if (response.ok && data.choices && data.choices[0]) {
        setMessages([...newMessages, { role: 'model', text: data.choices[0].message.content }]);
      } else {
        console.error("API Error:", data.error?.message || "Unknown error");
        setMessages([...newMessages, { role: 'model', text: "عذراً، حدث خطأ في الاتصال بالذكاء الاصطناعي." }]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessages([...newMessages, { role: 'model', text: "عذراً، تأكد من اتصالك بالإنترنت." }]);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-title">
              <span className="chatbot-dot"></span>
              Masarat Guide
            </div>
            <button className="chatbot-close" onClick={toggleChat}>×</button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                {msg.text}
              </div>
            ))}
            
            {isLoading && (
              <div className="message model typing-indicator">
                <span></span><span></span><span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-quick-questions">
            <button onClick={() => handleQuickQuestion("كيف أصل للمعرض من رمسيس؟")}>
              كيف أصل من رمسيس؟
            </button>
            <button onClick={() => handleQuickQuestion("What can I see in the Siwa section?")}>
              What is in Siwa?
            </button>
            <button onClick={() => handleQuickQuestion("أروح المعرض إزاي من القليوبية؟")}>
              مواصلات القليوبية
            </button>
          </div>

          <div className="chatbot-input-area">
            <input 
              type="text" 
              placeholder="Ask about Masarat..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              disabled={isLoading} 
            />
            <button className="chatbot-send" onClick={() => sendMessage(input)} disabled={isLoading}>
               ➤
            </button>
          </div>
        </div>
      )}
      
      <button className="chatbot-toggle-btn" onClick={toggleChat}>
        💬
      </button>
    </div>
  );
};

export default Chatbot;