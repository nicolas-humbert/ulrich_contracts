import { useEffect, useState } from "react";
import { Contract } from "../types/Contract";
import ContractRow from "../components/ContractRow";

const Home = () => {
  const [state, setState] = useState<Contract[]>();

  const getData = () => {
    fetch("./INPUTS.json", {
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
        setState(myJson);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Proposition ID</th>
            <th>Produit</th>
            <th>Code Client</th>
            <th>Code Payeur</th>
            <th>Nom Client</th>
            <th>Nom Payeur</th>
            <th>Creation</th>
            <th>Effet</th>
            <th>Expiration</th>
            <th>Code Agent</th>
            <th>Nom Redacteur</th>
            <th>Bureau ID</th>
            <th>Status</th>
            <th>Type</th>
            <th>agentsid_agent</th>
          </tr>
        </thead>
        <tbody>
          {state?.map((s, id) => {
            return <ContractRow {...s} key={id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
