import initialEvents from "../data/events.json";

const EVENTS_KEY = "parkrunEventsData";

export function loadEvents() {
  const stored = localStorage.getItem(EVENTS_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(initialEvents));
  return initialEvents;
}

export function saveEvents(events) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}
