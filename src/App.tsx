import { useState, useCallback } from "react";
import EarthquakeMap from "./components/map/map-view";
import { getEarthquakes } from "./api";
import { Earthquake, UserPreferences } from "./types";
// import {
//   initTelegramWebApp,
//   showMainButton,
//   hideMainButton,
// } from "./telegramWebApp";
import "./App.css";
import { debounce } from "./utils/debounce";
import PreferencesForm from "./components/preferences-form";
import { type LatLngLiteral } from "leaflet";
import { getFormState, setFormState } from "./store";

const initState = {
  radius: 21,
  latitude: 42,
  longitude: 42,
  minMagnitude: 0,
};

const App = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(
    () => getFormState() || initState,
  );
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);

  const debouncedHandler = debounce(
    async (formValues: UserPreferences) =>
      await getEarthquakes(formValues).then((geoData) =>
        setEarthquakes(geoData),
      ),
    300,
  );

  const handleChanges = useCallback(
    (args: UserPreferences) => {
      setPreferences(args);
      debouncedHandler(args);
      setFormState(args);
    },
    [debouncedHandler],
  );

  const onMarkerDrag = useCallback(
    (location: LatLngLiteral) => {
      handleChanges({
        radius: preferences?.radius,
        minMagnitude: preferences?.minMagnitude,
        longitude: location.lng,
        latitude: location.lat,
      });
    },
    [handleChanges, preferences?.minMagnitude, preferences?.radius],
  );

  return (
    <div className="App container h-screen ">
      <div className="mb-5">
        <PreferencesForm
          setPreferences={handleChanges}
          preferences={preferences}
        />
      </div>
      <div className="w-full h-full ">
        <EarthquakeMap
          earthquakes={earthquakes}
          location={{
            lat: preferences?.latitude ?? 0,
            lng: preferences?.longitude ?? 0,
          }}
          onMarkerDrag={onMarkerDrag}
        />
      </div>
    </div>
  );
};

export default App;
