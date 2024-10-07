import type { UserPreferences } from "./types";

export const setFormState = (formState: UserPreferences) => {
  if (!formState) {
    return;
  }
  if (window?.localStorage) {
    window.localStorage.setItem("form-state", JSON.stringify(formState));
  }
};

export const getFormState = () => {
  if (window?.localStorage) {
    const formState = window.localStorage.getItem("form-state");
    if (formState) {
      const parsed = JSON.parse(formState);
      return parsed as UserPreferences;
    }
  }
  return null;
};
