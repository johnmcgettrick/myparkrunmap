import initialData from "../data/events.json";

const EVENTS_KEY = "parkrunEventsData";
const VERSION_KEY = "parkrunEventsVersion";

export function loadEvents() {
  const storedEvents = localStorage.getItem(EVENTS_KEY);
  const storedVersion = Number(localStorage.getItem(VERSION_KEY));

  const jsonVersion = initialData.version;
  const jsonEvents = initialData.events;

  // If no stored data → load JSON and save it
  if (!storedEvents) {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(jsonEvents));
    localStorage.setItem(VERSION_KEY, jsonVersion);
    return jsonEvents;
  }

  // If JSON version is newer → overwrite localStorage
  if (jsonVersion > storedVersion) {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(jsonEvents));
    localStorage.setItem(VERSION_KEY, jsonVersion);
    return jsonEvents;
  }

  // Otherwise → load from localStorage
  return JSON.parse(storedEvents);
}

export function saveEvents(events) {
  const storedVersion = Number(localStorage.getItem(VERSION_KEY)) || 1;

  // Save events but keep version the same
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  localStorage.setItem(VERSION_KEY, storedVersion);
}