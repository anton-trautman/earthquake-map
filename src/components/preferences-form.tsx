import pluralize from "pluralize";
import { useUserPreferences } from "../providers/user-preferences/hooks";
import InputRange from "./input-range";
import type { FormInputName } from "../types";

const PreferencesForm = () => {
  const { setPreferences, preferences } = useUserPreferences();

  const handleChange = (value: string, name: FormInputName) => {
    setPreferences({
      [name]: parseFloat(value) ?? 0,
    });
  };

  return (
    <form className="w-full">
      <InputRange
        label={
          <>
            Last&nbsp;{preferences?.days}&nbsp;
            {pluralize("day", preferences?.days)}
          </>
        }
        id="days"
        min="1"
        max="10"
        value={preferences?.days}
        onChange={handleChange}
      />

      <InputRange
        label={
          <>
            Minimum Magnitude:
            <span className="ml-2">{preferences?.minMagnitude}</span>
          </>
        }
        id="minMagnitude"
        min="1"
        max="12"
        value={preferences?.minMagnitude}
        onChange={handleChange}
      />

      <InputRange
        label={
          <>
            Search radius:
            <span className="ml-2">{preferences?.radius} KM</span>
          </>
        }
        id="radius"
        min="108"
        max="10008"
        value={preferences.radius}
        onChange={handleChange}
      />
    </form>
  );
};

export default PreferencesForm;
