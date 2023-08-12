import { ChangeEvent, useState } from "react";
import PageTitle from "../components/PageTitle";
import { Button } from "react-aria-components";
import { BASE_BACKEND_URL } from "../utils/URLS";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CONTRACTS_LINK } from "../routes/links";
import "../styles/mass-add.scss";
import { AiFillFileAdd } from "react-icons/ai";

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

    // 👇 Uploading the file using the fetch API to the server
    axios
      .post(`${BASE_BACKEND_URL}`, {
        method: "POST",
        body: file,
        // 👇 Set headers manually for single file upload
        headers: {
          "content-type": file.type,
          "content-length": `${file.size}`, // 👈 Headers need to be a string
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(`${CONTRACTS_LINK}`);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        alert("Une erreur s'est produite");
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
        <div className="error-notification">
          <p className="error-message">
            Une erreur s'est produite. Merci de contacter votre administrateur
            et vous assurer que la procédure a été respectée.
          </p>
          <div className="error-content">
            <p>Fichier: {file?.name}</p>
            <p>Message: {error.message}</p>
            <p>Code erreur: {error.name}</p>
            {/* <p>Code erreur: {error.stack}</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MassAdd;
