import React, { useState, useRef } from "react";
import axios from "axios";

function ImageUpload() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  function handleFileChange(event) {
    setFiles((prev) => [...prev, ...Array.from(event.target.files)]);
    // event.target.value = ""; // Reset input value});
    console.log(files);
  }

  function handleSubmit(e) {
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
      axios
        .post("/api/image/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Files uploaded successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error uploading files:", error);
        });
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
    }

    console.log("Submitting files:", formData);
  }

  const [preference, setPreference] = useState([]);

  const handlePreference = (event) => {
    const { name, id } = event.target;

    if (preference.includes(id)) {
      setPreference((prev) => prev.filter((pref) => pref != id));
    } else {
      setPreference((prev) => [...prev, id]);
    }

    console.log(preference);
  };

  const Preferences = () => {
    return (
      <div>
        <h2>Preferences Component</h2>
        <p>Customize your image upload experience.</p>

        <div className="buttonBox flex gap-5">
          <div className="radioButton flex gap-0.5">
            <label htmlFor="tailwindcss">Tailwindcss</label>
            <input
              type="checkbox"
              name="framework"
              id="tailwindcss"
              value="tailwindcss"
              checked={preference.includes("tailwindcss")}
              onChange={handlePreference}
            />
          </div>
          <div className="radioButton flex gap-0.5">
            <label htmlFor="shadecn">shadecn</label>
            <input
              type="checkbox"
              name="framework"
              id="shadecn"
              value="shadecn"
              checked={preference.includes("shadecn")}
              onChange={handlePreference}
            />
          </div>
        </div>
        <div className="mt-2 text-gray-600 text-sm">
          Selected preference: {preference ? preference : "None"}
        </div>
      </div>
    );
  };

  return (
    <>
      {" "}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="flex border-2 border-gray-300 rounded-lg w-[40%] text-white bg-amber-900 flex-col items-center justify-center p-4"
      >
        <input
          ref={fileInputRef}
          id="fileInput"
          type="file"
          accept="image/*"
          className="border border-gray-300 rounded p-2 mb-4 hidden"
          placeholder={`${files.length} files selected`}
        />
      </div>
      <div className="preview flex flex-wrap gap-4"></div>
      {files.length > 0 && (
        <button
          onClick={(e) => handleSubmit(e)}
          className="p-4 rounded bg-red-500 text-white "
        >
          {" "}
          Lets Go
        </button>
      )}
      <Preferences />
    </>
  );
}

export default ImageUpload;
