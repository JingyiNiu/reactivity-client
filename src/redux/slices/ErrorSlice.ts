import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: null,
  reducers: {
    setError: (state, { payload }) => {
      return payload;
    },
    clearError: () => null,
  },
});

export const errorReducer = errorSlice.reducer;
export const { setError, clearError } = errorSlice.actions;
