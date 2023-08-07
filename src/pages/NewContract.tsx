import { FormEvent, useState } from "react";
import PageTitle from "../components/PageTitle";
import "../styles/new-contract-page.scss";
import TextField from "../components/TextField";
import { AddContractRequest } from "../types/AddContractRequest";
import { Button } from "react-aria-components";
import { useNavigate } from "react-router-dom";
import { CONTRACTS_LINK } from "../routes/links";
import { FaProductHunt } from "react-icons/fa";
import { FiUserCheck, FiUserMinus, FiUsers } from "react-icons/fi";
import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/URLS";

const NewContract = () => {
  const [state, setState] = useState<AddContractRequest>({
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
      .post(`${BASE_BACKEND_URL}/api/Contract`, data)
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

    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    const currentDate = `${day}-${month}-${year}`;

    const dataToSubmit = {
      ...state,
      creationDate: currentDate,
      effectDate: currentDate,
      expiryDate: currentDate,
      status: 0,
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
        <div className="input-group">
          <TextField
            isRequired
            label="Code Produit"
            autoFocus
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
          <TextField
            isRequired
            label="Nom"
            autoFocus
            id="nameClient"
            name="nameClient"
            onChange={(e) => handleInputChange(e, "nameClient")}
          />
          <TextField
            isRequired
            label="Téléphone"
            autoFocus
            id="telClient"
            name="telClient"
            onChange={(e) => handleInputChange(e, "telClient")}
          />
          <TextField
            isRequired
            label="Email"
            autoFocus
            id="emailClient"
            name="emailClient"
            onChange={(e) => handleInputChange(e, "emailClient")}
          />
          <TextField
            isRequired
            label="Identifiant"
            autoFocus
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
          <TextField
            isRequired
            label="Nom"
            autoFocus
            id="namePayeur"
            name="namePayeur"
            onChange={(e) => handleInputChange(e, "namePayeur")}
          />
          <TextField
            isRequired
            label="Téléphone"
            autoFocus
            id="telPayeur"
            name="telPayeur"
            onChange={(e) => handleInputChange(e, "telPayeur")}
          />
          <TextField
            isRequired
            label="Surnom"
            autoFocus
            id="surnamePayeur"
            name="surnamePayeur"
            onChange={(e) => handleInputChange(e, "surnamePayeur")}
          />
          <TextField
            isRequired
            label="Identifiant"
            autoFocus
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
          <TextField
            isRequired
            label="Nom du rédacteur"
            autoFocus
            id="nameRedac"
            name="nameRedac"
            onChange={(e) => handleInputChange(e, "nameRedac")}
          />
          <TextField
            isRequired
            label="Identifiant"
            autoFocus
            id="codeAgent"
            name="codeAgent"
            onChange={(e) => handleInputChange(e, "codeAgent")}
          />
        </div>
      </form>
      <Button type="submit" form="add-new-contract">
        Soumettre
      </Button>
    </div>
  );
};

export default NewContract;
