import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { formInitState } from "../../constants";
import { getFormState, setFormState } from "../../store";
import type { Earthquake, Theme, UserPreferences } from "../../types";
import { debounce } from "../../utils/debounce";
import { getEarthquakes } from "../../api";

export const ThemeContext = createContext<{
  theme: Theme;

  setTheme: (prefs: Theme) => void;
}>({
  theme: localStorage.theme,
  setTheme: () => void 0,
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light",
  );

  console.log({ theme });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "lignt");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
