"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  whatsappUrl?: string;
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
          ? "السلام علیکم! میں آپ کی مدد کے لیے حاضر ہوں۔ اشتہار بکنگ کے لیے واٹس ایپ بٹن استعمال کریں۔"
          : "Hi! I can help with queries and ad bookings. Use WhatsApp booking anytime."
    }
  ]);

  return (
    <div className="chatbot-wrap">
      <button className="chatbot-toggle" onClick={() => setOpen((v) => !v)} type="button">
        {locale === "ur" ? "اسسٹنٹ" : "Assistant"}
      </button>

      {open ? (
        <div className="chatbot-panel">
          <div className="chatbot-head">
            <strong>{locale === "ur" ? "AI اسسٹنٹ" : "AI Assistant"}</strong>
            <a href={fallbackBookingUrl} target="_blank" rel="noreferrer" className="auth-btn">
              {locale === "ur" ? "واٹس ایپ بکنگ" : "WhatsApp Booking"}
            </a>
          </div>

          <div className="chatbot-body">
            {messages.map((msg, idx) => (
              <div key={`${msg.role}-${idx}`} className={`chat-msg ${msg.role}`}>
                <p>{msg.text}</p>
                {msg.whatsappUrl ? (
                  <a href={msg.whatsappUrl} target="_blank" rel="noreferrer">
                    {locale === "ur" ? "اب بک کریں" : "Book Now"}
                  </a>
                ) : null}
              </div>
            ))}
          </div>

          <form
            className="chatbot-input"
            onSubmit={async (event) => {
              event.preventDefault();
              const text = input.trim();
              if (!text) {
                return;
              }

              setMessages((prev) => [...prev, { role: "user", text }]);
              setInput("");

              const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, locale })
              });
              const data = (await res.json()) as { answer?: string; whatsappUrl?: string };

              setMessages((prev) => [
                ...prev,
                {
                  role: "assistant",
                  text: data.answer ?? "Sorry, please try again.",
                  whatsappUrl: data.whatsappUrl
                }
              ]);
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={locale === "ur" ? "اپنا سوال لکھیں..." : "Type your question..."}
            />
            <button type="submit" className="auth-btn">
              {locale === "ur" ? "بھیجیں" : "Send"}
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
