import { createSlice } from "@reduxjs/toolkit";

interface CommonState {
  token: string | null;
  errorMessage: string | null;
  appLoaded: Boolean;
}

const initialState: CommonState = {
  token: localStorage.getItem("jwt"),
  errorMessage: null,
  appLoaded: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("jwt", action.payload);
      } else {
        localStorage.removeItem("jwt");
      }
    },
    setAppLoaded: (state) => {
      state.appLoaded = true;
    },
  },
});

export const { setToken, setAppLoaded } = commonSlice.actions;

export const commonReducer = commonSlice.reducer;
