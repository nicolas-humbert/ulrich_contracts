import jwtDecode from "jwt-decode";
import { logout } from "../services/auth";
import { NavLink } from "react-router-dom";
import { LoggedInUser } from "../types/User";
import { Button } from "react-aria-components";
import { useAppSelector } from "../store/store";
import {
  ABOUT_LINK,
  ADD_CONTRACT_LINK,
  CONTRACTS_LINK,
  HOME_LINK,
  MASS_ADD_LINK,
  STATS_LINK,
} from "../routes/links";
import { ImStatsDots } from "react-icons/im";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BiFile, BiInfoCircle, BiUser, BiUserPlus } from "react-icons/bi";
import "../styles/navbar.scss";

const Navbar = () => {
  const userSelector = useAppSelector((state) => state.user.user);
  const user: LoggedInUser = jwtDecode(userSelector?.accessToken ?? "");

  function onhandleLogout() {
    logout();
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

        {user.role[0].authority === "ADMIN" && (
          <NavLink className="nav-item" role="menuitem" to={STATS_LINK}>
            <ImStatsDots /> <span>Statistiques</span>
          </NavLink>
        )}
      </div>

      <Button className="nav-item" onPress={onhandleLogout}>
        <BiUser /> <span>Déconnexion</span>
      </Button>
    </nav>
  );
};

export default Navbar;
