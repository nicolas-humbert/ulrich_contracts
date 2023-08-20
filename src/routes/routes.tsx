import { RouteProps, createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import ContractDetail from "../pages/ContractDetail";
import Contracts from "../pages/Contracts";
import Home from "../pages/Home";
import MassAdd from "../pages/MassAdd";
import NewContract from "../pages/NewContract";
import Protected, { ProtectedProps } from "./Protected";
import {
  HOME_LINK,
  ABOUT_LINK,
  MASS_ADD_LINK,
  CONTRACTS_LINK,
  ADD_CONTRACT_LINK,
  CONTRACTS_DETAIL_LINK,
  LOGIN_LINK,
} from "./links";
import { useAppSelector } from "../store/store";
