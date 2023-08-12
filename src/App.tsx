import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Contracts from "./pages/Contracts";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ABOUT_LINK,
  ADD_CONTRACT_LINK,
  CONTRACTS_DETAIL_LINK,
  CONTRACTS_LINK,
  HOME_LINK,
  LOGIN_LINK,
  MASS_ADD_LINK,
} from "./routes/links";
import ContractDetail from "./pages/ContractDetail";
import Navbar from "./layout/Navbar";
import Copyright from "./layout/Copyright";
import NewContract from "./pages/NewContract";
import MassAdd from "./pages/MassAdd";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div id="ApplicationBody">
        <Routes>
          <Route path={HOME_LINK} element={<Home />} />
          <Route path={LOGIN_LINK} element={<Login />} />
          <Route path={ABOUT_LINK} element={<About />} />
          <Route path={CONTRACTS_LINK} element={<Contracts />} />
          <Route path={ADD_CONTRACT_LINK} element={<NewContract />} />
          <Route path={MASS_ADD_LINK} element={<MassAdd />} />
          <Route path={CONTRACTS_DETAIL_LINK} element={<ContractDetail />} />
        </Routes>
      </div>
      <Copyright />
    </BrowserRouter>
  );
}

export default App;
