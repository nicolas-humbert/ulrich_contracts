import axios from "axios";
import { UserLoginRequest } from "../types/User";
import { LOCAL_STORAGE_TOKEN_KEY } from "../utils/USER";
import { CONTRACTS_LINK, LOGIN_LINK } from "../routes/links";

export function login(payload: UserLoginRequest) {
  // console.log(payload);
  axios
    .post("/auth/sign-in", payload, {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .then((data) => {
      // console.log(data);
      localStorage.setItem("smartract_user_token", JSON.stringify(data));
      window.location.assign(`${CONTRACTS_LINK}`);
    })
    .catch((err) => {
      console.log(err);
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
