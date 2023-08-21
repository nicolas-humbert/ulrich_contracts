import Home from "../pages/Home";
import About from "../pages/About";
import MassAdd from "../pages/MassAdd";
import NotFound from "../pages/NotFound";
import Contracts from "../pages/Contracts";
import NewContract from "../pages/NewContract";
import ContractDetail from "../pages/ContractDetail";
import { Route, RouteProps, Routes } from "react-router-dom";
import {
  HOME_LINK,
  ABOUT_LINK,
  CONTRACTS_LINK,
  ADD_CONTRACT_LINK,
  MASS_ADD_LINK,
  CONTRACTS_DETAIL_LINK,
  LOGIN_LINK,
} from "./links";
// import Redux from "../pages/Redux";
import Login from "../pages/Login";
import Layout from "../layout/Layout";
import Copyright from "../layout/Copyright";
import { BearerToken } from "../types/BearerToken";
import Protected from "./Protected";
import { useAppDispatch, useAppSelector } from "../store/store";

// type UserProps = {
//   isSignedIn?: BearerToken;
// };

const SmartractRouter = () => {
  const userSelector = useAppSelector((state) => state.user.user);

  const routes: RouteProps[] = [
    {
      path: HOME_LINK,
      element: <Home />,
    },
    {
      path: ABOUT_LINK,
      element: <About />,
    },
    {
      path: MASS_ADD_LINK,
      element: <MassAdd />,
    },
    {
      path: CONTRACTS_LINK,
      element: <Contracts />,
    },
    {
      path: ADD_CONTRACT_LINK,
      element: <NewContract />,
    },
    {
      path: CONTRACTS_DETAIL_LINK,
      element: <ContractDetail />,
    },
  ];

  return (
    <>
      <Routes>
        <Route path={LOGIN_LINK} element={<Login />} />
        <Route element={<Layout />}>
          {routes.map((r: RouteProps, id: number) => {
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

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Copyright />
    </>
  );
};

export default SmartractRouter;
