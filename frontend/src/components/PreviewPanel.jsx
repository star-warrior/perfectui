import React from "react";

const PreviewPanel = ({ palette }) => {
  // Use the palette to style a sample preview
  const colors =
    palette && palette.length
      ? palette.map((c) => `rgb(${c.join(",")})`)
      : ["#1c9cf0", "#f0f3f4", "#0c0d0f", "#131416", "#2c2e30", "#e0e0e0"];

  return (
    <section className="bg-[#181a1b] border border-[#232428] rounded-2xl p-6 shadow-lg">
      <h2 className="text-base font-semibold mb-4 text-white flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-[#1c9cf0] rounded-full"></span>
        Preview
      </h2>
      <div
        className="p-6 rounded-2xl mt-2 shadow"
        style={{
          background: colors[2],
          color: colors[5],
          border: `1px solid ${colors[4]}`,
        }}
      >
        <h3
          className="text-2xl font-bold mb-2 tracking-tight"
          style={{ color: colors[0] }}
        >
          Perfectto UI
        </h3>
        <p className="mb-4 text-base" style={{ color: colors[5] }}>
          This is a live preview using your color palette.
        </p>
        <button
          className="mt-4 px-5 py-2 rounded-lg font-semibold transition border"
          style={{
            background: colors[0],
            color: colors[1],
            border: `1px solid ${colors[4]}`,
          }}
        >
          Primary Button
        </button>
      </div>
    </section>
  );
};

export default PreviewPanel;
