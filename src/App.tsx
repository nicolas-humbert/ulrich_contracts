import { BrowserRouter } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Copyright from "./layout/Copyright";
import LoggedInUserRouter from "./routes/LoggedInUserRouter";
import AnonymousUserRouter from "./routes/AnonymousUserRouter";
import { IS_LOGGED_IN_USER } from "./utils/USER";

function App() {
  // Determines if user is logged in or not
  // For now use src/utils/USER.ts to tweak the values
  // Change auth value to anything truthy for user logged in and admin
  // Otherwise 0 for anonymous user

  return (
    <BrowserRouter>
      {IS_LOGGED_IN_USER ? (
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
