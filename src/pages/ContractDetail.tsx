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
          (c: Contract) => c.proposition_num.toString() === id
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
          <PageTitle text={`Contract n° ${state.current.proposition_num}`} />

          <main>
            {/* INFORMATIONS GENERALES CONTRAT */}
            <h2 className="form-subtitle">
              <BiSolidInfoSquare size="45" />
              Détails
            </h2>
            <div className="input-group input-flex-group">
              <TextField
                label="proposition_num"
                name="proposition_num"
                id="proposition_num"
                type="text"
                value={state.current.proposition_num}
              />
              <TextField
                label="code_product"
                name="code_product"
                id="code_product"
                type="text"
                value={state.current.code_product}
              />
              <TextField
                label="contract_statusid_c_status"
                name="contract_statusid_c_status"
                id="contract_statusid_c_status"
                type="text"
                value={state.current.contract_statusid_c_status}
              />
              <TextField
                label="contracts_typeid_contract_type"
                name="contracts_typeid_contract_type"
                id="contracts_typeid_contract_type"
                type="text"
                value={state.current.contracts_typeid_contract_type}
              />
            </div>

            {/* INFORMATIONS CLIENT */}
            <h2 className="form-subtitle">
              <BiSolidUserDetail size="50" />
              Client
            </h2>
            <div className="input-group input-flex-group">
              <TextField
                label="client_code"
                name="client_code"
                id="client_code"
                type="text"
                value={state.current.client_code}
              />
              <TextField
                label="name_client"
                name="name_client"
                id="name_client"
                type="text"
                value={state.current.name_client}
              />
            </div>

            {/* INFORMATIONS PAYEUR */}
            <h2 className="form-subtitle">
              <BiSolidUserCheck size="50" />
              Payeur
            </h2>
            <div className="input-group input-flex-group">
              <TextField
                label="payeur_code"
                name="payeur_code"
                id="payeur_code"
                type="text"
                value={state.current.payeur_code}
              />
              <TextField
                label="name_payeur"
                name="name_payeur"
                id="name_payeur"
                type="text"
                value={state.current.name_payeur}
              />
            </div>

            {/* INFORMATIONS TIMELINE */}
            <h2 className="form-subtitle">
              <BiSolidCalendarEdit size="45" />
              Dates
            </h2>
            <div className="input-group input-flex-group">
              <TextField
                label="creation_date"
                name="creation_date"
                id="creation_date"
                type="text"
                value={state.current.creation_date}
              />
              <TextField
                label="effect_date"
                name="effect_date"
                id="effect_date"
                type="text"
                value={state.current.effect_date}
              />
              <TextField
                label="expiry_date"
                name="expiry_date"
                id="expiry_date"
                type="text"
                value={state.current.expiry_date}
              />
            </div>

            {/* INFORMATIONS AGENTS */}
            <h2 className="form-subtitle">
              <BiSolidUserPlus size="50" />
              Agents
            </h2>
            <div className="input-group input-flex-group">
              <TextField
                label="code_agent"
                name="code_agent"
                id="code_agent"
                type="text"
                value={state.current.code_agent}
              />
              <TextField
                label="name_redac"
                name="name_redac"
                id="name_redac"
                type="text"
                value={state.current.name_redac}
              />
              <TextField
                label="officeid_bur_dir"
                name="officeid_bur_dir"
                id="officeid_bur_dir"
                type="text"
                value={state.current.officeid_bur_dir}
              />
              <TextField
                label="agentsid_agent"
                name="agentsid_agent"
                id="agentsid_agent"
                type="text"
                value={state.current.agentsid_agent}
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
