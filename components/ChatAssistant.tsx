"use client";

import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/lib/i18n";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  whatsappUrl?: string;
  timestamp: Date;
  isAI?: boolean;
}

const fallbackBookingUrl =
  "https://wa.me/923554776466?text=Hello%2C%20I%20want%20to%20book%20an%20ad%20on%20The%20Voice%20of%20Islamabad.";

export function ChatAssistant({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text:
        locale === "ur"
          ? "السلام علیکم! 👋 میں The Voice of Islamabad کا AI اسسٹنٹ ہوں۔ نیوز، اشتہار، یا کسی بھی سوال کے لیے پوچھیں۔"
          : "Hi! 👋 I'm The Voice of Islamabad's AI Assistant. Ask about news, ad booking, or anything else.",
      timestamp: new Date(),
      isAI: true
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    
    if (!text || loading) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { role: "user", text, timestamp: new Date() }
    ]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, locale })
      });

      if (!res.ok) throw new Error("API error");

      const data = (await res.json()) as {
        answer?: string;
        whatsappUrl?: string;
        isAI?: boolean;
        error?: string;
      };

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: locale === "ur" ? "معافی چاہتا ہوں، براہِ کرم دوبارہ کوشش کریں۔" : "Sorry, please try again.",
            timestamp: new Date()
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: data.answer ?? (locale === "ur" ? "مجھے جواب نہیں ملا۔" : "No response."),
            whatsappUrl: data.whatsappUrl,
            timestamp: new Date(),
            isAI: data.isAI
          }
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: locale === "ur" ? "کنکشن میں مسئلہ۔ براہِ مہربانی دوبارہ کوشش کریں۔" : "Connection error. Please try again.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-wrap">
      <button
        className="chatbot-toggle"
        onClick={() => setOpen((v) => !v)}
        type="button"
        title="Open chat assistant"
      >
        {open ? "✕" : "💬"} {locale === "ur" ? "اسسٹنٹ" : "Chat"}
      </button>

      {open && (
        <div className="chatbot-panel">
          <div className="chatbot-head">
            <div className="head-title">
              <strong>🤖 {locale === "ur" ? "AI اسسٹنٹ" : "AI Assistant"}</strong>
              <span className="status">{locale === "ur" ? "آن لائن" : "Online"}</span>
            </div>
            <a
              href={fallbackBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="auth-btn booking-btn"
              title="Book an ad"
            >
              {locale === "ur" ? "📱 اشتہار بک کریں" : "📱 Book Ad"}
            </a>
          </div>

          <div className="chatbot-body">
            {messages.map((msg, idx) => (
              <div key={`${msg.role}-${idx}`} className={`chat-msg ${msg.role}`}>
                <div className="msg-content">
                  <p>{msg.text}</p>
                  {msg.isAI && <span className="ai-badge">AI</span>}
                </div>
                <span className="msg-time">
                  {msg.timestamp.toLocaleTimeString(locale, {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
                {msg.whatsappUrl && (
                  <a
                    href={msg.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-link"
                  >
                    {locale === "ur" ? "📞 واٹس ایپ پر رابطہ کریں" : "📞 Contact on WhatsApp"}
                  </a>
                )}
              </div>
            ))}
            {loading && (
              <div className="chat-msg assistant">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSendMessage}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={loading}
              placeholder={
                locale === "ur"
                  ? "سوال پوچھیں یا پیغام لکھیں..."
                  : "Ask a question or type your message..."
              }
              maxLength={500}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="auth-btn send-btn"
              title="Send message"
            >
              {loading ? "..." : locale === "ur" ? "بھیجیں" : "Send"}
            </button>
          </form>

          <div className="chatbot-footer">
            <small>
              {locale === "ur"
                ? "💡 AI نے جواب دیا۔ براہِ کرم معلومات کی تصدیق کریں۔"
                : "💡 Powered by AI. Please verify important information."}
            </small>
          </div>
        </div>
      )}

      <style jsx>{`
        .chatbot-wrap {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
          font-family: inherit;
        }

        .chatbot-toggle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .chatbot-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .chatbot-panel {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px;
          max-width: 90vw;
          height: 600px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chatbot-head {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.25rem;
          border-radius: 12px 12px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .head-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #4ade80;
          border-radius: 50%;
          margin-left: 0.5rem;
        }

        .booking-btn {
          background: rgba(255, 255, 255, 0.2) !important;
          border: 1px solid rgba(255, 255, 255, 0.5) !important;
          color: white !important;
          padding: 0.5rem 0.75rem !important;
          font-size: 0.85rem !important;
          white-space: nowrap;
        }

        .booking-btn:hover {
          background: rgba(255, 255, 255, 0.3) !important;
        }

        .chatbot-body {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .chat-msg {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chat-msg.user {
          align-items: flex-end;
        }

        .chat-msg.assistant {
          align-items: flex-start;
        }

        .msg-content {
          position: relative;
          max-width: 85%;
        }

        .chat-msg.user .msg-content p {
          background: #667eea;
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 18px 18px 4px 18px;
        }

        .chat-msg.assistant .msg-content p {
          background: #f0f0f0;
          color: #333;
          padding: 0.75rem 1rem;
          border-radius: 18px 18px 18px 4px;
        }

        .ai-badge {
          display: inline-block;
          font-size: 0.65rem;
          background: #667eea;
          color: white;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          margin-top: 0.25rem;
        }

        .msg-time {
          font-size: 0.75rem;
          color: #999;
        }

        .whatsapp-link {
          margin-top: 0.5rem;
          padding: 0.5rem 1rem;
          background: #25d366;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-block;
          transition: background 0.3s;
        }

        .whatsapp-link:hover {
          background: #1eaa50;
        }

        .typing-indicator {
          display: flex;
          gap: 0.4rem;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: #999;
          border-radius: 50%;
          animation: bounce 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
        }

        .chatbot-input {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
          border-top: 1px solid #e0e0e0;
        }

        .chatbot-input input {
          flex: 1;
          border: 1px solid #e0e0e0;
          border-radius: 24px;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.3s;
        }

        .chatbot-input input:focus {
          border-color: #667eea;
        }

        .send-btn {
          padding: 0.75rem 1.5rem !important;
          font-size: 0.875rem !important;
          min-width: auto !important;
        }

        .chatbot-footer {
          padding: 0.75rem 1rem;
          background: #f9f9f9;
          border-top: 1px solid #e0e0e0;
          border-radius: 0 0 12px 12px;
          text-align: center;
          color: #666;
          font-size: 0.75rem;
        }

        @media (max-width: 480px) {
          .chatbot-panel {
            width: calc(100vw - 1rem);
            height: 70vh;
          }
        }
      `}</style>
    </div>
  );
}
