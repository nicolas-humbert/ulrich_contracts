import React from "react";
import { NavLink } from "react-router-dom";
import {
  ABOUT_LINK,
  CONTRACTS_LINK,
  HOME_LINK,
  LOGIN_LINK,
} from "../routes/links";
import { BiFile, BiInfoCircle, BiUser } from "react-icons/bi";
import "../styles/navbar.scss";

const Navbar = () => {
  return (
    <nav role="tablist" className="main-navigation-sidebar">
      <header className="site-title">
        <NavLink to={HOME_LINK}>Smartract</NavLink>
      </header>

      <NavLink className="nav-item" role="menuitem" to={LOGIN_LINK}>
        <BiUser /> <span>Login</span>
      </NavLink>

      <NavLink className="nav-item" role="menuitem" to={ABOUT_LINK}>
        <BiInfoCircle /> <span>About</span>
      </NavLink>

      <NavLink className="nav-item" role="menuitem" to={CONTRACTS_LINK}>
        <BiFile /> <span>Contracts</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
