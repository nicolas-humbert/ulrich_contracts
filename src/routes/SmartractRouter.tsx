import { useAppSelector } from "../store/store";
import { protectedRoutes, publicRoutes } from "./routes";
import { Route, RouteProps, Routes } from "react-router-dom";
import Protected from "./Protected";
import Layout from "../layout/Layout";
import Copyright from "../layout/Copyright";

const SmartractRouter = () => {
  const userSelector = useAppSelector((state) => state.user.user);

  return (
    <>
      <Routes>
        {/* PROTECTED ROUTING */}
        {/* ---------------------------- */}
        <Route element={<Layout />}>
          {protectedRoutes.map((r: RouteProps, id: number) => {
            return (
              <Route
                key={id}
                path={r.path}
                element={
                  <Protected isSignedIn={userSelector} children={r.element} />
                }
              />
            );
          })}
        </Route>

        {/* PUBLIC ROUTING */}
        {/* ---------------------------- */}
        {publicRoutes.map((r: RouteProps, id: number) => {
          return <Route key={id} path={r.path} element={r.element} />;
        })}
      </Routes>
      <Copyright />
    </>
  );
};

export default SmartractRouter;
