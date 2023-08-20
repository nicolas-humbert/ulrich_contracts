import { BrowserRouter } from "react-router-dom";
import LoggedInUserRouter from "./routes/LoggedInUserRouter";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";
import { getCurrentUser } from "./services/auth";
import { BearerToken } from "./types/BearerToken";
import { setUser } from "./store/features/userSlice";

type AppState = {
  user: BearerToken | null;
};

function App() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!selector) {
      try {
        const user = JSON.parse(getCurrentUser());
        // console.log("TOKEN ==>", user.accessToken);
        dispatch(setUser({ user: user }));
      } catch (err) {
        console.log(err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <div id="ApplicationBody">
        <LoggedInUserRouter isSignedIn={selector} />
      </div>
    </BrowserRouter>
  );
}

export default App;
