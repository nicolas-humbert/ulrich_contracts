import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import { LOGIN_LINK } from "./links";
import { Route, Routes } from "react-router-dom";

const AnonymousUserRouter = () => {
  return (
    <Routes>
      <Route path={`${LOGIN_LINK}`} element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AnonymousUserRouter;
