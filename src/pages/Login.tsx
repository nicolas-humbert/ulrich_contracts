import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "react-aria-components";
import CTextField from "../components/CTextField";
import { LoginResponseUser, User, UserLoginRequest } from "../types/User";
import "../styles/login-page.scss";
import { setLocalStorageObjectWithExpiry } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { CONTRACTS_LINK } from "../routes/links";
import ErrorMessage from "../components/ErrorMessage";

type LoginState = {
  form?: UserLoginRequest;
  error?: Error;
  authFailed?: boolean;
};

const Login = () => {
  const [state, setState] = useState<LoginState>({
    authFailed: false,
  });
  const { form, error, authFailed } = state;

  useEffect(() => {
    // Changes color of the body to be less agressive on this page
    // Uses $tertiaryColor defined in src/styles/constants.scss
    document.body.style.backgroundColor = "#fcdfff";
  }, []);

  async function authenticate() {
    axios
      // .post("/login.json")
      .post("/auth/sign-in", form, {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      // .then((data) => {
      //   const findUser: LoginResponseUser[] = data.filter(
      //     (u: LoginResponseUser) => u.email == form?.username
      //   );

      //   if (findUser.length === 0) {
      //     setState({
      //       ...state,
      //       authFailed: true,
      //     });
      //     return;
      //   }
      //   if (findUser[0].password === form?.password) {
      //     setLocalStorageObjectWithExpiry(
      //       "smartract_user_token",
      //       findUser[0].token,
      //       7 * 24 * 60 * 60 * 1000 // seven days
      //     );
      //     window.location.assign(`${CONTRACTS_LINK}`);
      //   } else {
      //     setState({
      //       ...state,
      //       authFailed: true,
      //     });
      //   }
      // })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          error: err,
        });
      });
  }

  function onHandleSubmit(): void {
    authenticate();
  }

  function onHandleChange(e: FormEvent<HTMLInputElement>): void {
    // https://freshman.tech/snippets/typescript/fix-value-not-exist-eventtarget/
    const target = e.target as HTMLButtonElement;

    setState({
      ...state,
      form: {
        ...form,
        [`${target.id}`]: target.value,
      },
    });
  }

  return (
    <div className="container" id="LoginPage">
      <h1 className="login-title">SMARTRACT</h1>
      {authFailed && (
        <p className="login-error-message">
          Erreur d'identification lors de la connexion.
          <br />
          Vérifiez vos identifiants.
        </p>
      )}
      <form action="GET" className="login-form">
        <CTextField
          placeholder="WhiteCarrot69"
          label="Nom d'utilisateur"
          name="username"
          id="username"
          type="text"
          defaultValue=""
          isRequired
          onInput={onHandleChange}
        />
        <CTextField
          placeholder="Votre mot de passe..."
          label="Mot de passe"
          name="password"
          id="password"
          type="password"
          defaultValue=""
          isRequired
          onInput={onHandleChange}
        />
      </form>

      <Button
        className="action-button login-button"
        type="submit"
        onPress={onHandleSubmit}
      >
        SE CONNECTER
      </Button>

      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default Login;
