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
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-[var(--border-color)]"
          : "bg-black/20"
      }`}
    >
      <div className="text-[length:var(--text-base)] font-semibold italic font-heading tracking-tight">
        PerfectUI
      </div>

      <nav className="hidden md:flex space-x-8 text-gray-400 font-body">
        <a
          href="#how-to-use"
          className="hover:text-white transition-colors font-medium tracking-wide"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("how-to-use")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          How to Use
        </a>
        <a
          href="https://github.com/star-warrior/perfectui"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors font-medium tracking-wide"
        >
          Contribute
        </a>
      </nav>

      <div className="flex items-center space-x-4">
        <a
          href="https://github.com/star-warrior/perfectui"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 border border-gray-600 hover:border-gray-400 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Github size={16} className="text-white" />
          <span>Star on Github</span>
          <div className="bg-white text-black px-2 py-0.5 rounded-full text-xs font-bold">
            6.6K
          </div>
        </a>
        {user ? (
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-blue-500 shadow-lg hover:border-blue-400 transition-colors"
            />
            <button
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-2 rounded-full text-white text-sm font-medium font-body transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => {
                window.location.href = "http://localhost:8080/auth/logout";
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() =>
              (window.location.href = "http://localhost:8080/auth/google")
            }
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2 rounded-full text-white font- text-sm transition-all duration-300 font-body tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 border border-blue-500/50 hover:border-blue-400/70"
          >
            <span className="flex items-center space-x-2">
              <span>Sign In</span>
            </span>
          </button>
        )}
      </div>
    </header>
  );
}
