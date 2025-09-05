import React from "react";
import {
  Check,
  Upload,
  Palette,
  Code,
  Heart,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import NavbarHome from "../components/NavbarHome";
import Orb from "../UI/Orbs";
import SpotlightCard from "../UI/SpotlightCard";

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
      <section
        id="how-to-use"
        className="relative z-20 bg-gray-900/90 backdrop-blur-sm py-20 px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4 text-white">
              How to Use PerfectUI
            </h2>
            <p className="text-[var(--muted-text)] text-lg font-body max-w-2xl mx-auto">
              Generate your custom design system in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}

            <SpotlightCard
              className="custom-spotlight-card hover:scale-105 hover:border-[var(--primary-color)] transition-all transform duration-300 ease-in-out "
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <div className="w-16 h-16 bg-[var(--primary-color)] rounded-full flex items-center justify-center mb-6 mx-auto">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold font-heading text-white mb-4 text-center">
                1. Upload Screenshots
              </h3>
              <p className="text-[var(--muted-text)] font-body text-center leading-relaxed">
                Upload up to 3 design screenshots of your desired UI style. Our
                AI will analyze the visual patterns, layout structures, and
                design elements.
              </p>
            </SpotlightCard>

            {/* Step 2 */}

            <SpotlightCard
              className="custom-spotlight-card hover:scale-105 hover:border-[var(--primary-color)] transition-transform duration-300 ease-in-out "
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <div className="w-16 h-16 bg-[var(--primary-color)] rounded-full flex items-center justify-center mb-6 mx-auto">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold font-heading text-white mb-4 text-center">
                2. Choose Colors & Libraries
              </h3>
              <p className="text-[var(--muted-text)] font-body text-center leading-relaxed">
                Extract colors from your images or manually select your palette.
                Choose your preferred libraries like React, Tailwind CSS, and
                more.
              </p>
            </SpotlightCard>

            {/* Step 3 */}

            <SpotlightCard
              className="custom-spotlight-card hover:scale-105 hover:border-[var(--primary-color)] transition-transform duration-300 ease-in-out "
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <div className="w-16 h-16 bg-[var(--primary-color)] rounded-full flex items-center justify-center mb-6 mx-auto">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold font-heading text-white mb-4 text-center">
                3. Generate JSON Profile
              </h3>
              <p className="text-[var(--muted-text)] font-body text-center leading-relaxed">
                Get a comprehensive JSON design system that you can use with AI
                code editors like Cursor for consistent UI generation.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-black border-t border-gray-800 py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold font-heading text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  PerfectUI
                </span>
              </h3>
              <p className="text-[var(--muted-text)] font-body mb-6 max-w-md">
                Generate custom JSON design systems for consistent UI
                development with AI code editors. Build beautiful interfaces
                faster than ever.
              </p>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a
                  href="https://github.com/star-warrior/perfectui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors duration-200"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors duration-200"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white font-semibold font-heading mb-4">
                Product
              </h4>
              <ul className="space-y-2 text-[var(--muted-text)] font-body">
                <li>
                  <a
                    href="/templates"
                    className="hover:text-[var(--primary-color)] transition-colors"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--primary-color)] transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--primary-color)] transition-colors"
                  >
                    Examples
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--primary-color)] transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-white font-semibold font-heading mb-4">
                Support
              </h4>
              <ul className="space-y-2 text-[var(--muted-text)] font-body">
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--primary-color)] transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--primary-color)] transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--primary-color)] transition-colors"
                  >
                    Bug Reports
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--primary-color)] transition-colors"
                  >
                    Feature Requests
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-[var(--muted-text)] font-body text-sm">
              © 2025 PerfectUI. All rights reserved.
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <div className="text-[var(--muted-text)] font-body flex items-center">
                Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> by
                <span className="text-white font-medium ml-1">Jay Mehta</span>
              </div>
              <div className="text-[var(--muted-text)] font-body">
                Inspired by{" "}
                <span className="text-[var(--primary-color)] font-medium">
                  TweakCN
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
