import React, { useState } from "react";
import { loadEvents, saveEvents } from "./utils/eventsStore";

export default function AdminEvents() {
  const [events, setEvents] = useState(loadEvents());
  const [form, setForm] = useState({
    eventCode: "",
    name: "",
    country: "",
    lat: "",
    lng: "",
    runs: "",
    bestTime: ""
  });

  const [editingCode, setEditingCode] = useState(null);

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function startEdit(ev) {
    setEditingCode(ev.eventCode);
    setForm({
      eventCode: ev.eventCode,
      name: ev.name,
      country: ev.country,
      lat: ev.lat?.toString() ?? "",
      lng: ev.lng?.toString() ?? "",
      runs: ev.runs?.toString() ?? "",
      bestTime: ev.bestTime ?? ""
    });
  }

  function clearForm() {
    setEditingCode(null);
    setForm({
      eventCode: "",
      name: "",
      country: "",
      lat: "",
      lng: "",
      runs: "",
      bestTime: ""
    });
  }

  function saveForm() {
    const parsed = {
      eventCode: form.eventCode.trim(),
      name: form.name.trim(),
      country: form.country.trim(),
      lat: form.lat ? Number(form.lat) : null,
      lng: form.lng ? Number(form.lng) : null,
      runs: form.runs ? Number(form.runs) : 0,
      bestTime: form.bestTime.trim()
    };

    let updated;
    if (editingCode) {
      updated = events.map((ev) =>
        ev.eventCode === editingCode ? parsed : ev
      );
    } else {
      updated = [...events, parsed];
    }

    setEvents(updated);
    saveEvents(updated);
    clearForm();
  }

  function deleteEvent(eventCode) {
    const updated = events.filter((ev) => ev.eventCode !== eventCode);
    setEvents(updated);
    saveEvents(updated);
    if (editingCode === eventCode) clearForm();
  }

  return (
    <div className="admin-page">
      <h1>Admin: Events</h1>

      <h2>{editingCode ? "Edit Event" : "Add New Event"}</h2>
      <div className="admin-form">
        <input
          name="eventCode"
          placeholder="Event Code"
          value={form.eventCode}
          onChange={updateField}
          disabled={!!editingCode}
        />
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={updateField}
        />
        <input
          name="country"
          placeholder="Country Code"
          value={form.country}
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
        <input
          name="runs"
          placeholder="Runs"
          value={form.runs}
          onChange={updateField}
        />
        <input
          name="bestTime"
          placeholder="Best Time"
          value={form.bestTime}
          onChange={updateField}
        />
        <button onClick={saveForm}>
          {editingCode ? "Save Changes" : "Add Event"}
        </button>
        {editingCode && (
          <button onClick={clearForm} style={{ marginLeft: 8 }}>
            Cancel
          </button>
        )}
      </div>

      <h2>Existing Events</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Event Code</th>
            <th>Name</th>
            <th>Country</th>
            <th>Lat</th>
            <th>Lng</th>
            <th>Runs</th>
            <th>Best Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev) => (
            <tr key={ev.eventCode}>
              <td>{ev.eventCode}</td>
              <td>{ev.name}</td>
              <td>{ev.country}</td>
              <td>{ev.lat}</td>
              <td>{ev.lng}</td>
              <td>{ev.runs}</td>
              <td>{ev.bestTime}</td>
              <td>
                <button onClick={() => startEdit(ev)}>Edit</button>{" "}
                <button onClick={() => deleteEvent(ev.eventCode)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}