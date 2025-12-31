import React, { useState } from "react";
import { loadRuns, saveRuns } from "./utils/dataStore";

export default function Admin() {
  const [runs, setRuns] = useState(loadRuns());
  const [form, setForm] = useState({
    name: "",
    eventCode: "",
    runs: "",
    bestTime: "",
    country: ""
  });

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function addRun() {
    const newEntry = {
      ...form,
      runs: Number(form.runs)
    };

    const updated = [...runs, newEntry];
    setRuns(updated);
    saveRuns(updated);

    setForm({ name: "", eventCode: "", runs: "", bestTime: "", country: "" });
  }

  function deleteRun(eventCode) {
    const updated = runs.filter(r => r.eventCode !== eventCode);
    setRuns(updated);
    saveRuns(updated);
  }

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      <h2>Add New parkrun</h2>
      <div className="admin-form">
        <input name="name" placeholder="Name" value={form.name} onChange={updateField} />
        <input name="eventCode" placeholder="Event Code" value={form.eventCode} onChange={updateField} />
        <input name="runs" placeholder="Runs" value={form.runs} onChange={updateField} />
        <input name="bestTime" placeholder="Best Time" value={form.bestTime} onChange={updateField} />
        <input name="country" placeholder="Country Code" value={form.country} onChange={updateField} />
        <button onClick={addRun}>Add</button>
      </div>

      <h2>Existing parkruns</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Event Code</th>
            <th>Runs</th>
            <th>Best Time</th>
            <th>Country</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {runs.map(r => (
            <tr key={r.eventCode}>
              <td>{r.name}</td>
              <td>{r.eventCode}</td>
              <td>{r.runs}</td>
              <td>{r.bestTime}</td>
              <td>{r.country}</td>
              <td>
                <button onClick={() => deleteRun(r.eventCode)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}