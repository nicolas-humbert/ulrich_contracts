import PageTitle from "../components/PageTitle";
import DashboardCell from "../components/DashboardCell";
import {
  PiClockCountdown,
  PiHandCoins,
  PiClockCounterClockwise,
  PiFolderLockLight,
} from "react-icons/pi";
import "../styles/home.scss";

const Home = () => {
  return (
    <main id="HomePage">
      <PageTitle text="Accueil" />

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
        <DashboardCell
          icon={PiClockCountdown}
          title="Résultats du mois"
          color="green"
          value={182700}
          isCurrency
          currency="XOF"
        />
        <DashboardCell
          icon={PiHandCoins}
          title="Chiffre d'affaire"
          color="light"
          value={1887.27}
          isCurrency
          currency="EUR"
        />
        <DashboardCell
          icon={PiClockCounterClockwise}
          title="Nouveaux clients sur 30 jours"
          color="yellow"
          value={0}
        />
        <DashboardCell
          icon={PiFolderLockLight}
          title="Contrats en cours"
          color="orange"
          value={127}
        />
      </div>
    </main>
  );
};

export default Home;
