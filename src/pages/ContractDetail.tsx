import React, { useState, useEffect } from "react";
import { Contract } from "../types/Contract";
import { useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import "../styles/contract-detail-page.scss";
import NoSearchResultMessage from "../components/NoSearchResultMessage";
import CTextField from "../components/CTextField";
import {
  BiSolidCalendarEdit,
  BiSolidInfoSquare,
  BiSolidUserCheck,
  BiSolidUserDetail,
  BiSolidUserPlus,
} from "react-icons/bi";
import { Button } from "react-aria-components";

type ContractPageState = {
  current: Contract;
};

const ContractDetail = () => {
  const [state, setState] = useState<ContractPageState>();

  const { id } = useParams();

  useEffect(() => {
    // Changes color of the body to be less agressive on this page
    // Uses $tertiaryColor defined in src/styles/constants.scss
    // document.body.style.backgroundColor = "#fcdfff";

    // Fetch
    async function fetchContract() {
      await fetch(`http://localhost:5111/api/Contract/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          {
            console.log(state?.current);
            setState({
              current: data,
            });
          }
        })
        .catch((error) => {
          throw error;
        });
    }

    fetchContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      {!state?.current.id ? (
        <div id="NoContractPage">
          <PageTitle text="404 Not Found" />
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
              onPress={() =>
                confirm("Etes-vous sûr(e) de vouloir supprimer ce contrat ?")
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
