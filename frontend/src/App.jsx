import { useState } from "react";
import "./App.css";

import ImageUpload from "./components/ImageUpload";
import RallyPlayUI from "./pages/SportsApp";

function App() {
  return (
    <>
      <h1 className="text-3xl text-red-400 font-bold leading-relaxed text-center">
        PerfectUI{" "}
      </h1>
      <ImageUpload />
      <RallyPlayUI />
    </>
  );
}

export default App;
