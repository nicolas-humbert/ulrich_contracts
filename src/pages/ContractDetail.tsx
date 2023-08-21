import { useState, useEffect, Key } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CONTRACTS_LINK } from "../routes/links";
import { Contract } from "../types/Contract";
import { Button } from "react-aria-components";
import Spinner from "../components/Spinner";
import PageTitle from "../components/PageTitle";
import CTextField from "../components/CTextField";
import CSelectItem from "../components/CSelectItem";
import CSelectField from "../components/CSelectField";
import NoSearchResultMessage from "../components/NoSearchResultMessage";
import {
  BiSolidCalendarEdit,
  BiSolidInfoSquare,
  BiSolidUserCheck,
  BiSolidUserDetail,
  BiSolidUserPlus,
} from "react-icons/bi";
import { IS_ADMIN_USER } from "../utils/USER";
import "../styles/contract-detail-page.scss";
import "../styles/error.scss";
import ErrorMessage from "../components/ErrorMessage";

type ContractStatus = {
  id: number;
  name: string;
  contractType: {
    id: number;
    name: string;
  };
};

type ContractPageState = {
  current?: Contract;
  currentType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  statuses: ContractStatus[];
  loading: boolean;
};

const ContractDetail = () => {
  const [state, setState] = useState<ContractPageState>({
    statuses: [],
    current: undefined,
    loading: true,
    currentType: "Banque",
  });
  const [error, setError] = useState<Error[]>();

  const { statuses, current, loading, currentType } = state;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = [
      `/api/v1/contracts/${id}`,
      `/api/v1/contracts/contract-status/get/1`,
      `/api/v1/contracts/contract-status/get/2`,
      `/api/v1/contracts/contract-status/get/3`,
    ];

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "ngrok-skip-browser-warning": "69420",
    };

    Promise.all([
      fetch(urls[0], { headers: headers }),
      fetch(urls[1], { headers: headers }),
      fetch(urls[2], { headers: headers }),
      fetch(urls[3], { headers: headers }),
    ])
      .then(function (responses) {
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {
        console.log(data);
        setState({
          ...state,
          current: data[0],
          statuses: data[1][0].statuses
            .concat(data[2][0].statuses)
            .concat(data[3][0].statuses),
          loading: false,
        });
      })
      .catch(function (err) {
        console.log(err);
        setState({
          ...state,
          loading: false,
        });
        setError(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function onHandleSelectChange(e: Key) {
    setState({
      ...state,
      current: {
        ...current,
        status: e.toString(),
      },
    });
  }

  function onHandleTypeChange(e: Key) {
    // console.log(statuses);
    setState({
      ...state,
      currentType: e.toString(),
    });
  }

  function onHandleActionButton(message: string, callback: () => void) {
    const result = confirm(message);
    if (result) {
      callback();
    }
  }

  function onHandleUpdate(): void {
    axios
      .put(`/api/v1/contracts/${id}`, current, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.status);
        navigate(0);
      })
      .catch((err) => {
        console.log(current);
        setError(err);
        console.log(err);
      });
  }

  function onHandleDelete() {
    axios
      .delete(`/api/v1/contracts/${id}`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(`${CONTRACTS_LINK}`);
      })
      .catch((err) => {
        setError(err);
        console.error(error);
      });
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {!state?.current ? (
        <div id="NoContractPage">
          <PageTitle text="404 - Not Found" />
          <NoSearchResultMessage
            text={`Aucun contrat trouvé avec l'ID: ${id}`}
          />
        </div>
      ) : (
        <div className="container" id="ContractPage">
          <PageTitle text={`Contrat n° ${current?.propositionNum}`} />

          <main>
            {/* INFORMATIONS GENERALES CONTRAT */}
            <h2 className="form-subtitle">
              <BiSolidInfoSquare size="45" />
              Détails
            </h2>
            <div className="input-group input-flex-group">
              <CTextField
                label="Numéro de proposition"
                name="propositionNum"
                id="propositionNum"
                type="text"
                value={current?.propositionNum?.toString()}
                isReadOnly
              />
              <CTextField
                label="Code produit"
                name="codeProduct"
                id="codeProduct"
                type="text"
                value={current?.codeProduct?.toString()}
                isReadOnly
              />
              <CSelectField
                label="Statut"
                id="status"
                name="status"
                selectedKey={current?.status}
                onSelectionChange={(e) => onHandleSelectChange(e)}
                items={statuses}
              >
                {statuses
                  .filter((s) => s.name === currentType)
                  .map((s) => {
                    return (
                      <CSelectItem id={s.name} key={s.id}>
                        {s.name}
                      </CSelectItem>
                    );
                  })}
              </CSelectField>

              <CSelectField
                label="Type de contrat"
                name="contractType"
                id="contractType"
                selectedKey={currentType}
                onSelectionChange={(e) => onHandleTypeChange(e)}
              >
                <CSelectItem id="Banque">Banque</CSelectItem>
                <CSelectItem id="Trésor">Trésor</CSelectItem>
                <CSelectItem id="Espèce">Espèce</CSelectItem>
              </CSelectField>
            </div>

            {/* INFORMATIONS CLIENT */}
            <h2 className="form-subtitle">
              <BiSolidUserDetail size="50" />
              Client
            </h2>
            <div className="input-group input-flex-group">
              <CTextField
                label="Code client"
                name="codeClient"
                id="codeClient"
                type="text"
                value={current?.codeClient}
                isReadOnly
              />
              <CTextField
                label="Nom"
                name="nameClient"
                id="nameClient"
                type="text"
                value={current?.nameClient}
                isReadOnly={!IS_ADMIN_USER}
              />
              <CTextField
                label="Téléphone"
                name="telClient"
                id="telClient"
                type="text"
                value={current?.telClient}
                isReadOnly={!IS_ADMIN_USER}
              />
              <CTextField
                label="Email"
                name="emailClient"
                id="emailClient"
                type="email"
                value={current?.emailClient}
                isReadOnly={!IS_ADMIN_USER}
              />
            </div>

            {/* INFORMATIONS PAYEUR */}
            <h2 className="form-subtitle">
              <BiSolidUserCheck size="50" />
              Payeur
            </h2>
            <div className="input-group input-flex-group">
              <CTextField
                label="Code payeur"
                name="payeurCode"
                id="payeurCode"
                type="text"
                value={current?.payeurCode?.toString()}
                isReadOnly
              />
              <CTextField
                label="Nom"
                name="namePayeur"
                id="namePayeur"
                type="text"
                value={current?.namePayeur}
                isReadOnly={!IS_ADMIN_USER}
              />
              <CTextField
                label="Surnom"
                name="surnamePayeur"
                id="surnamePayeur"
                type="text"
                value={current?.surnamePayeur}
                isReadOnly={!IS_ADMIN_USER}
              />
              <CTextField
                label="Téléphone"
                name="telPayeur"
                id="telPayeur"
                type="text"
                value={current?.telPayeur}
                isReadOnly={!IS_ADMIN_USER}
              />
            </div>

            {/* INFORMATIONS TIMELINE */}
            <h2 className="form-subtitle">
              <BiSolidCalendarEdit size="45" />
              Dates
            </h2>
            <div className="input-group input-flex-group">
              <CTextField
                label="Date de création"
                name="creationDate"
                id="creationDate"
                type="text"
                value={current?.creationDate}
                isReadOnly
              />
              <CTextField
                label="Date d'effet"
                name="effectDate"
                id="effectDate"
                type="text"
                value={current?.effectDate}
                isReadOnly={!IS_ADMIN_USER}
              />
              <CTextField
                label="Date d'expiration"
                name="expiryDate"
                id="expiryDate"
                type="text"
                value={current?.expiryDate}
                isReadOnly={!IS_ADMIN_USER}
              />
            </div>

            {/* INFORMATIONS AGENTS */}
            <h2 className="form-subtitle">
              <BiSolidUserPlus size="50" />
              Agents
            </h2>
            <div className="input-group input-flex-group">
              <CTextField
                label="Nom du redacteur"
                name="nameRedac"
                id="nameRedac"
                type="text"
                value={current?.nameRedac}
                isReadOnly
              />
              <CTextField
                label="Code agent"
                name="codeAgent"
                id="codeAgent"
                type="text"
                value={current?.codeAgent?.toString()}
                isReadOnly
              />
            </div>
          </main>

          {error && <ErrorMessage error={error[0]} />}
          {error && <ErrorMessage error={error[1]} />}

          <div className="action-buttons">
            <Button
              className="action-button update-button"
              onPress={() =>
                onHandleActionButton(
                  "Etes-vous sûr(e) de vouloir modifier ce contrat ?",
                  onHandleUpdate
                )
              }
            >
              APPLIQUER LES MODIFICATIONS
            </Button>

            <Button
              className="action-button delete-button"
              onPress={() =>
                onHandleActionButton(
                  "Voulez-vous vraiment supprimer ce contrat?",
                  onHandleDelete
                )
              }
            >
              SUPPRIMER LE CONTRAT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractDetail;
