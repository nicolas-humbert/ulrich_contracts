import { useEffect, useState } from "react";
import axios from "axios";
import { Contract } from "../types/Contract";
import Spinner from "../components/Spinner";
import PageTitle from "../components/PageTitle";
import ContractRow from "../components/ContractRow";
import NoSearchResultMessage from "../components/NoSearchResultMessage";
import { FaSearch } from "react-icons/fa";
import "../styles/table.scss";
import "../styles/contracts-page.scss";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setContracts } from "../store/features/contractSlice";

type ContractsPageState = {
  data: Contract[];
  query: string;
  filtered: Contract[];
  loading: boolean;
};

const Contracts = () => {
  const selector = useAppSelector((state) => state.contracts.contracts);
  const [state, setState] = useState<ContractsPageState>({
    data: selector ?? [],
    query: "",
    filtered: [],
    loading: false,
  });

  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const results: Contract[] = [];

    for (let i = 0; i < state.data.length; i++) {
      const contractAsArray = Object.entries(state.data[i]);
      const filtered = contractAsArray.filter(([key, value]) => {
        if (e.target.value === "") return state.data;
        if (value != null) {
          return value
            .toString()
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        }
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
    function fetchContracts() {
      setState({
        ...state,
        loading: true,
      });
      axios
        .get(`/api/v1/contracts`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(function (response) {
          // console.log(response);
          setState({ ...state, data: response.data, loading: false });
          dispatch(setContracts({ contracts: response.data }));
        })
        .catch((err) => {
          setState({ ...state, loading: false });
          throw err;
        });
    }

    if (state.data.length === 0) {
      fetchContracts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.loading) {
    return <Spinner />;
  }

  return (
    <div id="ContractsPage" className="container">
      <div className="contracts-header">
        <PageTitle text="Contrats" />

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
              <th>Client</th>
              <th>Nom Client</th>
              <th>Payeur</th>
              <th>Nom Payeur</th>
              <th>Création</th>
              <th>Redacteur</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {/* This will help us loading the main table with data on loading */}
            {/* If you can display full data with another method on loading */}
            {/* and still keep the searchbox functional, go ahead */}
            {onHandleQueryAbsence().map((s, id) => {
              if (s.id) {
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
      {state.data.length == 0 && (
        <NoSearchResultMessage
          text="Une erreur s'est produite ou vous n'avez pas encore de contrats. 
          Contactez votre administrateur pour plus d'informations."
        />
      )}

      {/* Bad code I know, needs to be rewritten */}
      {state.filtered.length == 0 &&
        state.query !== "" &&
        state.data.length != 0 && (
          <NoSearchResultMessage text="Il n'y a aucun contrat correspondant à votre recherche." />
        )}
    </div>
  );
};

export default Contracts;
