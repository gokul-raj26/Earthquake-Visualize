# Earthquake Visualizer

A real-time interactive web application that visualizes earthquake activity around the world using data from the USGS Earthquake Hazards Program.

![Earthquake Visualizer](https://images.pexels.com/photos/87009/earth-soil-creep-moon-lunar-surface-87009.jpeg?auto=compress&cs=tinysrgb&w=1200)

## Overview

This application displays recent earthquake activity from the past 24 hours on an interactive map. Users can explore earthquake data, filter by magnitude, and get detailed information about each seismic event.

## Features

### Core Features
- **Interactive Map**: Visualize earthquakes on a world map with real-time data
- **Color-Coded Markers**: Earthquakes are color-coded by magnitude:
  - 🟢 Green: Minor earthquakes (< 3.0 magnitude)
  - 🟠 Orange: Moderate earthquakes (3.0 - 5.0 magnitude)
  - 🔴 Red: Major earthquakes (> 5.0 magnitude)
- **Detailed Information**: Click any earthquake marker to view:
  - Location
  - Magnitude
  - Time of occurrence
  - Link to USGS detailed report

### Enhanced Features
- **Loading Spinner**: Visual feedback while data is being fetched from the API
- **Magnitude Filter**: Dropdown menu to filter earthquakes by magnitude range:
  - All Earthquakes
  - Minor (< 3.0)
  - Moderate (3.0 - 5.0)
  - Major (> 5.0)
- **Last Updated Timestamp**: Shows when the data was last fetched
- **Refresh Button**: Manually refresh data to get the latest earthquake information
- **Error Handling**: User-friendly error messages with retry functionality
- **Responsive Design**: Optimized for both mobile and desktop devices

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Map Library**: Leaflet with React Leaflet
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Data Source**: [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd earthquake-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
earthquake-visualizer/
├── src/
│   ├── components/
│   │   └── EarthquakeMap.tsx    # Main map component with all features
│   ├── types/
│   │   └── earthquake.ts        # TypeScript interfaces for earthquake data
│   ├── App.tsx                  # Root application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles with Tailwind
├── public/                      # Static assets
└── package.json                 # Project dependencies and scripts
```

## API Reference

This application uses the USGS Earthquake API to fetch real-time seismic data:

**Endpoint**: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`

**Data Returned**:
- All earthquakes from the past 24 hours
- Magnitude, location, coordinates, time
- Direct links to detailed USGS reports

## How It Works

1. **Data Fetching**: The app fetches earthquake data from the USGS API when loaded
2. **Visualization**: Earthquakes are displayed as circular markers on an interactive map
3. **Filtering**: Users can filter earthquakes by magnitude using the dropdown menu
4. **Real-time Updates**: Click the refresh button to fetch the latest data
5. **Interaction**: Click any marker to view detailed information in a popup

## Browser Support

This application works on all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- SVG rendering
- Fetch API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Data Attribution

Earthquake data provided by the [U.S. Geological Survey Earthquake Hazards Program](https://earthquake.usgs.gov/).

## Acknowledgments

- USGS for providing free, real-time earthquake data
- OpenStreetMap contributors for map tiles
- React Leaflet community for the mapping library



## Candidate Information
- **Name:** Gokul Raj M
- **Candidate ID:** Naukri1025  
- **Position Applied For:** Full Stack Developer  
