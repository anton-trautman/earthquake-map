import { useMemo } from "react";
import WebApp from "@twa-dev/sdk";
import { Toaster } from "react-hot-toast";
import EarthquakeMap from "./components/map/map-view";

import PreferencesForm from "./components/preferences-form";
import { UserPreferencesContextProvider } from "./providers/user-preferences/context";
import "./App.css";

const App = () => {
  const theme = useMemo(() => {
    return WebApp.colorScheme ||
      (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light";
  }, []);

  return (
    <div className="App container h-screen w-screen">
      <Toaster />
      <UserPreferencesContextProvider>
        <div className="mb-5">
          <PreferencesForm />
        </div>
        <div className="w-full h-full ">
          <EarthquakeMap theme={theme} />
        </div>
      </UserPreferencesContextProvider>
    </div>
  );
};

export default App;
