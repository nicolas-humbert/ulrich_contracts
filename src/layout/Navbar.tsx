import { NavLink } from "react-router-dom";
import { Button } from "react-aria-components";
import { LOCAL_STORAGE_TOKEN_KEY } from "../utils/USER";
import { removeLocalStorageObject } from "../utils/localStorage";
import {
  ABOUT_LINK,
  ADD_CONTRACT_LINK,
  CONTRACTS_LINK,
  HOME_LINK,
  LOGIN_LINK,
  MASS_ADD_LINK,
} from "../routes/links";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BiFile, BiInfoCircle, BiUser, BiUserPlus } from "react-icons/bi";
import "../styles/navbar.scss";

const Navbar = () => {
  function onHandleLogout(): void {
    try {
      removeLocalStorageObject(LOCAL_STORAGE_TOKEN_KEY);
      window.location.assign(`${LOGIN_LINK}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav role="tablist" className="main-navigation-sidebar">
      <div className="tabs-navigation">
        <header className="site-title">
          <NavLink className="nav-item" to={HOME_LINK}>
            Smartract
          </NavLink>
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

        <NavLink className="nav-item" role="menuitem" to={"/redux"}>
          <AiOutlineFileAdd /> <span>Redux</span>
        </NavLink>
      </div>

      <Button className="nav-item" onPress={onHandleLogout}>
        <BiUser /> <span>Déconnexion</span>
      </Button>
    </nav>
  );
};

export default Navbar;
