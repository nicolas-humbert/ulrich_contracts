import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import { LOGIN_LINK } from "./links";
import NotFound from "../pages/NotFound";

const AnonymousUserRouter = () => {
  return (
    <Routes>
      <Route path={`${LOGIN_LINK}`} element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AnonymousUserRouter;
