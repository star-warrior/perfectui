import React from "react";
import { X } from "lucide-react";

function AddLibraries({
  removeButton,
  handleAddLibrary,
  removeLib,
  libraries,
  newLibrary,
  setNewLibrary,
}) {
  return (
    <div className="rounded-lg border border-[var(--border-color)]">
      {/* Header */}
      <div className="border-b border-[var(--border-color)] bg-[#111] flex items-center justify-between">
        <h2 className="text-[length:var(--text-base)] font-semibold px-4 py-2">
          Add Libraries
        </h2>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
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
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newLibrary}
            onChange={(e) => setNewLibrary(e.target.value)}
            placeholder="Library Name e.g. Tailwindcss"
            className="flex-1 px-3 py-2 rounded bg-black border border-[var(--border-color)] text-xs text-white placeholder-gray-500"
          />
          <button
            onClick={handleAddLibrary}
            className="bg-[var(--primary-color)] hover:bg-blue-600 text-white text-xs font-medium px-4 py-2 rounded transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddLibraries;
