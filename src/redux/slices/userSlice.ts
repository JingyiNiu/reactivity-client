import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { User, UserFormValues } from "../../app/models/user";
import { setToken } from "./commonSlice";
import { router } from "../../app/router/Routes";

export const login = createAsyncThunk("user/login", async (creds: UserFormValues, { dispatch }) => {
  const user = await agent.Account.login(creds);
  dispatch(setUser(user));
  dispatch(setToken(user.token));
  return user;
});

export const getUser = createAsyncThunk("user/getUser", async (_, { dispatch }) => {
  const user = await agent.Account.current();
  dispatch(setUser(user));
  return user;
});

export const logout = createAsyncThunk("user/logout", async (_, { dispatch }) => {
  dispatch(setUser(null));
  dispatch(setToken(null));
  router.navigate("/");
});

interface UserState {
  user: User | null;
  loading: boolean;
  errorMessage: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  errorMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.errorMessage = "Email or password not match the records";
        state.loading = false;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
