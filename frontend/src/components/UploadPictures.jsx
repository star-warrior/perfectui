import React, { useRef } from "react";
import { X } from "lucide-react";

import "../public/css/horizonatalBar.css"; // Import your CSS file for styles

function UploadPictures({ handleSubmit, files, setFiles, handleFileChange }) {
  const fileInputRef = useRef(null);
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
          <div className="flex gap-3 mb-3 overflow-x-auto whitespace-nowrap">
            {files.length === 0 && (
              <>
                <div className="w-18 h-18 bg-gray-800 rounded shrink-0"></div>
                <div className="w-18 h-18 bg-gray-800 rounded shrink-0"></div>
                <div className="w-18 h-18 bg-gray-800 rounded shrink-0"></div>
              </>
            )}

            {files.map((file, index) => (
              <div
                key={index}
                className="flex border border-[var(--border-color)] bg-gray-300 rounded-sm relative shrink-0"
              >
                <button
                  className="absolute top-2 right-2 bg-white text-black rounded-[50%] p-0.5"
                  onClick={() => {
                    setFiles(files.filter((_, i) => i !== index));
                  }}
                >
                  <X size={16} />
                </button>
                <img
                  className="h-18 w-auto"
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 py-2 font-semibold text-[length:var(--text-sm)]">
          {" "}
          <div className="flex">
            <label
              htmlFor="fileInput"
              className="bg-[var(--primary-color)] hover:bg-blue-600 text-white text-sm px-2 py-2 rounded cursor-pointer"
            >
              Upload
            </label>
            <input
              ref={fileInputRef}
              id="fileInput"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          {files.length > 0 && (
            <button
              onClick={(e) => handleSubmit(e)}
              className="px-2 py-2 rounded cursor-pointer bg-red-500 text-white "
            >
              {" "}
              Lets Go
            </button>
          )}
          <p className="text-xs text-gray-400 mt-1">Maximum 3 Photos</p>
        </div>
      </div>
    </div>
  );
}

export default UploadPictures;
