import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { IS_LOGGED_IN_USER } from "../utils/USER";
import { CONTRACTS_LINK, LOGIN_LINK } from "../routes/links";
import "../styles/not-found.scss";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getCurrentUser } from "../services/auth";
import { setUser } from "../store/features/userSlice";

const NotFound = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = JSON.parse(getCurrentUser());
    dispatch(setUser({ user: user }));

    setTimeout(() => {
      if (user.accessToken) {
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
