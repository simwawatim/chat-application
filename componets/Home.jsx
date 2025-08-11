import React, { useState, useEffect, useRef } from "react";

export default function Home({ activeUser }) {
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: activeUser?.name || "",
      text: "Welcome to chat!",
      timestamp: new Date(),
    },
  ]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim() || !activeUser) return;

    setMessages((msgs) => [
      ...msgs,
      { sender: "Alice", text: message.trim(), timestamp: new Date() },
      {
        sender: activeUser.name,
        text: `Reply from ${activeUser.name} to "${message.trim()}"`,
        timestamp: new Date(),
      },
    ]);
    setMessage("");
  };

  return (
    <main className="flex flex-col flex-1 h-full bg-indigo-50">
      <header className="flex items-center gap-4 border-b border-indigo-300 p-4 bg-white shadow-sm">
        {activeUser ? (
          <>
            <img
              src={activeUser.avatar}
              alt={activeUser.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <h2 className="text-xl font-semibold text-indigo-700">{activeUser.name}</h2>
          </>
        ) : (
          <p className="text-indigo-400 select-none italic font-light text-lg">
            Select a user to start chatting
          </p>
        )}
      </header>

      <section className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100">
        {activeUser ? (
          messages.length > 0 ? (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "Alice" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md p-4 rounded-xl whitespace-pre-wrap break-words shadow-sm ${
                    msg.sender === "Alice"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-indigo-900"
                  }`}
                >
                  {msg.text}
                  <div className="text-xs mt-1 text-indigo-200 text-right select-none">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-indigo-400 mt-12 select-none italic font-light text-lg">
              No messages yet
            </p>
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-indigo-400 select-none italic font-light text-2xl animate-pulse">
            {/* You can replace this div with any animation or component */}
            <p>Start chatting by selecting a user!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </section>

      <form
        onSubmit={handleSend}
        className="flex items-center p-4 bg-white border-t border-indigo-300 gap-3"
      >
        <textarea
          className="flex-1 resize-none rounded-2xl border border-indigo-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-900 placeholder-indigo-400 transition"
          rows={3}
          placeholder={activeUser ? "Type a message..." : "Select a user to start chatting"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!activeUser}
        />
        <button
          type="submit"
          disabled={!activeUser || !message.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-3 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow"
        >
          Send
        </button>
      </form>
    </main>
  );
}
