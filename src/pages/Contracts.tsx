import { useEffect, useState } from "react";

import { Contract } from "../types/Contract";
import ContractRow from "../components/ContractRow";

import { FaSearch } from "react-icons/fa";
import "../styles/table.scss";
import "../styles/contracts-page.scss";

type ContractsPageState = {
  data: Contract[];
  query: string;
  filtered: Contract[];
};

const Contracts = () => {
  const [state, setState] = useState<ContractsPageState>({
    data: [],
    query: "",
    filtered: [],
  });

  // -----------------------------------------------------------------
  // Older version of handleChange, searching only for clients names
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleChange = (e: any) => {
  //   const results = state.data.filter((row) => {
  //     if (e.target.value === "") return state.data;
  //     return row.name_client
  //       .toLowerCase()
  //       .includes(e.target.value.toLowerCase());
  //   });
  //   setState({
  //     ...state,
  //     query: e.target.value,
  //     filtered: results,
  //   });
  // };
  // ----------------------------------------------------------------

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const results: Contract[] = [];

    for (let i = 0; i < state.data.length; i++) {
      const contractAsArray = Object.entries(state.data[i]);
      const filtered = contractAsArray.filter(([key, value]) => {
        if (e.target.value === "") return state.data;
        return value
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      if (filtered.length > 0) {
        results.push(state.data[i]);
      }
    }

    setState({
      ...state,
      query: e.target.value,
      filtered: results,
    });
  };

  const onHandleQueryAbsence = () => {
    if (state.query == "") return state.data;
    else return state.filtered;
  };

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
        setState({ ...state, data: myJson });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.query]);

  return (
    <div id="ContractsPage">
      <div className="contracts-header">
        <h1 className="contracts-main-title">Contracts</h1>

        <FaSearch size="50" />
        <input
          type="search"
          value={state.query}
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
            {/* This will help us loading the main table with data on loading */}
            {/* If you can display full data with another method on loading */}
            {/* and still keep the searchbox functional, go ahead */}
            {onHandleQueryAbsence().map((s, id) => {
              if (s.proposition_num) {
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
      {state.filtered.length == 0 && (
        <p className="no-contracts">
          Il n'y a aucun contrat correspondant à votre recherche...
        </p>
      )}
    </div>
  );
};

export default Contracts;
