import React from "react";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="relative z-20 bg-black border-t border-gray-800 py-12 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold font-heading text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                PerfectUI
              </span>
            </h3>
            <p className="text-[var(--muted-text)] font-body mb-6 max-w-md">
              Generate custom JSON design systems for consistent UI development
              with AI code editors. Build beautiful interfaces faster than ever.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="https://github.com/star-warrior/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors duration-200"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://twitter.com/JayMehtaLCW"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors duration-200"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://linkedin.com/in/jay-mehta16"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* In App Section */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-4">App</h4>
            <ul className="space-y-3 text-[var(--muted-text)] font-body">
              <li>
                <a
                  href="https://github.com/star-warrior/perfectui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--primary-color)] transition-colors"
                >
                  Contribute
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
  );
}

export default Footer;
