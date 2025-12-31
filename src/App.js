import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MapPage from "./MapPage";
import Admin from "./Admin";
import "./App.css";

export default function App() {
  return (
    <Router>
      <nav className="top-nav">
        <Link to="/">Map</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}