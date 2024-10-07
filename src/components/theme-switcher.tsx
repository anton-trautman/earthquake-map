import { useTheme } from "../providers/theme/use-theme";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span>{theme}</span>

      <button onClick={() => (theme === "dark" ? "light" : "dark")}>
        {theme}
      </button>
    </div>
  );
}

export default ThemeSwitcher;
