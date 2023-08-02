import React, { useState, useEffect } from "react";
import { Contract } from "../types/Contract";
import { useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import "../styles/contract-detail-page.scss";
import NoSearchResultMessage from "../components/NoSearchResultMessage";
import TextField from "../components/TextField";

type ContractPageState = {
  current: Contract;
};

const ContractDetail = () => {
  const [state, setState] = useState<ContractPageState>();

  const { id } = useParams();

  useEffect(() => {
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
            <h2 className="form-subtitle">Détails</h2>

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

            {/* INFORMATIONS CLIENT */}
            <h2 className="form-subtitle">Client</h2>

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

            {/* INFORMATIONS CLIENT */}
            <h2 className="form-subtitle">Payeur</h2>

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

            {/* INFORMATIONS TIMELINE */}
            <h2 className="form-subtitle">Dates</h2>
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

            {/* INFORMATIONS AGENTS */}
            <h2 className="form-subtitle">Agents</h2>

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
          </main>
        </div>
      )}
    </div>
  );
};

export default ContractDetail;
