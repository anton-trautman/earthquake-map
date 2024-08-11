import axios from "axios";
import { Earthquake, UserPreferences } from "./types";

const API_URL = "https://earthquake.usgs.gov/fdsnws/event/1/query";

export async function getEarthquakes(
  prefs: UserPreferences,
): Promise<Earthquake[]> {
  const response = await axios.get(API_URL, {
    params: {
      format: "geojson",
      starttime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      minmagnitude: prefs.minMagnitude,
      latitude: prefs.latitude,
      longitude: prefs.longitude,
      maxradius: prefs.radius ?? 0,
    },
  });

  return response.data.features.map((feature: any) => ({
    time: new Date(feature.properties.time).toISOString(),
    latitude: feature.geometry.coordinates[1],
    longitude: feature.geometry.coordinates[0],
    magnitude: feature.properties.mag,
    place: feature.properties.place,
  }));
}
