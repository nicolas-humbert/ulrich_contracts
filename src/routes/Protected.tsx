import { Navigate } from "react-router-dom";
import { BearerToken } from "../types/BearerToken";
import { LOGIN_LINK } from "./links";
import { ReactNode } from "react";
// import jwt_decode from "jwt-decode";

export type ProtectedProps = {
  isSignedIn?: BearerToken;
  children: ReactNode;
};

function Protected({ isSignedIn, children }: ProtectedProps) {
  // if (isSignedIn?.accessToken) {
  // const decoded = jwt_decode(isSignedIn?.accessToken);
  // console.log(decoded);
  // }
  return (
    <>
      {!isSignedIn?.accessToken ? (
        <Navigate to={LOGIN_LINK} replace />
      ) : (
        children
      )}
    </>
  );
  // return children;
}
export default Protected;
