import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import doneService from "./doneService";
const initialState = {
  templateVersionImageVideoCloud: null,
  isTemplateVersionImageVideoCloudError: false,
  isTemplateVersionImageVideoCloudSuccess: false,
  isTemplateVersionImageVideoCloudLoading: false,
  templateVersionImageVideoCloudMessage: null,
};
export const postTemplateVersionImageVideoCloud = createAsyncThunk(
  "done/postTemplateVersionImageVideoCloud",
  async (payload: any, thunkAPI) => {
    try {
      return await doneService.postTemplateVersionImageVideoCloud(payload);
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const Done = createSlice({
  name: "done",
  initialState,
  reducers: {
    reset: (state, action: PayloadAction<any>) => {
        state.templateVersionImageVideoCloud = null;
        state.isTemplateVersionImageVideoCloudError = false;
        state.isTemplateVersionImageVideoCloudSuccess = false;
        state.isTemplateVersionImageVideoCloudLoading = false;
        state.templateVersionImageVideoCloudMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postTemplateVersionImageVideoCloud.pending, (state) => {
        state.isTemplateVersionImageVideoCloudLoading = true;
    });
    builder.addCase(postTemplateVersionImageVideoCloud.fulfilled, (state, action) => {
        state.isTemplateVersionImageVideoCloudLoading = false;
        state.isTemplateVersionImageVideoCloudError = false;
        state.isTemplateVersionImageVideoCloudSuccess = true;
        state.templateVersionImageVideoCloudMessage = "";
        state.templateVersionImageVideoCloud = action.payload;
    });
    builder.addCase(postTemplateVersionImageVideoCloud.rejected, (state, action) => {
        state.isTemplateVersionImageVideoCloudLoading = false;
        state.isTemplateVersionImageVideoCloudError = true;
        state.isTemplateVersionImageVideoCloudSuccess = false;
        state.templateVersionImageVideoCloudMessage = action.payload;
        state.templateVersionImageVideoCloud = null;
    });
  },
});

export default Done.reducer;
export const { reset } = Done.actions;