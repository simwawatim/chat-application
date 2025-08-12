import React from "react";
import { User } from "./types";

interface StoriesRowProps {
  users: User[];
  activeUserId?: string | number | null;
  onSelectUser: (user: User) => void;
  currentUser: User;
}

export default function StoriesRow({
  users,
  activeUserId,
  onSelectUser,
  currentUser,
}: StoriesRowProps) {
  const filteredUsers = users.filter((u) => u.id !== currentUser.id);

  return (
    <div className="flex overflow-x-auto gap-4 p-3 border-b border-gray-200 md:hidden bg-white sticky top-0 z-20 shadow-sm">
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          onClick={() => onSelectUser(user)}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className={`w-12 h-8 rounded-xl object-cover border-2 ${
                activeUserId === user.id ? "border-indigo-500" : "border-transparent"
              }`}
            />
            <span
              className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white ${
                user.online ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>
          <span className="text-xs mt-1 truncate max-w-[60px]">{user.name}</span>
        </div>
      ))}
    </div>
  );
}
