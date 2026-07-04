import  { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

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
            role: msg.role === 'model' ? 'model' : 'user', 
            parts: [{ text: msg.text }] 
        }));

      // استخدام متغيرات البيئة الخاصة بـ Vite
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            message: textToSend,
            history: historyToSend
        }),
      });
      
      const data = await response.json();

      if (response.ok && data.text) {
        setMessages([...newMessages, { role: 'model', text: data.text }]);
      } else {
        console.error("Backend Error:", data.error || "Unknown error");
        setMessages([...newMessages, { role: 'model', text: "عذراً، حدث خطأ في الخادم." }]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessages([...newMessages, { role: 'model', text: "عذراً، لا يمكن الاتصال بالخادم." }]);
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