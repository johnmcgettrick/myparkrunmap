// MapPage.js
import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./App.css";
import { loadEvents } from "./utils/eventsStore";
import { flagMap } from "./flagMap";

// Custom parkrun marker icon
const parkrunIcon = new L.Icon({
  iconUrl:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuNSAwQzUuNiAwIDAgNS42IDAgMTIuNWMwIDguMyAxMi41IDI4LjUgMTIuNSAyOC41UzI1IDIwLjggMjUgMTIuNUMyNSA1LjYgMTkuNCA0IDEyLjUgMHptMCAxOGMtMyAwLTUuNS0yLjUtNS41LTUuNXMyLjUtNS41IDUuNS01LjUgNS41IDIuNSA1LjUgNS41LTIuNSA1LjUtNS41IDUuNXoiIGZpbGw9IiMwMEExQTEiLz48L3N2Zz4=',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const getCountryName = (countryCode) => {
  const names = {
    EN: "England",
    SC: "Scotland",
    WA: "Wales",
    NI: "Northern Ireland",
    DK: "Denmark",
    DE: "Germany",
    AT: "Austria",
    NL: "Netherlands",
    IT: "Italy",
    SE: "Sweden",
    US: "United States",
    PL: "Poland"
  };
  return names[countryCode] || countryCode;
};

export default function MapPage() {
  const events = loadEvents();

  const stats = useMemo(() => {
    const totalRuns = events.reduce((sum, ev) => sum + (ev.runs || 0), 0);
    const uniqueEvents = events.length;

    const countriesVisited = [];
    const seen = new Set();
    events.forEach((ev) => {
      if (!seen.has(ev.country)) {
        seen.add(ev.country);
        countriesVisited.push(ev.country);
      }
    });

    return { totalRuns, uniqueEvents, countriesVisited };
  }, [events]);

  const markers = events.filter((ev) => ev.lat && ev.lng);

  const mapCenter = useMemo(() => {
    if (markers.length === 0) return [54.98, -1.61];
    const avgLat = markers.reduce((sum, m) => sum + m.lat, 0) / markers.length;
    const avgLng = markers.reduce((sum, m) => sum + m.lng, 0) / markers.length;
    return [avgLat, avgLng];
  }, [markers]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          My parkrun Map{" "}
          {stats.countriesVisited.map((code) => (
            <img
              key={code}
              src={flagMap[code]}
              alt={getCountryName(code)}
              title={getCountryName(code)}
              className="country-flag"
            />
          ))}
        </h1>
      </header>

      <div className="stats">
        <div className="stat-item">
          <span className="stat-value">{stats.totalRuns}</span>
          <span className="stat-label">Total parkruns</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{stats.uniqueEvents}</span>
          <span className="stat-label">Different events</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{stats.countriesVisited.length}</span>
          <span className="stat-label">Countries</span>
        </div>
      </div>

      <div className="map-container">
        <MapContainer
          center={mapCenter}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.map((ev) => (
            <Marker
              key={ev.eventCode}
              position={[ev.lat, ev.lng]}
              icon={parkrunIcon}
            >
              <Popup>
                <div style={{ textAlign: "left" }}>
                  <strong>{ev.name}</strong> ({getCountryName(ev.country)})
                  <br />
                  <br />
                  Runs completed: {ev.runs ?? 0}
                  <br />
                  Best time: {ev.bestTime || "—"}
                  <br />
                  <br />
                  <a
                    href={`https://www.parkrun.org.uk/${ev.eventCode}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-button"
                  >
                    View Event
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}