import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BearerToken } from "../../types/BearerToken";
import { getCurrentUser } from "../../services/auth";

interface UserState {
  user?: BearerToken;
}

const initialState: UserState = {
  user: JSON.parse(getCurrentUser()),
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: BearerToken }>) => {
      state.user = action.payload.user;
    },
  },
});

export default UserSlice.reducer;
export const { setUser } = UserSlice.actions;
