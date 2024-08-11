import { useState } from "react";
import { UserPreferences } from "../types";

interface Props {
  setPreferences: (prefs: UserPreferences) => void;
  preferences: UserPreferences;
}

const PreferencesForm = ({ setPreferences, preferences }: Props) => {
  const [error, setError] = useState("");

  const handleGetCurrentLocation = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setPreferences({
            ...preferences,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      } else {
        setError("Geolocation is not supported by your browser.");
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e?.message);
      }
    }
  };

  return (
    <form>
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
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          value={preferences?.minMagnitude}
          onChange={(e) =>
            setPreferences({
              ...preferences,
              minMagnitude: parseFloat(e.target.value) ?? 0,
            })
          }
        />
      </div>

      <div className="flex flex-col gap-2 ">
        <label htmlFor="radius" className="text-xs">
          Search radius
        </label>

        <input
          id="radius"
          type="range"
          min="0"
          max="180"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          value={preferences?.radius}
          onChange={(e) =>
            setPreferences({
              ...preferences,
              radius: parseFloat(e.target.value) ?? 0,
            })
          }
        />
      </div>

      <span className="text-xs ">Coordinates</span>
      <div className="flex flex-row gap-10 items-center w-full ">
        <div className="flex flex-col gap-2.5 w-2/3">
          <input
            type="number"
            className="border border-sky-500 rounded h-8 p-2.5"
            placeholder="Latitude"
            value={preferences?.latitude}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                latitude: parseFloat(e.target.value) ?? 0,
              })
            }
          />
          <input
            type="number"
            className="border border-sky-500 rounded h-8 p-2.5"
            placeholder="Longitude"
            value={preferences?.longitude}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                longitude: parseFloat(e.target.value) ?? 0,
              })
            }
          />
        </div>

        <div className=" w-1/3">
          <button
            className="radius-xs border-sky-500 border p-3 w-full"
            onClick={handleGetCurrentLocation}
          >
            use my location
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PreferencesForm;
