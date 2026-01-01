import React, { useState } from "react";
import { loadLocations, saveLocations } from "./utils/dataStore";

export default function AdminLocations() {
  const [locations, setLocations] = useState(loadLocations());
  const [form, setForm] = useState({
    eventCode: "",
    lat: "",
    lng: ""
  });

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function addLocation() {
    const updated = {
      ...locations,
      [form.eventCode]: {
        lat: Number(form.lat),
        lng: Number(form.lng)
      }
    };

    setLocations(updated);
    saveLocations(updated);

    setForm({ eventCode: "", lat: "", lng: "" });
  }

  function deleteLocation(eventCode) {
    const updated = { ...locations };
    delete updated[eventCode];
    setLocations(updated);
    saveLocations(updated);
  }

  return (
    <div className="admin-page">
      <h1>Admin: parkrun Locations</h1>

      <h2>Add / Update Location</h2>
      <div className="admin-form">
        <input
          name="eventCode"
          placeholder="Event Code"
          value={form.eventCode}
          onChange={updateField}
        />
        <input
          name="lat"
          placeholder="Latitude"
          value={form.lat}
          onChange={updateField}
        />
        <input
          name="lng"
          placeholder="Longitude"
          value={form.lng}
          onChange={updateField}
        />
        <button onClick={addLocation}>Save</button>
      </div>

      <h2>Existing Locations</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Event Code</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(locations).map(([eventCode, loc]) => (
            <tr key={eventCode}>
              <td>{eventCode}</td>
              <td>{loc.lat}</td>
              <td>{loc.lng}</td>
              <td>
                <button onClick={() => deleteLocation(eventCode)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}