import { BearerToken } from "../types/BearerToken";
import { getCurrentUser } from "./auth";

export default function authHeader() {
  const user: BearerToken = JSON.parse(getCurrentUser());

  if (user && user.accessToken) {
    return { Authorization: `Bearer ${user.accessToken}` };
  } else {
    return {};
  }
}
