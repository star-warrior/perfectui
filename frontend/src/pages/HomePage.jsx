import React from "react";
import { Check, Heart, Github, Twitter, Linkedin } from "lucide-react";
import NavbarHome from "../components/NavbarHome";
import Orb from "../UI/Orbs";
import HowToUse from "../components/HowToUse";
import Footer from "../components/Footer";

export default function Homepage() {
  function navigateTemplate() {
    window.location.href = "/templates";
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <NavbarHome />

      {/* Hero Section with Background */}
      <div className="relative overflow-hidden">
        {/* Background container with lower z-index */}
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <Orb
            hoverIntensity={0.1}
            rotateOnHover={true}
            hue={30}
            forceHoverState={false}
          />
        </div>

        {/* Main Content with higher z-index */}
        <main className="relative z-10 flex flex-col items-center justify-center px-8 py-20 text-center bg-black/50 min-h-screen">
          <div className="max-w-4xl bg-transparent">
            <h1 className="text-[length:var(--text-6xl)] font-bold mb-8 leading-tight tracking-tight font-heading text-balance">
              Design Your UI
              <br />
              The
              <br />
              <span className="italic font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Perfectto
              </span>
              <br />
              Way
            </h1>

            <p className="text-[var(--muted-text)] text-[length:var(--text-xl)] font-normal mb-8 max-w-2xl mx-auto leading-relaxed tracking-wide font-body">
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
                <span className="text-[var(--muted-text)] text-[length:var(--text-sm)] font-medium tracking-wide font-body">
                  {" "}
                  Works with any tool
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="text-[var(--primary-color)]" />
                <span className="text-[var(--muted-text)] text-[length:var(--text-sm)] font-medium tracking-wide font-body">
                  {" "}
                  Easy to use
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="text-[var(--primary-color)]" />
                <span className="text-[var(--muted-text)] text-[length:var(--text-sm)] font-medium tracking-wide font-body">
                  {" "}
                  Easily customizable
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={() => {
                  navigateTemplate();
                }}
                className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full text-white font-medium tracking-wide font-body shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Start Generating
              </button>
              <button className="border border-gray-600 hover:border-gray-400 px-8 py-3 rounded-full text-white font-medium tracking-wide font-body hover:bg-gray-800/50 transform hover:scale-105 transition-all duration-200">
                How To Do ?
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* How to Use Section */}
      <HowToUse />

      {/* Footer */}
      <Footer />
    </div>
  );
}
