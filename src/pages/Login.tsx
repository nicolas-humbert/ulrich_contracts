import { useEffect } from "react";
import TextField from "../components/TextField";
import "../styles/login-page.scss";
import { Button } from "react-aria-components";

const Login = () => {
  useEffect(() => {
    // Changes color of the body to be less agressive on this page
    // Uses $tertiaryColor defined in src/styles/constants.scss
    document.body.style.backgroundColor = "#fcdfff";
  }, []);

  return (
    <div className="container" id="LoginPage">
      <h1 className="login-title">LOGIN</h1>
      <form action="GET" className="login-form">
        <TextField
          placeholder="w.carrot@ldd.com"
          label="Email"
          name="email"
          id="email"
          type="email"
        />
        <TextField
          placeholder="Votre mot de passe..."
          label="Mot de passe"
          name="password"
          id="password"
          type="password"
        />
      </form>

      <Button
        className="login-button"
        type="submit"
        onPress={() => alert("Not implemented")}
      >
        SE CONNECTER
      </Button>
    </div>
  );
};

export default Login;
