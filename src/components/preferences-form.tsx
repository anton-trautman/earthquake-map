import { useState } from "react";
import { UserPreferences } from "../types";

type Props = {
  setPreferences: (prefs: UserPreferences) => void;
  preferences: UserPreferences;
};

const normalizeLatLng = (number: number): number => {
  if (number > 180) {
    return number - 360;
  }
  if (number < -180) {
    return number + 360;
  }
  return number;
};

const PreferencesForm = ({ setPreferences, preferences }: Props) => {
  const [error, setError] = useState("");

  const handleGetCurrentLocation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (
          position.coords.latitude !== preferences.latitude ||
          position.coords.longitude !== preferences.longitude
        ) {
          setPreferences({
            ...preferences,
            latitude: normalizeLatLng(position.coords.latitude),
            longitude: normalizeLatLng(position.coords.longitude),
          });
          
        }
      });
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const handleChange = (
    value: string,
    name: "minMagnitude" | "radius" | "latitude" | "longitude",
  ) => {
    setPreferences({
      ...preferences,
      [name]: parseFloat(value) ?? 0,
    });
  };

  return (
    <form>
      <span className="text-xs ">Coordinates</span>
      <div className="flex flex-row gap-10 items-center w-full ">
        <div className="flex flex-col gap-2.5 w-2/3">
          <input
            type="number"
            className="border border-sky-700/40 rounded h-8 p-2.5 dark:bg-slate-700/25"
            placeholder="Latitude"
            value={preferences?.latitude}
            onChange={(e) => handleChange(e.target.value, "latitude")}
          />
          <input
            type="number"
            className="border border-sky-700/40 rounded h-8 p-2.5 dark:bg-slate-700/25"
            placeholder="Longitude"
            value={preferences?.longitude}
            onChange={(e) => handleChange(e.target.value, "longitude")}
          />
        </div>

        <div className=" w-1/3">
          <button
            className="radius-xs border-sky-700/40 border p-3 w-full"
            onClick={handleGetCurrentLocation}
          >
            use my location
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 ">
        <label htmlFor="magnitude" className="text-xs">
          Minimum Magnitude:
          <span className="ml-2">{preferences?.minMagnitude}</span>
        </label>

        <input
          id="magnitude"
          type="range"
          min="0"
          max="12"
          className="custom-range w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
          value={preferences?.minMagnitude}
          onChange={(e) => handleChange(e.target.value, "minMagnitude")}
        />
      </div>

      <div className="flex flex-col gap-2 ">
        <label htmlFor="radius" className="text-xs">
          Search radius:
          <span className="ml-2">{preferences?.radius} KM</span>
        </label>

        <input
          id="radius"
          type="range"
          min="108"
          max="10008"
          className="custom-range w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
          value={preferences?.radius}
          onChange={(e) => handleChange(e.target.value, "radius")}
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PreferencesForm;
