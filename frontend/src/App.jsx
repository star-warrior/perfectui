import "./App.css";

// import PerfecttoUI from "./pages/PerfecttoUI";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Homepage from "./pages/HomePage";
import TemplatePage from "./pages/TemplatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/templates" element={<TemplatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
