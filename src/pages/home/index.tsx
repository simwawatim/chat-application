import React, { useState } from "react";
import Navbar from "../../../componets/Navbar";
import Sidebar from "../../../componets/Sidebar";
import Home from "../../../componets/Home";
import { User } from "../../../componets/types";

const users: User[] = [
  { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/150?u=alice", online: true },
  { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/150?u=bob", online: false },
  { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/150?u=charlie", online: true },
  { id: 4, name: "Diana", avatar: "https://i.pravatar.cc/150?u=diana", online: true },
  { id: 5, name: "Ethan", avatar: "https://i.pravatar.cc/150?u=ethan", online: false },
  { id: 6, name: "Fiona", avatar: "https://i.pravatar.cc/150?u=fiona", online: true },
  { id: 7, name: "George", avatar: "https://i.pravatar.cc/150?u=george", online: false },
  { id: 8, name: "Hannah", avatar: "https://i.pravatar.cc/150?u=hannah", online: true },
  { id: 9, name: "Ian", avatar: "https://i.pravatar.cc/150?u=ian", online: false },
  { id: 10, name: "Julia", avatar: "https://i.pravatar.cc/150?u=julia", online: true },
  { id: 11, name: "Kevin", avatar: "https://i.pravatar.cc/150?u=kevin", online: false },
  { id: 12, name: "Lily", avatar: "https://i.pravatar.cc/150?u=lily", online: true },
];

export default function App() {
  const currentUser = users[0];
  const [activeUser, setActiveUser] = useState<User | null>(null);

  return (
    <div className="flex flex-col h-screen bg-indigo-50 font-sans">
      <Navbar currentUser={currentUser} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          users={users}
          currentUser={currentUser}
          onSelectUser={setActiveUser}
          activeUserId={activeUser?.id}
        />
        <Home
          activeUser={activeUser}
          users={users}
          currentUser={currentUser}
          onSelectUser={setActiveUser}
          activeUserId={activeUser?.id}
        />
      </div>
    </div>
  );
}
