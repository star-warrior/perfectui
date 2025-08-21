import React, { useState, useEffect } from "react";
import { Github, Check } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function NavbarHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 bg-black transition-all duration-300 ${
        isScrolled ? "border-b border-[var(--border-color)]" : ""
      }`}
    >
      <div className="text-[length:var(--text-base)] font-semibold italic">
        Perfectto UI
      </div>

      <nav className="hidden md:flex space-x-8 text-gray-400">
        <a href="#" className="hover:text-white transition-colors">
          Perfectto UI
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Perfectto UI
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Contribute
        </a>
      </nav>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-white text-black px-3 py-1.5 rounded-full text-sm">
          <Github size={16} />
          <span>6.6K</span>
        </div>
        {user ? (
          <div className="flex items-center space-x-2">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-blue-500"
            />
            <button
              className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-white text-xs font-medium"
              onClick={() => {
                window.location.href = "http://localhost:8080/auth/logout";
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <a href="http://localhost:8080/auth/google">
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full text-sm font-medium transition-colors">
              Sign in with Google
            </button>
          </a>
        )}
      </div>
    </header>
  );
}
