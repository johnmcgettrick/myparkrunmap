# My parkrun Map

A React web app that displays a map with all the parkruns you've completed.

## Setup

1. Install Node.js (https://nodejs.org/)
2. Extract all files to a folder
3. Open terminal in that folder
4. Run: `npm install`
5. Run: `npm start`
6. Open browser to http://localhost:3000

## Adding Your parkrun Data

Grab your parkrun data from your athlete history page: https://www.parkrun.org.uk/results/athleteresultshistory/?athleteNumber=xxxxxx. You should have a link to this from one of your Parkrun results emails.

Add your parkrun history and location details to `src/data/events.json.tmp` then rename to remove the `.tmp` extension.

## Features

- Interactive map showing all parkruns you've completed
- Markers show event name, number of runs, and last run date
- Statistics display showing total runs and unique events
- Responsive design

## Technologies

- React 18
- Leaflet & React-Leaflet for mapping
- OpenStreetMap tiles
