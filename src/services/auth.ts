import { LOCAL_STORAGE_TOKEN_KEY } from "../utils/localStorage";
import { LOGIN_LINK } from "../routes/links";

export function logout(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    window.location.assign(`${LOGIN_LINK}`);
  } catch (error) {
    console.log(error);
  }
}

export function getCurrentUser() {
  const user = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || "{}";

  return user;
}
