import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Contract } from "../../types/Contract";

interface ContractsState {
  contracts: Contract[];
}

const initialState: ContractsState = {
  contracts: [],
};

export const ContractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    setContracts: (state, action: PayloadAction<{ contracts: Contract[] }>) => {
      state.contracts = action.payload.contracts;
    },
  },
});

export default ContractsSlice.reducer;
export const { setContracts } = ContractsSlice.actions;
