import myParkruns from '../data/myParkruns.json';
import parkrunLocations from '../data/parkrunLocations.json';

const RUNS_KEY = "myParkrunsData";
const LOCS_KEY = "parkrunLocationsData";

export function loadRuns() {
  const stored = localStorage.getItem(RUNS_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(RUNS_KEY, JSON.stringify(myParkruns));
  return myParkruns;
}

export function saveRuns(data) {
  localStorage.setItem(RUNS_KEY, JSON.stringify(data));
}

export function loadLocations() {
  const stored = localStorage.getItem(LOCS_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(LOCS_KEY, JSON.stringify(parkrunLocations));
  return parkrunLocations;
}

export function saveLocations(data) {
  localStorage.setItem(LOCS_KEY, JSON.stringify(data));
}