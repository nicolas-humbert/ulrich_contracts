import { NavLink } from "react-router-dom";
import {
  ABOUT_LINK,
  ADD_CONTRACT_LINK,
  CONTRACTS_LINK,
  HOME_LINK,
  LOGIN_LINK,
  MASS_ADD_LINK,
} from "../routes/links";
import { BiFile, BiInfoCircle, BiUser, BiUserPlus } from "react-icons/bi";
import { AiOutlineFileAdd } from "react-icons/ai";
import "../styles/navbar.scss";

const Navbar = () => {
  return (
    <nav role="tablist" className="main-navigation-sidebar">
      <div className="tabs-navigation">
        <header className="site-title">
          <NavLink to={HOME_LINK}>Smartract</NavLink>
        </header>

        <NavLink className="nav-item" role="menuitem" to={ABOUT_LINK}>
          <BiInfoCircle /> <span>À Propos</span>
        </NavLink>

        <NavLink className="nav-item" role="menuitem" to={CONTRACTS_LINK}>
          <BiFile /> <span>Contrats</span>
        </NavLink>

        <NavLink className="nav-item" role="menuitem" to={ADD_CONTRACT_LINK}>
          <BiUserPlus /> <span>Nouveau</span>
        </NavLink>

        <NavLink className="nav-item" role="menuitem" to={MASS_ADD_LINK}>
          <AiOutlineFileAdd /> <span>Ajout CSV</span>
        </NavLink>
      </div>

      <NavLink
        className="nav-item"
        role="menuitem"
        onClick={() => alert("Not implemented")}
        to={LOGIN_LINK}
      >
        <BiUser /> <span>Déconnexion</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
