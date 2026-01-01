import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MapPage from "./MapPage";
import Admin from "./Admin";
import AdminLocations from "./AdminLocations";

import "./App.css";

export default function App() {
  return (
    <Router>
      <nav className="top-nav">
        <Link to="/">Map</Link>
        <Link to="/admin">Runs Admin</Link>
        <Link to="/admin-locations">Locations Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-locations" element={<AdminLocations />} />
      </Routes>
    </Router>
  );
}