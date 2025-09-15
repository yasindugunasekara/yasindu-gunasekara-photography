import React, { useState, useEffect } from "react";
import { sendMessage } from "../api/chat";

type Message = {
  sender: "user" | "ai";
  text: string;
};

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false); // popup visibility
  const [showButton, setShowButton] = useState<boolean>(false); // button visibility

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const reply: string = await sendMessage(input);
      const aiMessage: Message = { sender: "ai", text: reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        sender: "ai",
        text: "Sorry, something went wrong!",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // IntersectionObserver to show button when contact section appears
  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        });
      },
      { threshold: 0.1 } // trigger when 10% of section is visible
    );

    observer.observe(contactSection);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Chat button */}
      {showButton && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-4 bg-amber-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-amber-600 transition-transform transform translate-y-4 opacity-0 animate-slideIn"
        >
          Chat
        </button>
      )}

      {/* Chat popup */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 w-80 bg-white border rounded-lg shadow-lg flex flex-col animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center bg-amber-500 text-white px-4 py-2 rounded-t-lg">
            <span>Chat with AI</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white font-bold"
            >
              X
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto h-64">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded ${
                    msg.sender === "user"
                      ? "bg-amber-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t p-2">
            <input
              type="text"
              className="border rounded px-2 flex-grow mr-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-amber-500 text-white px-4 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Tailwind animation styles */}
      <style>
        {`
          @keyframes slideIn {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slideIn {
            animation: slideIn 0.5s ease-out forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
        `}
      </style>
    </>
  );
};

export default ChatBot;
