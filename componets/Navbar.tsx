import React, { useState, useRef, useEffect } from "react";

// Define the shape of your currentUser object
interface User {
  name: string;
  avatar: string;
}

// Define props type
interface NavbarProps {
  currentUser?: User | null;  // optional or can be null if no user
}

export default function Navbar({ currentUser }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!currentUser) {
    return (
      <nav className="bg-indigo-600 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold select-none">ChatConnect</h1>
        {/* You can show login/signup buttons here if needed */}
      </nav>
    );
  }

  return (
    <nav className="bg-indigo-600 text-white flex justify-between items-center px-6 py-4 shadow-md relative">
      <h1 className="text-2xl font-bold select-none">ChatConnect</h1>
      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        <span className="font-semibold">{currentUser.name}</span>
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-10 h-10 rounded-full border-2 border-white shadow cursor-pointer"
          onClick={() => setDropdownOpen((open) => !open)}
        />

        {dropdownOpen && (
          <div className="absolute right-0 mt-12 w-32 bg-white text-indigo-900 rounded-md shadow-lg overflow-hidden z-10">
            <button
              onClick={() => {
                setDropdownOpen(false);
                // Perform logout action here if needed
                window.location.href = "/";
              }}
              className="block w-full text-left px-4 py-2 hover:bg-indigo-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
