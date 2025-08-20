import React from "react";

function UploadPictures() {
  return (
    <div className=" rounded-lg border border-[var(--border-color)]">
      <div className="border-b border-[var(--border-color)] bg-[#111] flex items-center justify-between">
        {" "}
        <h2 className="text-[length:var(--text-base)] font-semibold px-4 py-2">
          Add Pictures
        </h2>
      </div>

      <div className="px-4 py-2">
        <div className="flex flex-col py-2">
          {" "}
          <span className="text-[length:var(--text-sm)] font-semibold text-[var(--muted-text)] ">
            Preview
          </span>
          <div className="flex gap-3 mb-3 ">
            <div className="w-18 h-18 bg-gray-800 rounded"></div>
            <div className="w-18 h-18 bg-gray-800 rounded"></div>
            <div className="w-18 h-18 bg-gray-800 rounded"></div>
          </div>
        </div>

        <div className="flex items-center gap-4 py-2 font-semibold text-[length:var(--text-sm)]">
          {" "}
          <button className="bg-[var(--primary-color)] hover:bg-blue-600 text-white text-sm px-2 py-2 rounded">
            Add Photos
          </button>
          <p className="text-xs text-gray-400 mt-1">Maximum 3 Photos</p>
        </div>
      </div>
    </div>
  );
}

export default UploadPictures;
