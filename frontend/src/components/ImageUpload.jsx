import React, { useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [files, setFiles] = useState([]);

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
      <div className="flex flex-col items-center justify-center p-4">
        <label htmlFor="fileInput">Upload Files Here </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="border border-gray-300 rounded p-2 mb-4 hidden"
          multiple
          onChange={handleFileChange}
          placeholder={`${files.length} files selected`}
        />
      </div>
      <div className="preview flex flex-wrap gap-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex flex-col p-4 bg-gray-300 rounded-sm relative"
          >
            <button
              className="absolute top-2 right-2 bg-white text-black rounded-[50%] p-1"
              onClick={() => {
                setFiles(files.filter((_, i) => i !== index));
              }}
            >
              X
            </button>
            <img
              className="w-50"
              src={URL.createObjectURL(file)}
              alt={file.name}
            />
          </div>
        ))}
      </div>
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
