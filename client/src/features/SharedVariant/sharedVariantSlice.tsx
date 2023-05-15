import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import shareVariantService from "./sharedVariantService";
const initialState = {
  sharedVariant: null,
  isSharedVariantError: false,
  isSharedVariantSuccess: false,
  isSharedVariantLoading: false,
  sharedVariantMessage: null,
};
export const getSharedVariants = createAsyncThunk(
  "sharedVariant/getSharedVariants",
  async (id: string, thunkAPI) => {
    try {
      return await shareVariantService.getSharedVariants(id);
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const SharedVariant = createSlice({
  name: "sharedVariant",
  initialState,
  reducers: {
    reset: (state, action: PayloadAction<any>) => {
        state.sharedVariant = null;
        state.isSharedVariantError = false;
        state.isSharedVariantSuccess = false;
        state.isSharedVariantLoading = false;
        state.sharedVariantMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSharedVariants.pending, (state) => {
        state.isSharedVariantLoading = true;
    });
    builder.addCase(getSharedVariants.fulfilled, (state, action) => {
        state.isSharedVariantLoading = false;
        state.isSharedVariantError = false;
        state.isSharedVariantSuccess = true;
        state.sharedVariantMessage = "";
        state.sharedVariant = action.payload;
    });
    builder.addCase(getSharedVariants.rejected, (state, action) => {
        state.isSharedVariantLoading = false;
        state.isSharedVariantError = true;
        state.isSharedVariantSuccess = false;
        state.sharedVariantMessage = action.payload;
        state.sharedVariant = null;
    });
  },
});

export default SharedVariant.reducer;
export const { reset } = SharedVariant.actions;