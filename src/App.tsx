import { Activity } from 'lucide-react';
import EarthquakeMap from './components/EarthquakeMap';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Earthquake Visualizer
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Live earthquake activity from around the world in the last 24 hours.
            Data updates in real-time from the USGS Earthquake Hazards Program.
          </p>
        </header>

        <main>
          <EarthquakeMap />
        </main>

        <footer className="mt-12 text-center text-gray-600 text-sm pb-8">
          <p>
            Data Source:{' '}
            <a
              href="https://earthquake.usgs.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              USGS Earthquake API
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
