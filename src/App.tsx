import { Toaster } from "react-hot-toast";

import { UserPreferencesContextProvider } from "./providers/user-preferences/context";
import { ThemeContextProvider } from "./providers/theme/context";
import ThemeSwitcher from "./components/theme-switcher";
import { lazy, Suspense } from "react";

import PreferencesForm from "./components/preferences-form";
const EarthquakeMap = lazy(() => import("./components/map/map-view"));

const App = () => {
  return (
    <div className="container h-screen w-full p-5">
      <ThemeContextProvider>
        <Toaster />
        <ThemeSwitcher />
        <UserPreferencesContextProvider>
          <div className="mb-5">
            <PreferencesForm />
          </div>
          <div className="w-full ">
            <Suspense>
              <EarthquakeMap />
            </Suspense>
          </div>
        </UserPreferencesContextProvider>
      </ThemeContextProvider>
    </div>
  );
};

export default App;
