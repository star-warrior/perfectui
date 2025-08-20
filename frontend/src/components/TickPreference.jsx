import React, { useState } from "react";
import { X, StepForward } from "lucide-react"; // Ensure you have lucide-react installed

function TickPreference() {
  const [currentPref, setCurrentPref] = useState();
  const [selection, setSelection] = useState([]);

  function removeItem(item) {
    setSelection((prev) => prev.filter((pref) => pref !== item));
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-semibold mb-4">Tick Preference</h2>
      <p className="text-gray-600 mb-2">Select your preferred options below:</p>

      <div className=" show-current-pref flex flex-col gap-2 mb-4">
        {selection.map((item, index) => (
          <div
            key={index}
            className="pref flex gap-2 text-md text-blue-700 bg-blue-400 rounded-xl px-2 py-1"
          >
            <span className="content leading-relaxed"> {item} </span>
            <X onClick={() => removeItem(item)} className="text-black " />
          </div>
        ))}
      </div>
      <div className="inputBox h-10 relative mb-4">
        <input
          value={currentPref}
          onChange={(e) => {
            setCurrentPref(e.target.value);
          }}
          type="text"
          name="preference"
          id="setPref"
          className="border border-gray-300 rounded-lg w-full px-4 py-2"
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center "
          onClick={() => {
            setSelection((prev) => [...prev, currentPref]);
            setCurrentPref("");
          }}
        >
          <StepForward />
        </button>
      </div>
    </div>
  );
}

export default TickPreference;
