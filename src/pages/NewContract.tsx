import { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CONTRACTS_LINK } from "../routes/links";
import { Button } from "react-aria-components";
import PageTitle from "../components/PageTitle";
import CTextField from "../components/CTextField";
import { FaProductHunt } from "react-icons/fa";
import { FiUserCheck, FiUserMinus, FiUsers } from "react-icons/fi";
import { AddContractRequest } from "../types/AddContractRequest";
import "../styles/new-contract-page.scss";

const NewContract = () => {
  const [state, setState] = useState<AddContractRequest>({
    propositionNum: "",
    codeProduct: "",
    nameClient: "",
    telClient: "",
    emailClient: "",
    codeClient: "",
    payeurCode: "",
    namePayeur: "",
    surnamePayeur: "",
    telPayeur: "",
    nameRedac: "",
    codeAgent: "",
  });

  const navigate = useNavigate();

  const onSendingPostRequest = (data: AddContractRequest) => {
    axios
      .post(`/api/v1/contracts`, data, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
        navigate(`${CONTRACTS_LINK}/${response.data.id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const date = new Date().toISOString();
    // const y = date.getFullYear();
    // const m = date.getMonth();
    // const d = date.getDate();
    // const formattedDate: string = `${y}-${m}-${d}`;
    const dataToSubmit = {
      ...state,
      creationDate: date,
      effectDate: date,
      expiryDate: date,
      status: "Nouveau",
    };

    onSendingPostRequest(dataToSubmit);
  };

  const handleInputChange = (e: string, stateProp: string) => {
    setState({
      ...state,
      [stateProp]: e,
    });
  };

  return (
    <div id="NewContractPage">
      <PageTitle text="Nouveau contrat" />

      <form
        method="POST"
        noValidate
        name="add-new-contract"
        id="add-new-contract"
        onSubmit={handleSubmit}
      >
        <h2 className="form-subtitle">
          <FaProductHunt size="30" />
          Produit
        </h2>
        <div className="input-group input-flex-group">
          <CTextField
            isRequired
            label="Numéro de proposition"
            autoFocus
            id="propositionNum"
            name="propositionNum"
            onChange={(e) => handleInputChange(e, "propositionNum")}
          />
          <CTextField
            isRequired
            label="Code Produit"
            id="codeProduct"
            name="codeProduct"
            onChange={(e) => handleInputChange(e, "codeProduct")}
          />
        </div>

        <h2 className="form-subtitle">
          <FiUserCheck size="40" />
          Client
        </h2>
        <div className="input-group input-flex-group">
          <CTextField
            isRequired
            label="Nom"
            id="nameClient"
            name="nameClient"
            onChange={(e) => handleInputChange(e, "nameClient")}
          />
          <CTextField
            isRequired
            label="Téléphone"
            id="telClient"
            name="telClient"
            onChange={(e) => handleInputChange(e, "telClient")}
          />
          <CTextField
            isRequired
            label="Email"
            id="emailClient"
            name="emailClient"
            onChange={(e) => handleInputChange(e, "emailClient")}
          />
          <CTextField
            isRequired
            label="Identifiant"
            id="codeClient"
            name="codeClient"
            onChange={(e) => handleInputChange(e, "codeClient")}
          />
        </div>

        <h2 className="form-subtitle">
          <FiUserMinus size="40" />
          Payeur
        </h2>
        <div className="input-group input-flex-group">
          <CTextField
            isRequired
            label="Nom"
            id="namePayeur"
            name="namePayeur"
            onChange={(e) => handleInputChange(e, "namePayeur")}
          />
          <CTextField
            isRequired
            label="Téléphone"
            id="telPayeur"
            name="telPayeur"
            onChange={(e) => handleInputChange(e, "telPayeur")}
          />
          <CTextField
            isRequired
            label="Surnom"
            id="surnamePayeur"
            name="surnamePayeur"
            onChange={(e) => handleInputChange(e, "surnamePayeur")}
          />
          <CTextField
            isRequired
            label="Identifiant"
            id="payeurCode"
            name="payeurCode"
            onChange={(e) => handleInputChange(e, "payeurCode")}
          />
        </div>

        <h2 className="form-subtitle">
          <FiUsers size="40" />
          Agent
        </h2>
        <div className="input-group input-flex-group">
          <CTextField
            isRequired
            label="Nom du rédacteur"
            id="nameRedac"
            name="nameRedac"
            onChange={(e) => handleInputChange(e, "nameRedac")}
          />
          <CTextField
            isRequired
            label="Identifiant"
            id="codeAgent"
            name="codeAgent"
            onChange={(e) => handleInputChange(e, "codeAgent")}
          />
        </div>
      </form>
      <div className="action-buttons">
        <Button
          type="reset"
          form="add-new-contract"
          className="action-button delete-button"
        >
          Effacer
        </Button>
        <Button
          type="submit"
          form="add-new-contract"
          className="action-button validate-button"
        >
          Soumettre
        </Button>
      </div>
    </div>
  );
};

export default NewContract;
