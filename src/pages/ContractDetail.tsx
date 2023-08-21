import { useState, useEffect, Key } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CONTRACTS_LINK } from "../routes/links";
import { Contract, ContractType } from "../types/Contract";
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
import { nanoid } from "nanoid";

type ContractPageState = {
  currentContract?: Contract;
  types: ContractType[];
  currentType?: ContractType;
  loading: boolean;
};

const ContractDetail = () => {
  const [state, setState] = useState<ContractPageState>({
    currentContract: undefined,
    loading: true,
    types: [],
    currentType: undefined,
  });
  const [error, setError] = useState<Error[]>();

  const { currentContract, types, currentType, loading } = state;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = [
      `/api/v1/contracts/${id}`,
      `/api/v1/contracts/contract-type-with-status`,
    ];

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "ngrok-skip-browser-warning": "69420",
    };

    Promise.all([
      fetch(urls[0], { headers: headers }),
      fetch(urls[1], { headers: headers }),
    ])
      .then(function (responses) {
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {
        const type = data[0].type - 1;
        setState({
          ...state,
          currentContract: data[0],
          types: data[1],
          currentType: data[1][type],
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

  function onHandleActionButton(message: string, callback: () => void) {
    const result = confirm(message);
    if (result) {
      callback();
    }
  }

  function switchTypeForUpdate(type: string): number {
    let res;
    switch (type) {
      case "Espèce":
        res = 1;
        break;
      case "Banque":
        res = 2;
        break;
      case "Trésor":
        res = 3;
        break;
      default:
        res = 4;
        break;
    }
    return res;
  }

  function onHandleUpdate(): void {
    axios
      .put(`/api/v1/contracts/${id}`, currentContract, {
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
        // console.log(response.data);
        navigate(`${CONTRACTS_LINK}`);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  }

  if (loading) {
    return <Spinner />;
  }

  function onHandleStatusChange(e: Key) {
    setState({
      ...state,
      currentContract: {
        ...currentContract,
        status: e.toString(),
      },
    });
  }

  function onHandleTypeChange(e: Key) {
    // console.log(currentContract);
    const newType = switchTypeForUpdate(e.toString());
    console.log(currentContract);
    setState({
      ...state,
      currentType: types.filter((t) => t.typeName === e)[0],
      currentContract: {
        ...currentContract,
        type: newType,
        status: "",
      },
    });
  }

  return (
    <div>
      {!currentContract ? (
        <div id="NoContractPage">
          <PageTitle text="404 - Not Found" />
          <NoSearchResultMessage
            text={`Aucun contrat trouvé avec l'ID: ${id}`}
          />
        </div>
      ) : (
        <div className="container" id="ContractPage">
          <PageTitle text={`Contrat n° ${currentContract?.propositionNum}`} />

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
                value={currentContract?.propositionNum?.toString()}
                isReadOnly
              />
              <CTextField
                label="Code produit"
                name="codeProduct"
                id="codeProduct"
                type="text"
                value={currentContract?.codeProduct?.toString()}
                isReadOnly
              />

              <CSelectField
                label="Type de contrat"
                name="type"
                id="type"
                selectedKey={currentType?.typeName}
                onSelectionChange={(e) => onHandleTypeChange(e)}
              >
                {types.map((t) => {
                  return (
                    <CSelectItem id={t.typeName} key={nanoid()}>
                      {t.typeName}
                    </CSelectItem>
                  );
                })}
              </CSelectField>

              {currentType && (
                <CSelectField
                  label="Statut"
                  id="status"
                  name="status"
                  selectedKey={currentContract?.status}
                  onSelectionChange={(e) => onHandleStatusChange(e)}
                >
                  {currentType?.statuses.map((s) => {
                    return (
                      <CSelectItem id={s} key={nanoid()}>
                        {s}
                      </CSelectItem>
                    );
                  })}
                </CSelectField>
              )}
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
                value={currentContract?.codeClient}
                isReadOnly
              />
              <CTextField
                label="Nom"
                name="nameClient"
                id="nameClient"
                type="text"
                value={currentContract?.nameClient}
                isReadOnly={!IS_ADMIN_USER}
              />
              <CTextField
                label="Téléphone"
                name="telClient"
                id="telClient"
                type="text"
                value={currentContract?.telClient}
                isReadOnly={!IS_ADMIN_USER}
              />
              <CTextField
                label="Email"
                name="emailClient"
                id="emailClient"
                type="email"
                value={currentContract?.emailClient}
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
                value={currentContract?.payeurCode?.toString()}
                isReadOnly
              />
              <CTextField
                label="Nom"
                name="namePayeur"
                id="namePayeur"
                type="text"
                value={currentContract?.namePayeur}
                isReadOnly={!IS_ADMIN_USER}
              />
              <CTextField
                label="Surnom"
                name="surnamePayeur"
                id="surnamePayeur"
                type="text"
                value={currentContract?.surnamePayeur}
                isReadOnly={!IS_ADMIN_USER}
              />
              <CTextField
                label="Téléphone"
                name="telPayeur"
                id="telPayeur"
                type="text"
                value={currentContract?.telPayeur}
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
                value={currentContract?.creationDate}
                isReadOnly
              />
              <CTextField
                label="Date d'effet"
                name="effectDate"
                id="effectDate"
                type="text"
                value={currentContract?.effectDate}
                isReadOnly={!IS_ADMIN_USER}
              />
              <CTextField
                label="Date d'expiration"
                name="expiryDate"
                id="expiryDate"
                type="text"
                value={currentContract?.expiryDate}
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
                value={currentContract?.nameRedac}
                isReadOnly
              />
              <CTextField
                label="Code agent"
                name="codeAgent"
                id="codeAgent"
                type="text"
                value={currentContract?.codeAgent?.toString()}
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
