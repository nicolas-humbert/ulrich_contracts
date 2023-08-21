import { RouteProps } from "react-router-dom";
import About from "../pages/About";
import ContractDetail from "../pages/ContractDetail";
import Contracts from "../pages/Contracts";
import Home from "../pages/Home";
import MassAdd from "../pages/MassAdd";
import NewContract from "../pages/NewContract";
import {
  HOME_LINK,
  ABOUT_LINK,
  MASS_ADD_LINK,
  CONTRACTS_LINK,
  ADD_CONTRACT_LINK,
  CONTRACTS_DETAIL_LINK,
  LOGIN_LINK,
} from "./links";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

export const protectedRoutes: RouteProps[] = [
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

export const publicRoutes = [
  {
    path: LOGIN_LINK,
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
