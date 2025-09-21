const REMEMBER_ME_KEY = "infoverse.auth.remember-me";

const canUseWindow = (): boolean => typeof window !== "undefined";

export const getRememberMePreference = (): boolean => {
  if (!canUseWindow()) return false;
  const value = window.localStorage.getItem(REMEMBER_ME_KEY);
  return value === "true";
};

export const persistRememberMePreference = (remember: boolean): void => {
  if (!canUseWindow()) return;
  if (remember) {
    window.localStorage.setItem(REMEMBER_ME_KEY, "true");
  } else {
    window.localStorage.removeItem(REMEMBER_ME_KEY);
  }
};
