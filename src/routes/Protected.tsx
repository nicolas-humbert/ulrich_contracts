import { Navigate } from "react-router-dom";
import { BearerToken } from "../types/BearerToken";
import { LOGIN_LINK } from "./links";

export type ProtectedProps = {
  isSignedIn?: BearerToken;
  children: string | JSX.Element | JSX.Element[];
};

function Protected({ isSignedIn, children }: ProtectedProps) {
  if (!isSignedIn?.accessToken) {
    return <Navigate to={LOGIN_LINK} />;
  }
  return children;
}
export default Protected;
