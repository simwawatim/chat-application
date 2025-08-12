import React, { useState, useEffect, useRef } from "react";
import StoriesRow from "./StoriesRow";
import { User } from "./types";

interface HomeProps {
  activeUser: User | null;
  users: User[];
  currentUser: User;
  onSelectUser: (user: User) => void;
  activeUserId?: string | number | null;
}

interface Message {
  sender: string;
  text: string;
  timestamp: Date;
}

export default function Home({
  activeUser,
  users,
  currentUser,
  onSelectUser,
  activeUserId,
}: HomeProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeUser) return;

    setMessages((msgs) => [
      ...msgs,
      { sender: currentUser.name, text: message.trim(), timestamp: new Date() },
      {
        sender: activeUser.name,
        text: `Reply from ${activeUser.name} to "${message.trim()}"`,
        timestamp: new Date(),
      },
    ]);
    setMessage("");
  };

  return (
    <main className="flex flex-col flex-1 h-screen bg-indigo-50">
      {/* Mobile stories row */}
      <StoriesRow
        users={users}
        currentUser={currentUser}
        activeUserId={activeUserId}
        onSelectUser={onSelectUser}
      />

      {/* Header (desktop only) */}
      <header className="hidden md:flex items-center gap-4 border-b border-indigo-300 p-4 bg-white shadow-sm">
        {activeUser ? (
          <>
            <img
              src={activeUser.avatar}
              alt={activeUser.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <h2 className="text-xl font-semibold text-indigo-700">
              {activeUser.name}
            </h2>
          </>
        ) : (
          <h2 className="text-xl font-semibold text-indigo-400">Chat</h2>
        )}
      </header>

      {/* Chat Area */}
      <section
  className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-6 py-4 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100 mb-[70px]"
>
  {activeUser ? (
    messages.length > 0 ? (
      messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.sender === currentUser.name ? "justify-end" : "justify-start"
          } w-full`}
        >
          <div
            className={`p-4 rounded-xl whitespace-pre-wrap break-words shadow-sm ${
              msg.sender === currentUser.name
                ? "bg-indigo-600 text-white max-w-full sm:max-w-lg md:max-w-xl"
                : "bg-white text-indigo-900 max-w-full sm:max-w-xs md:max-w-md"
            }`}
            style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
          >
            {msg.text}
            <div
              className={`text-xs mt-1 text-right select-none ${
                msg.sender === currentUser.name ? "text-indigo-300" : "text-indigo-600"
              }`}
            >
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
    <div className="flex items-center justify-center h-full">
      <p className="text-indigo-400 select-none italic font-light text-2xl animate-pulse text-center">
        Select a user to start chatting
      </p>
    </div>
  )}
  <div ref={messagesEndRef} />
</section>


      {/* Input Box */}
      <form
        onSubmit={handleSend}
        className="flex items-center p-3 bg-white border-t border-indigo-300 gap-3 fixed bottom-0 left-0 right-0 z-50"
        style={{ minHeight: 56 }}
      >
        <textarea
          className="flex-1 resize-none rounded-2xl border border-indigo-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-900 placeholder-indigo-400 transition min-w-0"
          rows={1}
          placeholder={
            activeUser ? "Type a message..." : "Select a user to start chatting"
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!activeUser}
        />
        <button
          type="submit"
          disabled={!activeUser || !message.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-5 py-2 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow whitespace-nowrap"
        >
          Send
        </button>
      </form>
    </main>
  );
}
