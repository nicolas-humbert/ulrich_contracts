import React, { useState, useEffect } from "react";
import { Contract } from "../types/Contract";
import { useParams } from "react-router-dom";

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
        <p>No contract with this id</p>
      ) : (
        <p>Contract ID: {state?.current.proposition_num}</p>
      )}
    </div>
  );
};

export default ContractDetail;
