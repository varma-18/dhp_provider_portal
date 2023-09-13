import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewUser, getUserInfo, loginUserWithPassword } from "../api/user";

const updateLocalStorage = (data) => {
  localStorage.setItem("auth", JSON.stringify(data));
};

const initialState = JSON.parse(localStorage.getItem("auth")) || {
  user: null,
  loggedIn: false,
  loading: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "user/createNewUser",
  async (userData) => {
    return await createNewUser(userData);
  }
);

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  return await loginUserWithPassword(data);
});

export const getUserDetails = createAsyncThunk(
  "user/getDetails",
  async ({ id, token }) => {
    return await getUserInfo(id, token);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
      updateLocalStorage({
        user: action.payload,
        loggedIn: state.loggedIn,
      });
    },
    logout: (state) => {
      state.user = null;
      state.loggedIn = false;
      localStorage.removeItem("auth");
    },
    refreshToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add cases later for handling loading and errors
    builder.addCase(createUser.fulfilled, (state, action) => {
      if (action.payload?.id) {
        state.user = { ...action.payload, roles: ["ROLE_USER"] };
        state.loggedIn = true;
        updateLocalStorage({
          user: { ...action.payload, roles: ["ROLE_USER"] },
          loggedIn: true,
        });
      }
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload?.id) {
        state.user = { ...action.payload, roles: ["ROLE_USER"] };
        state.loggedIn = true;
        updateLocalStorage({
          user: { ...action.payload, roles: ["ROLE_USER"] },
          loggedIn: true,
        });
      }
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      if (action.payload?.id) {
        state.user = { ...action.payload, roles: ["ROLE_USER"] };
        state.loggedIn = true;
        updateLocalStorage({
          user: { ...action.payload, roles: ["ROLE_USER"] },
          loggedIn: true,
        });
      }
    });
  },
});

export const { logout, refreshToken, updateUser } = authSlice.actions;

export const token = (state) => state.auth.user?.token;
export const loggedIn = (state) => state.auth.loggedIn;
export const admin = (state) => state.auth.user?.roles.includes("ROLE_ADMIN");
export const clinician = (state) =>
  state.auth.user?.roles.includes("ROLE_USER");
export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
