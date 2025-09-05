import { Github } from "lucide-react";
import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";

function NavbarTemp() {
  const { user } = useUser();

  useEffect(() => {
    console.log("NavbarTemp user:", user);
  }, [user]);

  return (
    <nav className="flex justify-between items-center px-6 py-3 border-b border-[var(--border-color)] bg-black/95 backdrop-blur-sm">
      <h1 className="italic font-semibold text-[length:var(--text-base)] font-heading tracking-tight">
        Perfectto UI
      </h1>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/star-warrior/perfectui"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white border border-gray-600 hover:border-gray-400 px-3 py-1.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <Github size={16} className="text-white" />
          <span>Star on Github</span>
        </a>
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-blue-500 shadow-md hover:border-blue-400 transition-colors"
            />
            <button
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-3 py-1.5 rounded-full text-white text-xs font-medium font-body transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
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
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2 rounded-full text-white text-sm font-medium font-body transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-blue-500/50 hover:border-blue-400/70"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Sign in with Google</span>
            </span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavbarTemp;
