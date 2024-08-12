import axios from "axios";
import { Earthquake, UserPreferences } from "./types";
import { API_URL } from "./constants";

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
      maxradius: prefs.radius,
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
