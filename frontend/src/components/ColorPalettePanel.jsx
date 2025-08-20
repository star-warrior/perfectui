import React, { useState } from "react";
// Assume ColorThief is available globally or imported

const ColorPalettePanel = ({ photos, palette, setPalette }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const generatePalette = () => {
    if (selectedIdx === null || !photos[selectedIdx]) return;
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = URL.createObjectURL(photos[selectedIdx]);
    img.onload = () => {
      const colorThief = new window.ColorThief();
      const colors = colorThief.getPalette(img, 6);
      setPalette(colors);
    };
  };

  return (
    <section className="bg-[#181a1b] border border-[#232428] rounded-2xl p-5 shadow-lg">
      <h2 className="text-base font-semibold mb-4 text-white flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-[#1c9cf0] rounded-full"></span>
        Color Palette
      </h2>
      <div className="flex gap-2 mb-3">
        <select
          value={selectedIdx ?? ""}
          onChange={(e) => setSelectedIdx(Number(e.target.value))}
          className="px-3 py-2 rounded-lg border border-[#232428] bg-[#101113] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#1c9cf0]"
        >
          <option value="" disabled>
            Select a photo
          </option>
          {photos.map((photo, idx) => (
            <option key={idx} value={idx}>{`Photo ${idx + 1}`}</option>
          ))}
        </select>
        <button
          onClick={generatePalette}
          disabled={selectedIdx === null}
          className="px-4 py-2 rounded-lg bg-[#1c9cf0] text-white font-semibold disabled:opacity-50 hover:bg-[#187dc2] transition"
        >
          Generate Palette
        </button>
      </div>
      <div className="flex gap-3 mt-2">
        {palette &&
          palette.map((color, idx) => (
            <div
              key={idx}
              className="w-10 h-10 rounded-lg border border-[#232428]"
              style={{ background: `rgb(${color.join(",")})` }}
            />
          ))}
      </div>
    </section>
  );
};

export default ColorPalettePanel;
