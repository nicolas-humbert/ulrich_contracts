import { useEffect, useState } from "react";

import { Contract } from "../types/Contract";
import ContractRow from "../components/ContractRow";

import { FaSearch } from "react-icons/fa";
import "../styles/table.scss";
import "../styles/contracts-page.scss";

const Contracts = () => {
  const [state, setState] = useState<Contract[]>();
  const [query, setquery] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setquery(e.target.value);
  };

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
    <div id="ContractsPage">
      <div className="contracts-header">
        <h1 className="contracts-main-title">Contracts</h1>

        <FaSearch size="50" />
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Chercher un client..."
        />
      </div>

      {/* See styles/table.scss everything regarding this element style */}
      <main className="main-table-wrapper" id="MainTable">
        <table className="main-table">
          <thead>
            <tr>
              <th>Proposition</th>
              <th>Produit</th>
              <th>Id Client</th>
              <th>Id Payeur</th>
              <th>Nom Client</th>
              <th>Nom Payeur</th>
              {/* <th>Creation</th> */}
              {/* <th>Effet</th> */}
              {/* <th>Expiration</th> */}
              <th>Code Agent</th>
              <th>Redacteur</th>
              <th>Bureau</th>
              <th>Status</th>
              <th>Type</th>
              {/* <th>agentsid_agent</th> */}
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {state?.map((s, id) => {
              if (s.proposition_num) {
                console.log(id);
                return (
                  <ContractRow
                    contract={s}
                    className={id % 2 == 0 ? "evenRow" : "oddRow"}
                    key={id}
                  />
                );
              }
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Contracts;
