import React from "react";

const PhotosPanel = ({ photos, setPhotos }) => {
  const handleAddPhoto = (e) => {
    const files = Array.from(e.target.files);
    setPhotos([...photos, ...files]);
  };

  const removePhoto = (idx) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  return (
    <section className="bg-[#181a1b] border border-[#232428] rounded-2xl p-5 shadow-lg">
      <h2 className="text-base font-semibold mb-4 text-white flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-[#1c9cf0] rounded-full"></span>
        Photos
      </h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleAddPhoto}
        className="mb-3 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1c9cf0] file:text-white hover:file:bg-[#187dc2]"
      />
      <div className="flex flex-wrap gap-3 mt-2">
        {photos.map((photo, idx) => (
          <div key={idx} className="relative">
            <img
              src={URL.createObjectURL(photo)}
              alt={`Photo ${idx + 1}`}
              className="w-14 h-14 rounded-lg border border-[#232428] object-cover"
            />
            <button
              onClick={() => removePhoto(idx)}
              aria-label="Remove"
              className="absolute -top-2 -right-2 bg-[#1c9cf0] text-white rounded-full w-6 h-6 flex items-center justify-center text-base font-bold hover:bg-red-500 shadow"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotosPanel;
