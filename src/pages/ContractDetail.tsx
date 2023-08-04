import React, { useState, useEffect } from "react";
import { Contract } from "../types/Contract";
import { useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import "../styles/contract-detail-page.scss";
import NoSearchResultMessage from "../components/NoSearchResultMessage";
import TextField from "../components/TextField";
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
    // fetch("/INPUTS.json", {
    async function fetchContract() {
      await fetch(`http://localhost:5168/api/Contract/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) =>
          setState({
            current: data,
          })
        )
        .catch((error) => {
          throw error;
        });
    }

    fetchContract();

    console.log(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      {!state?.current.propositionNum ? (
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
              <TextField
                label="Numéro de proposition"
                name="propositionNum"
                id="propositionNum"
                type="text"
                value={state.current.propositionNum}
                isReadOnly
              />
              <TextField
                label="Code produit"
                name="codeProduct"
                id="codeProduct"
                type="text"
                value={state.current.codeProduct}
                isReadOnly
              />
              <TextField
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
              <TextField
                label="Code client"
                name="codeClient"
                id="codeClient"
                type="text"
                value={state.current.codeClient}
                isReadOnly
              />
              <TextField
                label="Nom"
                name="nameClient"
                id="nameClient"
                type="text"
                value={state.current.nameClient}
              />
              <TextField
                label="Téléphone"
                name="telClient"
                id="telClient"
                type="text"
                value={state.current.telClient}
              />
              <TextField
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
              <TextField
                label="Code payeur"
                name="payeurCode"
                id="payeurCode"
                type="text"
                value={state.current.payeurCode}
                isReadOnly
              />
              <TextField
                label="Nom"
                name="namePayeur"
                id="namePayeur"
                type="text"
                value={state.current.namePayeur}
              />
              <TextField
                label="Surnom"
                name="surnamePayeur"
                id="surnamePayeur"
                type="text"
                value={state.current.surnamePayeur}
              />
              <TextField
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
              <TextField
                label="Date de création"
                name="creationDate"
                id="creationDate"
                type="text"
                value={state.current.creationDate}
                isReadOnly
              />
              <TextField
                label="Date d'effet"
                name="effectDate"
                id="effectDate"
                type="text"
                value={state.current.effectDate}
              />
              <TextField
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
              <TextField
                label="Nom du redacteur"
                name="nameRedac"
                id="nameRedac"
                type="text"
                value={state.current.nameRedac}
                isReadOnly
              />
              <TextField
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
