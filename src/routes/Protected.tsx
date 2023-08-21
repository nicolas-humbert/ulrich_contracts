import { Navigate } from "react-router-dom";
import { BearerToken } from "../types/BearerToken";
import { LOGIN_LINK } from "./links";
import { ReactNode } from "react";

export type ProtectedProps = {
  isSignedIn?: BearerToken;
  children: ReactNode;
};

function Protected({ isSignedIn, children }: ProtectedProps) {
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
