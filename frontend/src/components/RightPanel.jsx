import React, { useState } from "react";
import { Copy, Download, X, CheckCircle } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import Preview from "./Preview";
import "../public/css/RightPanel.css";

function RightPanel({ loading, setActiveTab, activeTab, md, palette }) {
  const [showPopup, setShowPopup] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(md);
      setShowPopup(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleDownload = () => {
    const json = JSON.stringify(md, null, 2); // pretty print
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "design.json"; // file name
    link.click();

    URL.revokeObjectURL(url); // cleanup
    setShowPopup(true);
  };
  return (
    <main className="max-h-screen flex-1 bg-[var(--bg)] border border-[var(--border-color)] rounded-lg">
      {/* Tabs */}
      <div className="flex bg-[#111]  gap-4 border-b py-2 px-4 border-[var(--border-color)]">
        <button
          onClick={() => setActiveTab("Preview")}
          className={` px-2  text-[length:var(--text-base)] font-semibold ${
            activeTab === "Preview"
              ? "border-b-2 border-blue-500 text-white"
              : "text-[var(--muted-text)]"
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setActiveTab("JSON")}
          className={` px-2 text-[length:var(--text-base)] font-semibold  ${
            activeTab === "JSON"
              ? "border-b-2 border-blue-500 text-white"
              : "text-[var(--muted-text)] "
          }`}
        >
          JSON
        </button>
      </div>

      {/* Content Area */}
      <div className="max-h-full overflow-y-auto bg-black rounded-lg relative p-1 text-sm">
        {activeTab === "Preview" ? (
          <Preview palette={palette} />
        ) : loading ? (
          <div className="loader w-full text-center "></div>
        ) : (
          <>
            <Highlight theme={themes.synthwave84} code={md} language="json">
              {({ style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  style={style}
                  className="overflow-x-auto max-w-full whitespace-pre-wrap"
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>

            <div className="absolute top-5 right-4 flex flex-col gap-6">
              <Copy onClick={handleCopy} />
              <Download onClick={handleDownload} />
            </div>
          </>
        )}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[var(--bg)] border border-[var(--border-color)] rounded-lg p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-[var(--muted-text)] hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircle className="text-green-500" size={24} />
              <h3 className="text-xl font-semibold text-white font-heading">
                Design System Ready!
              </h3>
            </div>
            
            <div className="space-y-4 text-[var(--muted-text)] font-body">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <p>
                  <strong className="text-white">Copy the code</strong> or add the{" "}
                  <code className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm">
                    design.json
                  </code>{" "}
                  file in your current project
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <p>
                  <strong className="text-white">Add the design.json context</strong> in the prompt in your AI tool, and tell the AI what to do next
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <p>
                  <strong className="text-white">See the magic</strong> ✨
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowPopup(false)}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default RightPanel;
