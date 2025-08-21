import React, { useState } from "react";
import { X } from "lucide-react";

const availableLibraries = [
  "Tailwind CSS",
  "Bootstrap",
  "ShadCN",
  "Material UI",
  "Chakra UI",
  "Ant Design",
  "Bulma",
  "Foundation",
];

function AddLibraries({ libraries, setLibraries }) {
  const [newLibrary, setNewLibrary] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAddLibrary = (lib = null) => {
    const libToAdd = lib || newLibrary.trim();
    if (libToAdd !== "" && !libraries.includes(libToAdd)) {
      setLibraries([...libraries, libToAdd]);
      setNewLibrary("");
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewLibrary(value);

    if (value.trim() === "") {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const suggestions = availableLibraries.filter((lib) =>
      lib.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(suggestions);
    setShowSuggestions(suggestions.length > 0);
  };

  const removeLib = (lib) => {
    setLibraries(libraries.filter((l) => l !== lib));
  };

  return (
    <div className="rounded-lg border border-[var(--border-color)]">
      {/* Header */}
      <div className="border-b border-[var(--border-color)] bg-[#111] flex items-center justify-between">
        <h2 className="text-[length:var(--text-base)] font-semibold px-4 py-2">
          Add Libraries
        </h2>
      </div>

      {/* Body */}
      <div className="px-4 py-3 relative">
        {/* Selected Libraries */}
        <div className="flex flex-wrap gap-2 mb-4">
          {libraries.map((lib, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full text-xs"
            >
              <span>{lib}</span>
              <button
                onClick={() => removeLib(lib)}
                className="hover:text-red-400 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Input + Add Button */}
        <div className="flex flex-col gap-1 relative">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newLibrary}
              onChange={handleInputChange}
              placeholder="Library Name e.g. Tailwindcss"
              className="flex-1 px-3 py-2 rounded bg-black border border-[var(--border-color)] text-xs text-white placeholder-gray-500"
            />
            <button
              onClick={() => handleAddLibrary()}
              className="bg-[var(--primary-color)] hover:bg-blue-600 text-white text-xs font-medium px-4 py-2 rounded transition-colors"
            >
              Add
            </button>
          </div>

          {/* Dropdown Suggestions */}
          {showSuggestions && (
            <ul className="absolute top-full mt-1 w-full bg-black border border-[var(--border-color)] rounded-md max-h-40 overflow-y-auto text-xs z-10">
              {filteredSuggestions.map((sug, index) => (
                <li
                  key={index}
                  onClick={() => handleAddLibrary(sug)}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-800"
                >
                  {sug}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddLibraries;
