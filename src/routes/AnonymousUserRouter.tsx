import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import { LOGIN_LINK } from "./links";

const AnonymousUserRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AnonymousUserRouter;
