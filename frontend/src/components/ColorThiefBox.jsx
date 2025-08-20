import React, { useState, useRef, useEffect } from "react";
import colorThief from "colorthief"; // Ensure you have color-thief-react installed

const ColorThiefBox = () => {
  const [image, setImage] = useState(null);
  const [palette, setPalette] = useState([]);
  const [dominantColor, setDominantColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const colorThiefRef = useRef(null);

  colorThiefRef.current = new colorThief();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      setPalette([]);
      setDominantColor(null);
    };
    reader.readAsDataURL(file);
  };

  const extractColors = () => {
    if (!colorThiefRef.current || !imageRef.current) return;

    setLoading(true);

    try {
      // Get dominant color
      const dominantRGB = colorThiefRef.current.getColor(imageRef.current);
      const dominantHex = `#${dominantRGB
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")}`;
      setDominantColor({ rgb: dominantRGB, hex: dominantHex });

      // Get color palette
      const paletteRGB = colorThiefRef.current.getPalette(imageRef.current, 8);
      const paletteColors = paletteRGB.map((color) => ({
        rgb: color,
        hex: `#${color.map((x) => x.toString(16).padStart(2, "0")).join("")}`,
      }));

      setPalette(paletteColors);
    } catch (error) {
      console.error("Error extracting colors:", error);
    }

    setLoading(false);
  };

  const handleImageLoad = () => {
    // Small delay to ensure image is fully rendered
    setTimeout(extractColors, 100);
  };

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    // You could add a toast notification here
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Color Palette Extractor
      </h1>

      {/* Upload Section */}
      <div className="mb-6">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <p className="text-lg mb-2">Click to upload an image</p>
          <p className="text-sm text-gray-500">Supports JPG, PNG, GIF, WebP</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Image Preview and Results */}
      {image && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image */}
          <div>
            <img
              ref={imageRef}
              src={image}
              alt="Uploaded"
              className="w-full h-auto rounded-lg shadow-lg"
              onLoad={handleImageLoad}
              crossOrigin="anonymous"
            />
          </div>

          {/* Color Results */}
          <div>
            {loading && (
              <div className="text-center py-8">
                <p>Extracting colors...</p>
              </div>
            )}

            {dominantColor && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Dominant Color</h3>
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-lg shadow-md cursor-pointer"
                    style={{ backgroundColor: dominantColor.hex }}
                    onClick={() => copyToClipboard(dominantColor.hex)}
                    title="Click to copy"
                  ></div>
                  <div>
                    <p className="font-mono text-sm">{dominantColor.hex}</p>
                    <p className="font-mono text-sm text-gray-600">
                      rgb({dominantColor.rgb.join(", ")})
                    </p>
                  </div>
                </div>
              </div>
            )}

            {palette.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Color Palette</h3>
                <div className="grid grid-cols-2 gap-3">
                  {palette.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => copyToClipboard(color.hex)}
                      title="Click to copy"
                    >
                      <div
                        className="w-12 h-12 rounded-lg shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <div>
                        <p className="font-mono text-sm">{color.hex}</p>
                        <p className="font-mono text-xs text-gray-600">
                          rgb({color.rgb.join(", ")})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorThiefBox;
