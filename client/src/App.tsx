import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import "./App.css";
import LayoutWrapper from "./components/LayoutWrapper";
import Contact from "./pages/Contact";
import About from "./pages/About";

function App() {
  return (
    <div className="App max-w-7xl mx-auto">
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </LayoutWrapper>
    </div>
  );
}

export default App;
