import { NavLink } from "react-router-dom";
import { ABOUT_LINK, CONTRACTS_LINK, LOGIN_LINK } from "../routes/links";

const Home = () => {
  return (
    <main id="HomePage">
      <h1>Home</h1>
      <ul>
        <li>
          <NavLink to={LOGIN_LINK}>Login</NavLink>
        </li>
        <li>
          <NavLink to={ABOUT_LINK}>About</NavLink>
        </li>
        <li>
          <NavLink to={CONTRACTS_LINK}>See Contracts</NavLink>
        </li>
      </ul>
    </main>
  );
};

export default Home;
