import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MapPage from "./MapPage";
import AdminEvents from "./AdminEvents";


import "./App.css";

export default function App() {
  return (
    <Router>
      <nav className="top-nav">
        <Link to="/">Map</Link>
        <Link to="/admin-events">Events Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/admin-events" element={<AdminEvents />} />
      </Routes>
    </Router>
  );
}