import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import type { EarthquakeResponse, EarthquakeFeature } from '../types/earthquake';
import 'leaflet/dist/leaflet.css';

const USGS_API_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

function getMagnitudeColor(magnitude: number): string {
  if (magnitude < 3) return '#22c55e';
  if (magnitude <= 5) return '#f97316';
  return '#ef4444';
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

export default function EarthquakeMap() {
  const [earthquakes, setEarthquakes] = useState<EarthquakeFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [magnitudeFilter, setMagnitudeFilter] = useState<string>('all');

  useEffect(() => {
    fetchEarthquakes();
  }, []);

  const fetchEarthquakes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(USGS_API_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch earthquake data');
      }

      const data: EarthquakeResponse = await response.json();
      setEarthquakes(data.features);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Unable to fetch earthquake data. Please try again later.');
      console.error('Error fetching earthquakes:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredEarthquakes = earthquakes.filter((earthquake) => {
    const magnitude = earthquake.properties.mag;
    switch (magnitudeFilter) {
      case 'minor':
        return magnitude < 3;
      case 'moderate':
        return magnitude >= 3 && magnitude <= 5;
      case 'major':
        return magnitude > 5;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-50 rounded-lg">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading earthquake data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-red-50 rounded-lg">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-800 font-semibold">{error}</p>
          <button
            onClick={fetchEarthquakes}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="magnitude-filter" className="text-sm font-medium text-gray-700">
              Filter by Magnitude:
            </label>
            <select
              id="magnitude-filter"
              value={magnitudeFilter}
              onChange={(e) => setMagnitudeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Earthquakes</option>
              <option value="minor">Minor (&lt; 3.0)</option>
              <option value="moderate">Moderate (3.0 - 5.0)</option>
              <option value="major">Major (&gt; 5.0)</option>
            </select>
          </div>

          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredEarthquakes.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{earthquakes.length}</span> earthquakes
          </div>
        </div>

        <div className="flex items-center gap-4">
          {lastUpdated && (
            <div className="text-sm text-gray-600">
              Last updated: <span className="font-medium">{lastUpdated.toLocaleTimeString()}</span>
            </div>
          )}
          <button
            onClick={fetchEarthquakes}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">Refresh</span>
          </button>
        </div>
      </div>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="h-[600px] w-full rounded-lg shadow-lg"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredEarthquakes.map((earthquake) => {
          const [lng, lat] = earthquake.geometry.coordinates;
          const magnitude = earthquake.properties.mag;

          return (
            <CircleMarker
              key={earthquake.id}
              center={[lat, lng]}
              radius={Math.max(magnitude * 2, 4)}
              fillColor={getMagnitudeColor(magnitude)}
              color="#fff"
              weight={1}
              opacity={1}
              fillOpacity={0.7}
            >
              <Popup>
                <div className="text-sm">
                 <h3 className="font-bold text-base mb-2">{earthquake.properties.place}</h3>
                  <p><strong>Magnitude:</strong> {magnitude}</p>
                  <p><strong>Time:</strong> {formatTime(earthquake.properties.time)}</p>
                  <a
                    href={earthquake.properties.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    More details →
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#22c55e]"></div>
          <span className="text-gray-700">&lt; 3.0 Magnitude</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#f97316]"></div>
          <span className="text-gray-700">3.0 - 5.0 Magnitude</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#ef4444]"></div>
          <span className="text-gray-700">&gt; 5.0 Magnitude</span>
        </div>
      </div>
    </div>
  );
}
