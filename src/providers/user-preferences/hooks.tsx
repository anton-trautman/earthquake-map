import { useContext } from "react";
import { UserPreferencesContext } from "./context";

export const useUserPreferences = () => {
  return useContext(UserPreferencesContext);
};
