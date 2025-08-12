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
  status?: string; // e.g., "Delivered"
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeUser) return;

    setMessages((msgs) => [
      ...msgs,
      {
        sender: currentUser.name,
        text: message.trim(),
        timestamp: new Date(),
        status: "Delivered",
      },
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
      <StoriesRow
        users={users}
        currentUser={currentUser}
        activeUserId={activeUserId}
        onSelectUser={onSelectUser}
      />

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

      <section
        className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-6 py-4 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100 mb-[80px] pt-[56px] md:pt-0"
      >
        {activeUser ? (
          messages.length > 0 ? (
            messages.map((msg, i) => {
              const isCurrentUser = msg.sender === currentUser.name;
              const user = isCurrentUser ? currentUser : activeUser;

              return (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 mb-4 ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Avatar */}
                  {!isCurrentUser && (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user?.avatar}
                      alt={user?.name}
                    />
                  )}

                  {/* Message container */}
                  <div className="flex flex-col gap-1 w-full max-w-[320px]">
                    {/* Name and time */}
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span
                        className={`text-sm font-semibold ${
                          isCurrentUser ? "text-indigo-700" : "text-gray-900"
                        }`}
                      >
                        {msg.sender}
                      </span>
                      <span className="text-sm font-normal text-gray-500">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Message bubble */}
                    <div
                      className={`flex flex-col leading-6 p-4 border border-gray-200 rounded-e-xl rounded-es-xl ${
                        isCurrentUser
                          ? "bg-indigo-600 text-white border-indigo-600 rounded-bl-xl"
                          : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                      }`}
                    >
                      <p className="text-sm font-normal">{msg.text}</p>
                    </div>

                    {/* Status */}
                    {isCurrentUser && msg.status && (
                      <span className="text-sm font-normal text-gray-500">
                        {msg.status}
                      </span>
                    )}
                  </div>

                  {/* Avatar on right for current user */}
                  {isCurrentUser && (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user?.avatar}
                      alt={user?.name}
                    />
                  )}

                  
                </div>
              );
            })
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
