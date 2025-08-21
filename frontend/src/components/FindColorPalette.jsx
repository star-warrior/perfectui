import React, { useState, useRef, useEffect } from "react";
import colorThief from "colorthief";
import { HexColorPicker } from "react-colorful";

function FindColorPalette({ palette, setPalette }) {
  const [image, setImage] = useState(null);

  const [activePicker, setActivePicker] = useState(null);

  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const colorThiefRef = useRef(new colorThief());
  const pickerRefs = useRef({}); // store refs for each picker

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const extractColors = () => {
    if (!colorThiefRef.current || !imageRef.current) return;

    try {
      const paletteRGB = colorThiefRef.current.getPalette(imageRef.current, 3);
      const paletteColors = paletteRGB.map(
        (color) =>
          `#${color.map((x) => x.toString(16).padStart(2, "0")).join("")}`
      );

      setPalette({
        primary: paletteColors[0] || "#000000",
        secondary: paletteColors[1] || "#000000",
        accent: paletteColors[2] || "#000000",
      });
    } catch (error) {
      console.error("Error extracting colors:", error);
    }
  };

  const handleImageLoad = () => {
    setTimeout(extractColors, 100);
  };

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
  };

  // Detect clicks outside picker
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        activePicker &&
        pickerRefs.current[activePicker] &&
        !pickerRefs.current[activePicker].contains(event.target)
      ) {
        setActivePicker(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activePicker]);

  return (
    <div className="rounded-lg border border-[var(--border-color)]">
      {/* Header */}
      <div className="border-b border-[var(--border-color)] bg-[#111] flex items-center justify-between">
        <h2 className="text-[length:var(--text-base)] font-semibold px-4 py-2">
          Color Palette
        </h2>
      </div>

      {/* Body */}
      <div className="px-4">
        {/* Upload Section */}
        <div
          className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-[var(--primary-color)] transition-colors my-4"
          onClick={() => fileInputRef.current?.click()}
        >
          <p className="text-sm text-gray-400">Click to upload an image</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Color Fields */}
        <div className="flex flex-col gap-3 mb-4">
          {["primary", "secondary", "accent"].map((field) => (
            <div key={field} className="flex flex-col gap-1">
              <label className="text-[length:var(--text-sm)] font-semibold text-[var(--muted-text)] capitalize">
                {field} Color
              </label>

              <div
                className="flex items-center gap-4 relative"
                ref={(el) => (pickerRefs.current[field] = el)}
              >
                {/* Preview Swatch */}
                <div
                  className="w-5 h-5 rounded shadow cursor-pointer border border-gray-600"
                  style={{ backgroundColor: palette[field] }}
                  onClick={() =>
                    setActivePicker((prev) => (prev === field ? null : field))
                  }
                  title="Click to edit color"
                ></div>

                {/* Either show hex text OR color picker */}
                {activePicker === field ? (
                  <div className="absolute left-16 z-10">
                    <HexColorPicker
                      color={palette[field]}
                      onChange={(val) =>
                        setPalette((prev) => ({ ...prev, [field]: val }))
                      }
                    />
                  </div>
                ) : (
                  <span
                    className="font-mono text-sm text-gray-300 cursor-pointer"
                    onClick={() => copyToClipboard(palette[field])}
                    title="Click to copy HEX"
                  >
                    {palette[field]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Hidden image for processing */}
        {image && (
          <img
            ref={imageRef}
            src={image}
            alt="Uploaded"
            className="hidden"
            onLoad={handleImageLoad}
            crossOrigin="anonymous"
          />
        )}
      </div>
    </div>
  );
}

export default FindColorPalette;
