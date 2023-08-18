import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CONTRACTS_LINK } from "../routes/links";
import { Button } from "react-aria-components";
import PageTitle from "../components/PageTitle";
import { AiFillFileAdd } from "react-icons/ai";
import "../styles/mass-add.scss";
import "../styles/error.scss";
import ErrorMessage from "../components/ErrorMessage";

const MassAdd = () => {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<Error>();

  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", file);

    // 👇 Uploading the file using the fetch API to the server
    axios
      .post(`/api/v1/GetContractsFromCsv`, formData)
      .then((response) => {
        console.log(response.data);
        navigate(`${CONTRACTS_LINK}`);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  return (
    <div id="MassAdd">
      <PageTitle text="Ajout via fichier CSV" />

      <form action="POST" className="mass-add-form">
        <div className="file-selector">
          <label htmlFor="file">
            <AiFillFileAdd size="40" /> Fichier
          </label>
          <input
            type="file"
            accept=".csv"
            className="inputfile"
            onChange={handleFileChange}
          />
        </div>

        <Button
          className="action-button update-button"
          onPress={handleUploadClick}
        >
          Envoyer
        </Button>
      </form>

      {error && (
        <ErrorMessage error={error}>
          <p>Fichier: {file?.name}</p>
        </ErrorMessage>
      )}
    </div>
  );
};

export default MassAdd;
