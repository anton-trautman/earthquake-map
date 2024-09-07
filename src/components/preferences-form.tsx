import { useUserPreferences } from "../providers/user-preferences/hooks";

const PreferencesForm = () => {
  const { setPreferences, preferences } = useUserPreferences();

  const handleChange = (
    value: string,
    name: "minMagnitude" | "radius" | "latitude" | "longitude" | "days",
  ) => {
    setPreferences({
      [name]: parseFloat(value) ?? 0,
    });
  };

  return (
    <form className="w-full">
      <div className="flex flex-col gap-2 ">
        <label htmlFor="days" className="text-xs">
          Last&nbsp;{preferences?.days}&nbsp;days
        </label>

        <input
          id="days"
          type="range"
          min="1"
          max="10"
          className="custom-range w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
          value={preferences?.days}
          onChange={(e) => handleChange(e.target.value, "days")}
        />
      </div>

      <div className="flex flex-col gap-2 ">
        <label htmlFor="magnitude" className="text-xs">
          Minimum Magnitude:
          <span className="ml-2">{preferences?.minMagnitude}</span>
        </label>

        <input
          id="magnitude"
          type="range"
          min="1"
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
    </form>
  );
};

export default PreferencesForm;
