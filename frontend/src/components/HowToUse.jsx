import React from "react";
import SpotlightCard from "../UI/SpotlightCard";
import { Upload, Palette, Code } from "lucide-react";

function HowToUse() {
  return (
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
              Upload up to 3 design screenshots of your desired UI style. Our AI
              will analyze the visual patterns, layout structures, and design
              elements.
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
  );
}

export default HowToUse;
