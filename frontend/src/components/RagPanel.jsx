import React from "react";

const RagPanel = ({ designJSON, setDesignJSON }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(designJSON, null, 2));
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(designJSON, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "design.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="bg-[#181a1b] border border-[#232428] rounded-2xl p-6 shadow-lg">
      <h2 className="text-base font-semibold mb-4 text-white flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-[#1c9cf0] rounded-full"></span>
        JSON Profile
      </h2>
      <pre className="bg-[#101113] text-[#e0e0e0] rounded-lg p-4 text-sm overflow-x-auto mb-4 border border-[#232428]">
        {JSON.stringify(designJSON, null, 2)}
      </pre>
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg bg-[#1c9cf0] text-white font-semibold hover:bg-[#187dc2] transition"
        >
          Copy
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded-lg bg-[#1c9cf0] text-white font-semibold hover:bg-[#187dc2] transition"
        >
          Download
        </button>
      </div>
    </section>
  );
};

export default RagPanel;
