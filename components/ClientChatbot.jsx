"use client";
import { useState, useRef, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";

const CATEGORY_KEYWORDS = [
  { keyword: "earphone", label: "Earphone" },
  { keyword: "headphone", label: "Headphone" },
  { keyword: "phone", label: "Smartphone" },
  { keyword: "smartphone", label: "Smartphone" },
  { keyword: "laptop", label: "Laptop" },
  { keyword: "camera", label: "Camera" },
  { keyword: "speaker", label: "Accessories" },
  { keyword: "accessory", label: "Accessories" },
  { keyword: "accessories", label: "Accessories" },
  { keyword: "watch", label: "Earphone" },
  { keyword: "projector", label: "Accessories" },
];

function findCategoryFromMessage(msg) {
  msg = msg.toLowerCase();
  for (const { keyword, label } of CATEGORY_KEYWORDS) {
    if (msg.includes(keyword)) return label;
  }
  return null;
}

const QUICK_REPLIES = [
  { label: "PHONES", message: "Show me phones" },
  { label: "Speakers", message: "Show me speaker stuff" },
  { label: "Earphones", message: "Show me earphones" },
  { label: "Laptops", message: "Show me laptops" },
  { label: "Cameras", message: "Show me cameras" },
];

export default function ClientChatbot() {
  const [chatOpen, setChatOpen] = useState(false);
  const { products } = useAppContext();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me for popular products by category, e.g. 'Show me phones' or 'I want speaker stuff'." }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chatOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatOpen]);

  function handleSend(e) {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  }

  function sendMessage(userMsg) {
    setMessages(msgs => [...msgs, { from: "user", text: userMsg }]);
    // Bot response
    setTimeout(() => {
      const cat = findCategoryFromMessage(userMsg);
      if (cat) {
        const found = products.filter(p => p.category && p.category.toLowerCase() === cat.toLowerCase());
        if (found.length > 0) {
          setMessages(msgs => [
            ...msgs,
            { from: "bot", text: `Here are the most popular ${cat.toLowerCase()}s:` },
            { from: "bot", products: found.slice(0, 2) }
          ]);
        } else {
          setMessages(msgs => [...msgs, { from: "bot", text: `Sorry, I couldn't find any products for '${cat}'.` }]);
        }
      } else {
        setMessages(msgs => [...msgs, { from: "bot", text: "Sorry, I didn't understand. Try asking for a category like 'phones', 'laptop', 'earphone', 'camera', etc." }]);
      }
    }, 600);
  }

  return (
    <>
      {/* Floating Chatbot Button */}
      <button
        className="fixed right-6 bottom-6 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg p-4 text-lg font-bold transition"
        onClick={() => setChatOpen(true)}
        aria-label="Open chatbot"
        style={{ boxShadow: '0 4px 24px rgba(80,0,120,0.15)' }}
      >
        💬
      </button>
      {/* Chatbot Drawer */}
      {chatOpen && (
        <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200 animate-slideIn">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold text-lg text-purple-700">Carty Chatbot</span>
            <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 relative">
            <div className="flex flex-col gap-6 relative z-10">
              {messages.map((msg, idx) =>
                msg.products ? (
                  <div key={idx} className={`flex flex-col items-${messages[idx-1]?.from === 'user' ? 'start' : 'end'} w-full`}>
                    {msg.products.map((product, i) => (
                      <div key={i} className="ml-8">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div key={idx} className={`flex w-full ${msg.from === "user" ? "justify-end" : "justify-start"}`} style={{position:'relative'}}>
                    <div className={`relative max-w-[75%] px-4 py-2 rounded-2xl shadow-md ${msg.from === "user" ? "bg-purple-600 text-white ml-8" : "bg-gray-100 text-gray-700 mr-8"}`}
                      style={{zIndex:2}}>
                      {msg.text}
                    </div>
                    {/* Dot on the path */}
                    {/* <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full border-2 border-white z-20" /> */}
                  </div>
                )
              )}
              {/* Quick Reply Buttons as a bot message bubble, always after the last bot reply */}
              <div className="flex w-full justify-start">
                <div className="relative max-w-[75%] px-4 py-2 rounded-2xl shadow-md bg-gray-100 text-gray-700 mr-8 flex flex-wrap gap-2">
                  {QUICK_REPLIES.map((qr, idx) => (
                    <button
                      key={idx}
                      className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold px-4 py-2 rounded-full shadow-sm transition border border-purple-200 mb-1"
                      onClick={() => sendMessage(qr.message)}
                    >
                      {qr.label}
                    </button>
                  ))}
                </div>
              </div>
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
            <input
              className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
            />
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition">Send</button>
          </form>
        </div>
      )}
    </>
  );
} 