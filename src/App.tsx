import { BrowserRouter } from "react-router-dom";
import { LOCAL_STORAGE_TOKEN_KEY } from "./utils/USER";
import LoggedInUserRouter from "./routes/LoggedInUserRouter";
import AnonymousUserRouter from "./routes/AnonymousUserRouter";
import Navbar from "./layout/Navbar";
import Copyright from "./layout/Copyright";
import { getLocalStorageObjectWithExpiry } from "./utils/localStorage";
import { useState } from "react";

type AppState = {
  userIsLoggedIn: string | null;
};

function App() {
  const [state, setState] = useState<AppState>({
    userIsLoggedIn: getLocalStorageObjectWithExpiry(LOCAL_STORAGE_TOKEN_KEY),
  });

  return (
    <BrowserRouter>
      {state.userIsLoggedIn ? (
        <div id="ApplicationBody">
          <Navbar />
          <LoggedInUserRouter />
        </div>
      ) : (
        <AnonymousUserRouter />
      )}
      <Copyright />
    </BrowserRouter>
  );
}

export default App;
