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
    document.body.style.backgroundColor = "#fcdfff";

    // Fetch
    fetch("/INPUTS.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        // console.log(response);
        return response.json();
      })

      .then(function (myJson) {
        const filtered: Contract = myJson.filter(
          (c: Contract) => c.propositionNum.toString() === id
        )[0];
        setState({
          ...state,
          current: filtered,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      {state?.current === undefined ? (
        <div id="NoContractPage">
          <PageTitle text="404 Not Found" />
          <NoSearchResultMessage
            text={`Aucun contrat trouvé avec l'ID: ${id}`}
          />
        </div>
      ) : (
        <div className="container" id="ContractPage">
          <PageTitle text={`Contract n° ${state.current.propositionNum}`} />

          <main>
            {/* INFORMATIONS GENERALES CONTRAT */}
            <h2 className="form-subtitle">
              <BiSolidInfoSquare size="45" />
              Détails
            </h2>
            <div className="input-group input-flex-group">
              <TextField
                label="propositionNum"
                name="propositionNum"
                id="propositionNum"
                type="text"
                value={state.current.propositionNum}
              />
              <TextField
                label="codeProduct"
                name="codeProduct"
                id="codeProduct"
                type="text"
                value={state.current.codeProduct}
              />
              <TextField
                label="status"
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
                label="codeClient"
                name="codeClient"
                id="codeClient"
                type="text"
                value={state.current.codeClient}
              />
              <TextField
                label="nameClient"
                name="nameClient"
                id="nameClient"
                type="text"
                value={state.current.nameClient}
              />
              <TextField
                label="telClient"
                name="telClient"
                id="telClient"
                type="text"
                value={state.current.telClient}
              />
              <TextField
                label="emailClient"
                name="emailClient"
                id="emailClient"
                type="text"
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
                label="payeurCode"
                name="payeurCode"
                id="payeurCode"
                type="text"
                value={state.current.payeurCode}
              />
              <TextField
                label="namePayeur"
                name="namePayeur"
                id="namePayeur"
                type="text"
                value={state.current.namePayeur}
              />
              <TextField
                label="surnamePayeur"
                name="surnamePayeur"
                id="surnamePayeur"
                type="text"
                value={state.current.surnamePayeur}
              />
              <TextField
                label="telPayeur"
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
                label="creationDate"
                name="creationDate"
                id="creationDate"
                type="text"
                value={state.current.creationDate}
              />
              <TextField
                label="effectDate"
                name="effectDate"
                id="effectDate"
                type="text"
                value={state.current.effectDate}
              />
              <TextField
                label="expiryDate"
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
                label="nameRedac"
                name="nameRedac"
                id="nameRedac"
                type="text"
                value={state.current.nameRedac}
              />
              <TextField
                label="codeAgent"
                name="codeAgent"
                id="codeAgent"
                type="text"
                value={state.current.codeAgent}
              />
            </div>
          </main>

          <Button
            className="delete-button"
            onPress={() =>
              confirm("Etes-vous sûr(e) de vouloir supprimer ce contrat ?")
            }
          >
            SUPPRIMER LE CONTRAT
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContractDetail;
