import { LOCAL_STORAGE_TOKEN_KEY } from "../utils/localStorage";
import { HOME_LINK, LOGIN_LINK } from "../routes/links";
import { UserLoginRequest } from "../types/User";
import axios from "axios";

export async function login(payload: UserLoginRequest) {
  // console.log(payload);
  await axios
    .post("/auth/sign-in", payload, {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((response) => {
      // console.log(data);
      localStorage.setItem(
        "smartract_user_token",
        JSON.stringify(response.data)
      );
      window.location.assign(HOME_LINK);
    });
}

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
