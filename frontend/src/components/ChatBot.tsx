import React, { useState, useEffect, useRef } from "react";
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

  const messagesEndRef = useRef<HTMLDivElement | null>(null); // reference for auto-scroll

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

  // Auto scroll to bottom whenever new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
          className="fixed bottom-6 left-6 bg-gray-900 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-600 transition-transform transform translate-y-4 opacity-0 animate-slideIn"
        >
          <img
            src="/assets/profilePic/bot.jpg"
            className="w-12 h-12 rounded-full"
          />
        </button>
      )}

      {/* Chat popup */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 w-80 h-[28rem] bg-white border rounded-lg shadow-xl flex flex-col animate-fadeIn overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-4 py-4 rounded-t-lg relative overflow-hidden">
            <div className="flex items-center">
              {/* Profile Picture */}
              <div className="w-10 h-10 rounded-full bg-white border-2 border-white overflow-hidden flex-shrink-0">
                <img
                  src="/assets/profilePic/bot.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <span className="block text-lg font-semibold">
                  Ask questions
                </span>
                <span className="block text-xs text-gray-900">online</span>
              </div>
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white font-bold text-xl leading-none"
                >
                  &times;
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-xl max-w-[85%] ${
                    msg.sender === "user"
                      ? "bg-yellow-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {/* Invisible div for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center border-t border-gray-200 p-2 bg-white">
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
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
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
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
