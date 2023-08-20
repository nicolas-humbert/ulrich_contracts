import { configureStore } from "@reduxjs/toolkit";
import { ContractsSlice } from "./features/contractSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { UserSlice } from "./features/userSlice";

export const store = configureStore({
  reducer: {
    contracts: ContractsSlice.reducer,
    user: UserSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
