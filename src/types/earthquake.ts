export interface EarthquakeProperties {
  mag: number;
  place: string;
  time: number;
  url: string;
  title: string;
}

export interface EarthquakeGeometry {
  type: string;
  coordinates: [number, number, number];
}

export interface EarthquakeFeature {
  type: string;
  properties: EarthquakeProperties;
  geometry: EarthquakeGeometry;
  id: string;
}

export interface EarthquakeResponse {
  type: string;
  features: EarthquakeFeature[];
}
