import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { formInitState } from "../../constants";
import { getFormState, setFormState } from "../../store";
import type { Earthquake, UserPreferences } from "../../types";
import { debounce } from "../../utils/debounce";
import { getEarthquakes } from "../../api";

export const UserPreferencesContext = createContext<{
  preferences: UserPreferences;

  setPreferences: (prefs: Partial<UserPreferences>) => void;
  loading: boolean;
  earthquakes: Earthquake[];
}>({
  preferences: formInitState,
  setPreferences: () => void 0,
  loading: false,
  earthquakes: [],
});

export const UserPreferencesContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [preferences, setPreferences] = useState<UserPreferences>(
    () => getFormState() || formInitState,
  );
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);

  const [loading, setLoading] = useState(false);

  const debouncedHandler = useCallback(
    debounce(async (formValues: UserPreferences) => {
      setLoading(true);
      const geoData = await getEarthquakes(formValues);
      setEarthquakes(geoData);
      setLoading(false);
    }, 600),
    [],
  );

  const onSet = useCallback(
    (prefs: Partial<UserPreferences>) => {
      const nextPrefs = { ...preferences, ...prefs };
      setPreferences(nextPrefs);
      setFormState(nextPrefs);
      debouncedHandler(nextPrefs);
    },
    [debouncedHandler, preferences],
  );

  useEffect(() => {
    debouncedHandler(preferences);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserPreferencesContext.Provider
      value={{
        preferences,
        earthquakes,
        loading,
        setPreferences: onSet,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};
