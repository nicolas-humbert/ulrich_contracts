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

type UserProps = {
  isSignedIn?: BearerToken;
};

const LoggedInUserRouter = ({ isSignedIn }: UserProps) => {
  const routes: RouteProps[] = [
    {
      path: HOME_LINK,
      element: (
        <Protected isSignedIn={isSignedIn}>
          <Home />
        </Protected>
      ),
    },
    {
      path: ABOUT_LINK,
      element: (
        <Protected isSignedIn={isSignedIn}>
          <About />
        </Protected>
      ),
    },
    {
      path: MASS_ADD_LINK,
      element: (
        <Protected isSignedIn={isSignedIn}>
          <MassAdd />
        </Protected>
      ),
    },
    {
      path: CONTRACTS_LINK,
      element: (
        <Protected isSignedIn={isSignedIn}>
          <Contracts />
        </Protected>
      ),
    },
    {
      path: ADD_CONTRACT_LINK,
      element: (
        <Protected isSignedIn={isSignedIn}>
          <NewContract />
        </Protected>
      ),
    },
    {
      path: CONTRACTS_DETAIL_LINK,
      element: (
        <Protected isSignedIn={isSignedIn}>
          <ContractDetail />
        </Protected>
      ),
    },
  ];

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {routes.map((r: RouteProps, id: number) => {
            return <Route key={id} path={r.path} element={r.element} />;
          })}
        </Route>

        <Route path={LOGIN_LINK} element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Copyright />
    </>
  );
};

export default LoggedInUserRouter;
