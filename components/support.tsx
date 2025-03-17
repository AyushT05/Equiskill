"use client"
import { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen ? (
        <div className="relative group">
          {/* Chat Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-full shadow-md bg-[#cce6ff] transition-transform transform hover:scale-110"
          >
            <img 
              src="/gg-blue.png" 
              alt="Chat" 
              className="w-10 h-10 object-contain transition-transform duration-300 ease-in-out group-hover:rotate-12 group-hover:scale-110" 
            />
          </button>

          {/* Tooltip (Hidden by default, shows on hover) */}
          <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#cce6ff] text-[#003cb3] text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Support
          </span>
        </div>
      ) : (
        <div className="relative w-[400px] h-[600px] bg-white shadow-xl rounded-lg border overflow-hidden">
          {/* Close Button - Slightly moved to the left */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-1 w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition"
          >
            ✖
          </button>

          <iframe
            src="https://www.chatbase.co/chatbot-iframe/G6sBnGcXYXlRCVn92Sa6f"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          ></iframe>
        </div>
      )}
    </div>
  );
}