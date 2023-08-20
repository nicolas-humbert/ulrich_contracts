import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-aria-components";
import { CONTRACTS_LINK } from "../routes/links";
import { UserLoginRequest } from "../types/User";
import CTextField from "../components/CTextField";
import SpinnerSmall from "../components/SpinnerSmall";
import { setLocalStorageObjectWithExpiry } from "../utils/localStorage";
import "../styles/login-page.scss";
import { login } from "../services/auth";

// import ErrorMessage from "../components/ErrorMessage";

type LoginState = {
  form: UserLoginRequest;
  error?: Error;
  isSendingLoginRequest: boolean;
};

const Login = () => {
  const [state, setState] = useState<LoginState>({
    form: {},
    isSendingLoginRequest: false,
  });
  const { form, error, isSendingLoginRequest } = state;

  useEffect(() => {
    // Changes color of the body to be less agressive on this page
    // Uses $tertiaryColor defined in src/styles/constants.scss
    document.body.style.backgroundColor = "#fcdfff";

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function authenticate() {
    setState({
      ...state,
      isSendingLoginRequest: true,
    });
  }

  function onHandleSubmit(): void {
    authenticate();
    try {
      login(form);
    } catch (err) {
      if (err instanceof Error)
        [
          setState({
            ...state,
            error: err,
            isSendingLoginRequest: false,
          }),
        ];
    }
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
      {error && (
        <p className="login-error-message">
          Erreur d'identification lors de la connexion.
          <br />
          Vérifiez vos identifiants.
        </p>
      )}

      {isSendingLoginRequest && <SpinnerSmall />}
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

      {/* {error && <ErrorMessage error={error} />} */}
    </div>
  );
};

export default Login;
