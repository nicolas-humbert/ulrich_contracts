import { BrowserRouter } from "react-router-dom";
import SmartractRouter from "./routes/SmartractRouter";

function App() {
  return (
    <BrowserRouter>
      <SmartractRouter />
    </BrowserRouter>
  );
}

export default App;
