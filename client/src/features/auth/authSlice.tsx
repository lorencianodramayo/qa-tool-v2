// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userAuthenticated: null,
  isUserAuthenticatedError: false,
  isUserAuthenticatedSuccess: false,
  isUserAuthenticatedLoading: false,
  userAuthenticatedmessage: "",
};
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (user, thunkAPI) => {
    try {
      return await authService.signIn(user);
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const authUser = createAsyncThunk(
  "auth/authUser",
  async (user, thunkAPI) => {
    try {
      return await authService.authUser();
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.message = ""),
        (state.isUserAuthenticatedLoading = false),
        (state.isUserAuthenticatedSuccess = false),
        (state.isUserAuthenticatedError = false),
        (state.userAuthenticatedMessage = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.message = ""),
          (state.user = action.payload.user);
      })
      .addCase(signIn.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.message = action.payload.response.data.err),
          (state.user = null);
      })
      .addCase(authUser.pending, (state) => {
        state.isUserAuthenticatedLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        (state.isUserAuthenticatedLoading = false),
          (state.isUserAuthenticatedError = false),
          (state.isUserAuthenticatedSuccess = true),
          (state.userAuthenticatedMessage = ""),
          (state.userAuthenticated = action.payload);
      })
      .addCase(authUser.rejected, (state, action) => {
        (state.isUserAuthenticatedLoading = false),
          (state.isUserAuthenticatedError = true),
          (state.isUserAuthenticatedSuccess = false),
          (state.userAuthenticatedMessage = action.payload),
          (state.userAuthenticated = null);
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
