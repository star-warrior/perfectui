import React from "react";
import { Check } from "lucide-react";
import NavbarHome from "../components/NavbarHome";

export default function Homepage() {
  function navigateTemplate() {
    window.location.href = "/templates";
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarHome />

      {/* Main Content */}
      <main className="flex mt-5 flex-col items-center justify-center px-8 py-20 text-center">
        <div className="max-w-4xl">
          <h1 className="text-[length:var(--text-6xl)] font-bold mb-8 leading-18">
            Design Your UI
            <br />
            The
            <br />
            <span className="text-blue-400 italic">Perfectto</span>
            <br />
            Way
          </h1>

          <p className="text-[var(--muted-text)] text-[length:var(--text-xl)] font-semibold mb-8 max-w-2xl mx-auto leading-relaxed">
            Generate custom JSON profile for your AI Code Editor
            <br />
            to get consistent UI across board. Customize Colors, libraries and
            <br />
            build the best UI.
          </p>

          {/* Features */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12 mb-12 text-green-400">
            <div className="flex items-center space-x-2">
              <Check className="text-[var(--primary-color)]" />
              <span className="text-[var(--muted-text)] text-[length:var(--text-sm)] font-medium">
                {" "}
                Works with any tool
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="text-[var(--primary-color)]" />
              <span className="text-[var(--muted-text)] text-[length:var(--text-sm)] font-medium">
                {" "}
                Works with any tool
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="text-[var(--primary-color)]" />
              <span className="text-[var(--muted-text)] text-[length:var(--text-sm)] font-medium">
                {" "}
                Works with any tool
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => {
                navigateTemplate();
              }}
              className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full text-white font-medium transition-colors"
            >
              Start Generating
            </button>
            <button className="border border-gray-600 hover:border-gray-400 px-8 py-3 rounded-full text-white font-medium transition-colors">
              How To Do ?
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
