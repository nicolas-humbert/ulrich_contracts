import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CONTRACTS_LINK } from "../routes/links";
import { BASE_BACKEND_URL } from "../utils/URLS";
import { Contract } from "../types/Contract";
import { Button } from "react-aria-components";
import Spinner from "../components/Spinner";
import PageTitle from "../components/PageTitle";
import CTextField from "../components/CTextField";
import NoSearchResultMessage from "../components/NoSearchResultMessage";
import {
  BiSolidCalendarEdit,
  BiSolidInfoSquare,
  BiSolidUserCheck,
  BiSolidUserDetail,
  BiSolidUserPlus,
} from "react-icons/bi";
import "../styles/contract-detail-page.scss";

type ContractPageState = {
  current?: Contract;
  loading: boolean;
};

const ContractDetail = () => {
  const [state, setState] = useState<ContractPageState>({
    current: undefined,
    loading: true,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setState;
    // Fetch
    function fetchContract() {
      axios
        .get(`${BASE_BACKEND_URL}/api/Contract/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
        .catch((error) => {
          setState({
            ...state,
            loading: false,
          });
          throw error;
        });
    }

    fetchContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function onHandleDelete() {
    axios
      .delete(`${BASE_BACKEND_URL}/api/Contract/${id}`)
      .then((response) => {
        console.log(response.data);
        navigate(`${CONTRACTS_LINK}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function onHandlePressDeleteButton(): void {
    const result = confirm("Voulez-vous vraiment supprimer ce contrat?");
    if (result == true) {
      onHandleDelete();
    }
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
                value={state.current.propositionNum}
                isReadOnly
              />
              <CTextField
                label="Code produit"
                name="codeProduct"
                id="codeProduct"
                type="text"
                value={state.current.codeProduct}
                isReadOnly
              />
              <CTextField
                label="Statut"
                name="status"
                id="status"
                type="text"
                value={state.current.status}
              />
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
              />
              <CTextField
                label="Téléphone"
                name="telClient"
                id="telClient"
                type="text"
                value={state.current.telClient}
              />
              <CTextField
                label="Email"
                name="emailClient"
                id="emailClient"
                type="email"
                value={state.current.emailClient}
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
                value={state.current.payeurCode}
                isReadOnly
              />
              <CTextField
                label="Nom"
                name="namePayeur"
                id="namePayeur"
                type="text"
                value={state.current.namePayeur}
              />
              <CTextField
                label="Surnom"
                name="surnamePayeur"
                id="surnamePayeur"
                type="text"
                value={state.current.surnamePayeur}
              />
              <CTextField
                label="Téléphone"
                name="telPayeur"
                id="telPayeur"
                type="text"
                value={state.current.telPayeur}
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
              />
              <CTextField
                label="Date d'expiration"
                name="expiryDate"
                id="expiryDate"
                type="text"
                value={state.current.expiryDate}
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
                value={state.current.codeAgent}
                isReadOnly
              />
            </div>
          </main>

          <div className="action-buttons">
            <Button
              className="action-button update-button"
              onPress={() =>
                confirm("Etes-vous sûr(e) de vouloir modifier ce contrat ?")
              }
            >
              APPLIQUER LES MODIFICATIONS
            </Button>

            <Button
              className="action-button delete-button"
              onPress={onHandlePressDeleteButton}
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
