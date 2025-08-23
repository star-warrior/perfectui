import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Upload, X } from "lucide-react";

import NavbarTemp from "../components/NavbarTemp";
import UploadPictures from "../components/UploadPictures";
import FindColorPalette from "../components/FindColorPalette";
import AddLibraries from "../components/AddLibraries";
import RightPanel from "../components/RightPanel";

export default function TemplatePage() {
  const [libraries, setLibraries] = useState([]);
  const [activeTab, setActiveTab] = useState("Preview"); // 👈 tab state
  const [loading, setLoading] = useState(false); // State to manage loading status

  const [palette, setPalette] = useState({
    "color-bg-primary": "#15202b", // Main background (darkest)
    "color-bg-secondary": "#192734", // Secondary background
    "color-bg-tertiary": "#22303c", // Tertiary background/cards
    "color-text-secondary": "#8899ac", // Muted text
    "color-white": "#ffffff", // Primary text/highlights
    "color-accent": "#22303c", // Accent color
  });

  const [files, setFiles] = useState([]);

  const [md, setMd] = useState(`{
        meaning: "This is a template for the Perfectto UI project.",
        description: "This template includes components for uploading pictures, selecting a color palette, and adding
}`);

  function handleFileChange(event) {
    setFiles((prev) => [...prev, ...Array.from(event.target.files)]);
    // event.target.value = ""; // Reset input value});
    console.log(files);
  }

  useEffect(() => {
    console.log(palette);
  }, [palette]);

  useEffect(() => {
    if (files.length > 3) {
      alert("You can only upload a maximum of 3 files.");
      setFiles(files.slice(0, 3));
      return;
    }
  }, [files]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      // 1. Upload image
      const imageResponse = await axios.post("/api/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Files uploaded successfully:", imageResponse.status);

      // 2. Validate palette
      if (
        !palette["color-bg-primary"] ||
        !palette["color-bg-secondary"] ||
        !palette["color-white"] ||
        palette["color-white"] === "#000000"
      ) {
        console.log("Palette is incomplete, please select all colors.");
      } else {
        // 3. Upload palette
        const paletteResponse = await axios.post("/api/color/upload", palette, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(
          "Color palette uploaded successfully:",
          paletteResponse.data
        );
      }

      // Upload Libraries if any

      if (libraries.length != 0) {
        const uploadLib = await axios.post(
          "/api/libraries/upload",
          JSON.stringify({ libraries }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      // 4. Call GenAI API

      if (imageResponse.status == 200) {
        console.log("Calling GenAI API...");

        setLoading(true); // Set loading to true before making the API call
        const jsonProfile = await axios.get("/api/genAI", {
          withCredentials: true,
        });

        if (jsonProfile.status === 200) {
          setMd(jsonProfile.data.message);

          console.log(jsonProfile.data); // This will show the actual JSON returned from the backend
        }
        setLoading(false); // Set loading to false after the API call is complete
      }
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-white font-sans">
      {/* Navbar */}

      <NavbarTemp />

      {/* Main Content */}
      <div className="flex p-4 gap-4">
        {/* Sidebar */}
        <aside className="w-100 space-y-4 overflow-y-auto">
          {/* Add Pictures */}

          <UploadPictures
            files={files}
            setFiles={setFiles}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
          />

          {/* Color Palette */}
          <FindColorPalette palette={palette} setPalette={setPalette} />

          {/* Add Libraries */}
          <AddLibraries libraries={libraries} setLibraries={setLibraries} />
        </aside>

        {/* Main Preview Section */}
        <RightPanel
          loading={loading}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          md={md}
          palette={palette}
        />
      </div>
    </div>
  );
}
