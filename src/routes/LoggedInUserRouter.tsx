import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import ContractDetail from "../pages/ContractDetail";
import Contracts from "../pages/Contracts";
import Home from "../pages/Home";
import MassAdd from "../pages/MassAdd";
import NewContract from "../pages/NewContract";
import {
  HOME_LINK,
  ABOUT_LINK,
  CONTRACTS_LINK,
  ADD_CONTRACT_LINK,
  MASS_ADD_LINK,
  CONTRACTS_DETAIL_LINK,
} from "./links";

const LoggedInUserRouter = () => {
  return (
    <Routes>
      <Route path={HOME_LINK} element={<Home />} />
      <Route path={ABOUT_LINK} element={<About />} />
      <Route path={CONTRACTS_LINK} element={<Contracts />} />
      <Route path={ADD_CONTRACT_LINK} element={<NewContract />} />
      <Route path={MASS_ADD_LINK} element={<MassAdd />} />
      <Route path={CONTRACTS_DETAIL_LINK} element={<ContractDetail />} />
      <Route path={"*"} element={<Home />} />
    </Routes>
  );
};

export default LoggedInUserRouter;
