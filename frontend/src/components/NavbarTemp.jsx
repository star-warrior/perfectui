import { Github } from "lucide-react";
import React from "react";

function NavbarTemp() {
  return (
    <nav className="flex justify-between items-center px-6 py-3 border-b border-[var(--border-color)] ">
      <h1 className=" italic font-semibold text-[length:var(--text-base)]">
        Perfectto UI
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 border px-3 py-1 rounded-full bg-white">
          <span className="text-black text-sm">
            {" "}
            <Github className="text-sm" size={16} />{" "}
          </span>
          <span className="text-black text-sm">6.6K</span>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-full text-white text-sm">
          Sign Up →
        </button>
      </div>
    </nav>
  );
}

export default NavbarTemp;
