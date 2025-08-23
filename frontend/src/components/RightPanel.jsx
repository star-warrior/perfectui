import React from "react";
import { Copy, Download } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import Preview from "./Preview";

function RightPanel({ loading, setActiveTab, activeTab, md, palette }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(md);
      alert("Copied to clipboard!");
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
  };
  return (
    <main className="flex-1 bg-[var(--bg)] border border-[var(--border-color)] rounded-lg">
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
      <div className="max-h-screen overflow-y-auto bg-black rounded-lg relative p-1 text-sm">
        {activeTab === "Preview" ? (
          <Preview palette={palette} />
        ) : loading ? (
          <div className="text-[var(--muted-text)]">Loading...</div>
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
    </main>
  );
}

export default RightPanel;
