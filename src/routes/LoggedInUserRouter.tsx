import { useEffect } from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import MassAdd from "../pages/MassAdd";
import NotFound from "../pages/NotFound";
import Contracts from "../pages/Contracts";
import NewContract from "../pages/NewContract";
import ContractDetail from "../pages/ContractDetail";
import { Route, Routes } from "react-router-dom";
import {
  HOME_LINK,
  ABOUT_LINK,
  CONTRACTS_LINK,
  ADD_CONTRACT_LINK,
  MASS_ADD_LINK,
  CONTRACTS_DETAIL_LINK,
} from "./links";

const LoggedInUserRouter = () => {
  useEffect(() => {
    // Changes color of the body to be less agressive on this page
    // Uses color defined in index.css
    document.body.style.backgroundColor = "#f4f5f0";
  }, []);

  return (
    <Routes>
      <Route path={HOME_LINK} element={<Home />} />
      <Route path={ABOUT_LINK} element={<About />} />
      <Route path={CONTRACTS_LINK} element={<Contracts />} />
      <Route path={ADD_CONTRACT_LINK} element={<NewContract />} />
      <Route path={MASS_ADD_LINK} element={<MassAdd />} />
      <Route path={CONTRACTS_DETAIL_LINK} element={<ContractDetail />} />
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
};

export default LoggedInUserRouter;
