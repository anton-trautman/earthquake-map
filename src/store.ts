import type { UserPreferences } from "./types";

// export default function isLocalStorageSupported(): boolean {
//   const storage = window.localStorage;
//   const key = "test";
//   try {
//     storage.setItem(key, key);
//     storage.removeItem(key);
//     return true;
//   } catch (e) {
//     if (e?.code === DOMException.QUOTA_EXCEEDED_ERR && storage.length === 0) {
//       return false;
//     }
//   }
// }

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
