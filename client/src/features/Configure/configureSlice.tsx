import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import configureService from "./configureService";
const initialState = {
  templateSelectedVersion: null,
  isTemplateSelectedVersionsError: false,
  isTemplateSelectedVersionsSuccess: false,
  isTemplateSelectedVersionsLoading: false,
  templateSelectedVersionsMessage: null,
};
export const getTemplateSelectedVersion = createAsyncThunk(
  "configure/getTemplateSelectedVersion",
  async (payload: any, thunkAPI) => {
    try {
      return await configureService.getTemplateSelectedVersion(payload);
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const Configure = createSlice({
  name: "configure",
  initialState,
  reducers: {
    reset: (state, action: PayloadAction<any>) => {
        state.templateSelectedVersion = null;
        state.isTemplateSelectedVersionsError = false;
        state.isTemplateSelectedVersionsSuccess = false;
        state.isTemplateSelectedVersionsLoading = false;
        state.templateSelectedVersionsMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTemplateSelectedVersion.pending, (state) => {
        state.isTemplateSelectedVersionsLoading = true;
    });
    builder.addCase(getTemplateSelectedVersion.fulfilled, (state, action) => {
        state.isTemplateSelectedVersionsLoading = false;
        state.isTemplateSelectedVersionsError = false;
        state.isTemplateSelectedVersionsSuccess = true;
        state.templateSelectedVersionsMessage = "";
        state.templateSelectedVersion = action.payload;
    });
    builder.addCase(getTemplateSelectedVersion.rejected, (state, action) => {
        state.isTemplateSelectedVersionsLoading = false;
        state.isTemplateSelectedVersionsError = true;
        state.isTemplateSelectedVersionsSuccess = false;
        state.templateSelectedVersionsMessage = action.payload;
        state.templateSelectedVersion = null;
    });
  },
});

export default Configure.reducer;
export const { reset } = Configure.actions;