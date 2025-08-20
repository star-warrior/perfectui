import React, { useState } from "react";

const LibrariesPanel = ({ libraries, setLibraries }) => {
  const [input, setInput] = useState("");

  const addLibrary = () => {
    if (input.trim() && !libraries.includes(input.trim())) {
      setLibraries([...libraries, input.trim()]);
      setInput("");
    }
  };

  const removeLibrary = (lib) => {
    setLibraries(libraries.filter((l) => l !== lib));
  };

  return (
    <section className="bg-[#181a1b] border border-[#232428] rounded-2xl p-5 shadow-lg">
      <h2 className="text-base font-semibold mb-4 text-white flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-[#1c9cf0] rounded-full"></span>
        Libraries
      </h2>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add library name..."
          className="flex-1 px-3 py-2 rounded-lg border border-[#232428] bg-[#101113] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#1c9cf0]"
        />
        <button
          onClick={addLibrary}
          className="px-4 py-2 rounded-lg bg-[#1c9cf0] text-white font-semibold hover:bg-[#187dc2] transition"
        >
          Add
        </button>
      </div>
      <ul className="list-none p-0 space-y-2">
        {libraries.map((lib) => (
          <li
            key={lib}
            className="flex justify-between items-center bg-[#101113] rounded-lg px-3 py-2"
          >
            <span className="text-sm text-[#e0e0e0]">{lib}</span>
            <button
              onClick={() => removeLibrary(lib)}
              aria-label="Remove"
              className="ml-2 text-[#1c9cf0] hover:text-red-500 font-bold text-lg"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LibrariesPanel;
