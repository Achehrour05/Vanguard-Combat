import React, { useState, useEffect, useRef } from "react";
import "./ChatBot.css";
const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Combat intelligence active. Ask me anything about strategy, history, or training." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);
    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        const userMsg = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: input,
                    history: messages
                })
            });
            const data = await response.json();
            if (data.response) {
                setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
            } else if (data.error) {
                setMessages(prev => [...prev, { role: "assistant", content: "Error: " + data.error }]);
            }
        } catch (err) {
            setMessages(prev => [...prev, { role: "assistant", content: "Connection to the Octagon AI failed. Please check if the backend is running." }]);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
            {}
            <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <div className="bot-icon">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <div className="status-indicator"></div>
                    </div>
                )}
            </button>
            {}
            <div className="chatbot-window">
                <header className="chatbot-header">
                    <div className="header-top">
                        <div className="pulse-dot"></div>
                        <span>COMBAT AI · ONLINE</span>
                    </div>
                    <h3>STRATEGIC INTEL</h3>
                </header>
                <div className="chatbot-messages">
                    {messages.map((msg, i) => (
                        <div key={i} className={`message-row ${msg.role}`}>
                            <div className="message-content">
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message-row assistant">
                            <div className="typing-loader">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form className="chatbot-input" onSubmit={handleSend}>
                    <input
                        type="text"
                        placeholder="Analyze a style..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};
export default ChatBot;