import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  accessToken: any;
  token: null | string;
  user: null | any;
}

const initialState: IInitialState = {
  accessToken: null,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegister: (
      state,
      action: PayloadAction<{ accessToken: string | null }>
    ) => {
      state.token = action.payload.accessToken;
    },
    userLogin: (
      state,
      action: PayloadAction<{ accessToken: string; user: any }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },


    userLogout: (state) => {
      console.log("Logout triggered, resetting auth state.");
      state.token = null;
      state.user = null;
    },
  },
});

export const { userRegister, userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;
