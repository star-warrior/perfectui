import React, { useRef, useState } from "react";

import NavbarTemp from "../components/NavbarTemp";
import { Upload, X } from "lucide-react";
import UploadPictures from "../components/UploadPictures";
import FindColorPalette from "../components/FindColorPalette";
import AddLibraries from "../components/AddLibraries";

export default function TemplatePage() {
  const [libraries, setLibraries] = useState(["Preview"]);
  const [newLibrary, setNewLibrary] = useState("");
  const [activeTab, setActiveTab] = useState("Preview"); // 👈 tab state

  const removeButton = useRef(null);

  const handleAddLibrary = () => {
    if (newLibrary.trim() !== "") {
      setLibraries([...libraries, newLibrary.trim()]);
      setNewLibrary("");
    }
  };

  const removeLib = (lib) => {
    setLibraries(libraries.filter((l) => l !== lib));
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-white font-sans">
      {/* Navbar */}

      <NavbarTemp />

      {/* Main Content */}
      <div className="flex p-4 gap-4">
        {/* Sidebar */}
        <aside className="w-100 space-y-4">
          {/* Add Pictures */}

          <UploadPictures />

          {/* Color Palette */}
          <FindColorPalette />

          {/* Add Libraries */}
          <AddLibraries
            removeButton={removeButton}
            handleAddLibrary={handleAddLibrary}
            removeLib={removeLib}
            libraries={libraries}
            newLibrary={newLibrary}
            setNewLibrary={setNewLibrary}
          />
        </aside>

        {/* Main Preview Section */}
        <main className="flex-1 bg-[#111] border border-gray-800 rounded-lg p-4">
          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-800 mb-4">
            <button
              onClick={() => setActiveTab("Preview")}
              className={`pb-2 text-sm ${
                activeTab === "Preview"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-gray-400"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("JSON")}
              className={`pb-2 text-sm ${
                activeTab === "JSON"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-gray-400"
              }`}
            >
              JSON
            </button>
          </div>

          {/* Content Area */}
          <div className="h-[500px] bg-black rounded-lg relative p-4 text-sm">
            {activeTab === "Preview" ? (
              <div className="text-gray-400">🔍 This is the Preview area.</div>
            ) : (
              <pre className="text-green-400">
                {`{
  "name": "Perfectto UI",
  "version": "1.0.0"
}`}
              </pre>
            )}

            {/* Right icons */}
            <div className="absolute top-2 right-2 flex flex-col gap-3">
              <button className="text-gray-400 hover:text-white">📋</button>
              <button className="text-gray-400 hover:text-white">⬇️</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
