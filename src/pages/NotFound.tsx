import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { useEffect } from "react";
import { CONTRACTS_LINK, LOGIN_LINK } from "../routes/links";
import { IS_LOGGED_IN_USER } from "../utils/USER";
import "../styles/not-found.scss";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (IS_LOGGED_IN_USER) {
        navigate(`${CONTRACTS_LINK}`);
      } else {
        navigate(`${LOGIN_LINK}`);
      }
    }, 4000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="NotFound">
      <PageTitle text="404 Error - PAGE NOT FOUND" />
      <p className="not-found-message">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <p className="not-found-message">
        Vous allez être redirigé vers l'accueil dans quelques secondes.
      </p>
    </div>
  );
};

export default NotFound;
