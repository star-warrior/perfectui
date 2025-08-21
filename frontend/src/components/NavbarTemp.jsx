import { Github } from "lucide-react";
import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";

function NavbarTemp() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get("user");
    if (userParam) {
      try {
        setUser(JSON.parse(decodeURIComponent(userParam)));
        window.history.replaceState(null, "", window.location.pathname);
      } catch {
        console.error("Failed to parse user data from URL", userParam);
        setUser(null);
      }
    }
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 py-3 border-b border-[var(--border-color)] ">
      <h1 className=" italic font-semibold text-[length:var(--text-base)]">
        Perfectto UI
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 border px-3 py-1 rounded-full bg-white">
          <span className="text-black text-sm">
            <Github className="text-sm" size={16} />
          </span>
          <span className="text-black text-sm">6.6K</span>
        </div>
        {user ? (
          <div className="flex items-center gap-2">
            <img
              src={user.photos?.[0]?.value}
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
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-full text-white text-sm">
              Sign in with Google
            </button>
          </a>
        )}
      </div>
    </nav>
  );
}

export default NavbarTemp;
