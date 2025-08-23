import React, { useState, useRef, useEffect } from "react";
import { extractColors } from "extract-colors";
import { HexColorPicker } from "react-colorful";
import chroma from "chroma-js";

function FindColorPalette({ palette, setPalette }) {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [activePicker, setActivePicker] = useState(null);
  const [roleAssignments, setRoleAssignments] = useState({
    "color-bg-primary": null, // Main background (darkest)
    "color-bg-secondary": null, // Secondary background
    "color-bg-tertiary": null, // Tertiary background/cards
    "color-text-secondary": null, // Muted text
    "color-white": null, // Primary text/highlights
    "color-accent": null, // Accent color
  });
  const [extractedColors, setExtractedColors] = useState([]);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const pickerRefs = useRef({}); // store refs for each picker

  const handleImageUpload = (event) => {
    const file = event.target.files && event.target.files[0];

    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Intelligent role assignment based on UI requirements
  function autoAssignRoles(colors) {
    if (!colors || colors.length === 0) return {};

    // Calculate luminance, saturation, and hue for each color
    const colorStats = colors.map((c) => ({
      hex: c.hex,
      lum: chroma(c.hex).luminance(),
      sat: chroma(c.hex).saturation(),
      hue: chroma(c.hex).hue() || 0,
      temp: chroma(c.hex).temperature(),
    }));

    // Sort by different criteria
    const sortedByLum = [...colorStats].sort((a, b) => a.lum - b.lum);
    const sortedBySat = [...colorStats].sort((a, b) => b.sat - a.sat);

    // Find colors that work well for different UI roles
    const darkestColor = sortedByLum[0]; // For main background
    const secondDarkest = sortedByLum[1] || sortedByLum[0]; // For secondary background
    const lightestColor = sortedByLum[sortedByLum.length - 1]; // For white/highlights
    const mostSaturated = sortedBySat[0]; // For accent

    // Find a color that's not too dark or too light for muted text
    const mutedTextColor =
      colorStats.find((c) => c.lum > 0.3 && c.lum < 0.7 && c.sat < 0.6) ||
      colorStats.find((c) => c.lum > 0.2 && c.lum < 0.8) ||
      sortedByLum[Math.floor(sortedByLum.length / 2)];

    // Create a tertiary background that's between primary and secondary
    let tertiaryBg = colorStats.find(
      (c) =>
        c.lum > darkestColor.lum &&
        c.lum < secondDarkest.lum + 0.1 &&
        c.sat < 0.5
    );
    if (!tertiaryBg) {
      // Generate a slightly lighter version of secondary
      const tertiaryHex = chroma(secondDarkest.hex).brighten(0.5).hex();
      tertiaryBg = { hex: tertiaryHex };
    }

    // Assign roles intelligently
    const roles = {
      "color-bg-primary": darkestColor?.hex || colors[0]?.hex || "#15202b",
      "color-bg-secondary": secondDarkest?.hex || colors[1]?.hex || "#192734",
      "color-bg-tertiary": tertiaryBg?.hex || colors[2]?.hex || "#22303c",
      "color-text-secondary":
        mutedTextColor?.hex || colors[3]?.hex || "#8899ac",
      "color-white": lightestColor?.hex || colors[4]?.hex || "#ffffff",
      "color-accent": mostSaturated?.hex || colors[5]?.hex || "#22303c",
    };

    return roles;
  }

  const extractColorsFromImage = async (imgElem) => {
    if (!imgElem) return;
    try {
      const options = {
        count: 6,
        pixels: 64000,
        colorValidator: (red, green, blue, alpha = 255) => alpha > 250,
        distance: 0.22,
        saturationDistance: 0.2,
        lightnessDistance: 0.2,
        hueDistance: 0.083333333,
      };
      const colors = await extractColors(imgElem, options);
      setExtractedColors(colors);
      // Auto-assign roles
      const roles = autoAssignRoles(colors);
      setRoleAssignments(roles);
      setPalette({ ...roles });
    } catch (error) {
      console.error("Error extracting colors:", error);
    }
  };
  // When user changes a role assignment
  function handleRoleChange(role, hex) {
    const newAssignments = { ...roleAssignments, [role]: hex };
    setRoleAssignments(newAssignments);
    setPalette({ ...newAssignments });
  }

  const handleImageLoad = () => {
    // Pass the image DOM node, not File!
    extractColorsFromImage(imageRef.current);
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
        {/* Color Role Assignment UI */}
        <div className="flex flex-col gap-3 mb-4">
          {Object.keys(roleAssignments).map((role) => (
            <div key={role} className="flex flex-col gap-1">
              <label className="text-[length:var(--text-sm)] font-semibold text-[var(--muted-text)] capitalize">
                {role.replace("color-", "").replace("-", " ")} Color
              </label>
              <div
                className="flex items-center gap-4 relative"
                ref={(el) => (pickerRefs.current[role] = el)}
              >
                {/* Swatch for current role */}
                <div
                  className="w-5 h-5 rounded shadow cursor-pointer border border-gray-600"
                  style={{ backgroundColor: palette[role] }}
                  onClick={() =>
                    setActivePicker((prev) => (prev === role ? null : role))
                  }
                  title="Click to edit color"
                ></div>
                {/* Color picker for manual override */}
                {activePicker === role ? (
                  <div className="absolute left-16 z-10">
                    <HexColorPicker
                      color={palette[role]}
                      onChange={(val) => handleRoleChange(role, val)}
                    />
                  </div>
                ) : (
                  <span
                    className="font-mono text-sm text-gray-300 cursor-pointer"
                    onClick={() => copyToClipboard(palette[role])}
                    title="Click to copy HEX"
                  >
                    {palette[role]}
                  </span>
                )}
                {/* Swatch selector for extracted colors */}
                {extractedColors.length > 0 && (
                  <div className="flex gap-1 ml-2">
                    {extractedColors.map((c, idx) => (
                      <div
                        key={c.hex + idx}
                        className="w-5 h-5 rounded border border-gray-400 cursor-pointer"
                        style={{
                          backgroundColor: c.hex,
                          outline:
                            palette[role] === c.hex
                              ? "2px solid #ffffff"
                              : "none",
                        }}
                        onClick={() => handleRoleChange(role, c.hex)}
                        title={`Assign ${c.hex} to ${role}`}
                      ></div>
                    ))}
                  </div>
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
