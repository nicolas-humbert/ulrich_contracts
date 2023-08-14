import { useState, useEffect, Key } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CONTRACTS_LINK } from "../routes/links";
import { BASE_BACKEND_URL } from "../utils/URLS";
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

type ContractPageState = {
  current?: Contract;
  loading: boolean;
};

const ContractDetail = () => {
  const [state, setState] = useState<ContractPageState>({
    current: undefined,
    loading: true,
  });
  const [error, setError] = useState<Error>();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setState;
    // Fetch
    function fetchContract() {
      axios
        .get(`/api/v1/contracts/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        })
        .then((response) => {
          {
            // console.log(state?.current);
            setState({
              current: response.data,
              loading: false,
            });
          }
        })
        .catch((err) => {
          setState({
            ...state,
            loading: false,
          });
          setError(err);
          throw error;
        });
    }

    fetchContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function onHandleSelectChange(e: Key) {
    setState({
      ...state,
      current: {
        ...state.current,
        status: e.toString(),
      },
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
      .put(`/api/v1/uContracts/${id}`, state.current, {
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
        console.log(state.current);
        setError(err);
        console.log(err);
      });
  }

  function onHandleDelete() {
    axios
      .delete(`/api/v1/dContracts/${id}`, {
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

  if (state.loading) {
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
          <PageTitle text={`Contrat n° ${state.current.propositionNum}`} />

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
                value={state.current.propositionNum?.toString()}
                isReadOnly
              />
              <CTextField
                label="Code produit"
                name="codeProduct"
                id="codeProduct"
                type="text"
                value={state.current.codeProduct?.toString()}
                isReadOnly
              />
              <CSelectField
                label="Statut"
                id="status"
                name="status"
                selectedKey={state.current.status}
                onSelectionChange={(e) => onHandleSelectChange(e)}
              >
                <CSelectItem id="Nouveau" key={1}>
                  Nouveau
                </CSelectItem>
                <CSelectItem id="En cours" key={2}>
                  En cours
                </CSelectItem>
                <CSelectItem id="Fermé" key={3}>
                  Fermé
                </CSelectItem>
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
                value={state.current.codeClient}
                isReadOnly
              />
              <CTextField
                label="Nom"
                name="nameClient"
                id="nameClient"
                type="text"
                value={state.current.nameClient}
                isReadOnly={!IS_ADMIN_USER}
              />
              <CTextField
                label="Téléphone"
                name="telClient"
                id="telClient"
                type="text"
                value={state.current.telClient}
                isReadOnly={!IS_ADMIN_USER}
              />
              <CTextField
                label="Email"
                name="emailClient"
                id="emailClient"
                type="email"
                value={state.current.emailClient}
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
                value={state.current.payeurCode?.toString()}
                isReadOnly
              />
              <CTextField
                label="Nom"
                name="namePayeur"
                id="namePayeur"
                type="text"
                value={state.current.namePayeur}
                isReadOnly={!IS_ADMIN_USER}
              />
              <CTextField
                label="Surnom"
                name="surnamePayeur"
                id="surnamePayeur"
                type="text"
                value={state.current.surnamePayeur}
                isReadOnly={!IS_ADMIN_USER}
              />
              <CTextField
                label="Téléphone"
                name="telPayeur"
                id="telPayeur"
                type="text"
                value={state.current.telPayeur}
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
                value={state.current.creationDate}
                isReadOnly
              />
              <CTextField
                label="Date d'effet"
                name="effectDate"
                id="effectDate"
                type="text"
                value={state.current.effectDate}
                isReadOnly={!IS_ADMIN_USER}
              />
              <CTextField
                label="Date d'expiration"
                name="expiryDate"
                id="expiryDate"
                type="text"
                value={state.current.expiryDate}
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
                value={state.current.nameRedac}
                isReadOnly
              />
              <CTextField
                label="Code agent"
                name="codeAgent"
                id="codeAgent"
                type="text"
                value={state.current.codeAgent?.toString()}
                isReadOnly
              />
            </div>
          </main>

          {error && <ErrorMessage error={error} />}

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
