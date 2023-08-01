import About from "./pages/About";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contracts from "./pages/Contracts";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ABOUT_LINK,
  CONTRACTS_LINK,
  HOME_LINK,
  LOGIN_LINK,
} from "./routes/links";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_LINK} element={<Home />} />
        <Route path={LOGIN_LINK} element={<Login />} />
        <Route path={ABOUT_LINK} element={<About />} />
        <Route path={CONTRACTS_LINK} element={<Contracts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
