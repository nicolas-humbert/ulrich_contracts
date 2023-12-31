import PageTitle from "../components/PageTitle";
import DashboardQuarterCell from "../components/DashboardQuarterCell";
import {
  PiClockCountdown,
  PiHandCoins,
  PiClockCounterClockwise,
  PiFolderLockLight,
} from "react-icons/pi";
import "../styles/home.scss";
import { useAppSelector } from "../store/store";
import jwtDecode from "jwt-decode";
import { LoggedInUser } from "../types/User";

const Home = () => {
  const userSelector = useAppSelector((state) => state.user.user);
  const decode: LoggedInUser = jwtDecode(userSelector?.accessToken ?? "");

  return (
    <main id="HomePage">
      <PageTitle text="Accueil" />

      <div className="greetings">
        <p className="name">
          Bienvenue <span>{decode?.sub}</span>
        </p>
        <p className="status">Role actuel: {decode?.role[0]?.authority}</p>
      </div>

      <div
        className="db-cells-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2em",
          marginTop: "50px",
        }}
      >
        <DashboardQuarterCell
          icon={PiClockCountdown}
          title="Résultats du mois"
          color="green"
          value={182700}
          isCurrency
          currency="XOF"
        />
        <DashboardQuarterCell
          icon={PiHandCoins}
          title="Chiffre d'affaire"
          color="light"
          value={1887.27}
          isCurrency
          currency="EUR"
        />
        <DashboardQuarterCell
          icon={PiClockCounterClockwise}
          title="Nouveaux clients sur 30 jours"
          color="yellow"
          value={0}
        />
        <DashboardQuarterCell
          icon={PiFolderLockLight}
          title="Contrats en cours"
          color="pink"
          value={127}
        />
      </div>
    </main>
  );
};

export default Home;
