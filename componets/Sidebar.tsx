import React, { useState } from "react";
import { User } from "./types";

interface SidebarProps {
  users: User[];
  currentUser: User;
  onSelectUser: (user: User) => void;
  activeUserId?: string | number | null;
}

export default function Sidebar({
  users,
  currentUser,
  onSelectUser,
  activeUserId,
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users
    .filter((u) => u.id !== currentUser.id)
    .filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <aside className="hidden md:flex flex-col bg-white border-r border-gray-300 w-72 max-h-screen">
      {/* Search box */}
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete="off"
        />
      </div>

      {/* User list */}
      <ul className="overflow-y-auto flex-1">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => onSelectUser(user)}
              className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-indigo-100 transition ${
                activeUserId === user.id ? "bg-indigo-200" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white ${
                    user.online ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <span className="font-semibold text-gray-800">{user.name}</span>
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-500 select-none italic">No users found</li>
        )}
      </ul>
    </aside>
  );
}
