// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import templateVersionService from "./templateVersionService";

const initialState = {
  templatesVersions: null,
  isTemplatesVersionsError: false,
  isTemplatesVersionsSuccess: false,
  isTemplatesVersionsLoading: false,
  templatesVersionsMessage: "",
  addTemplateVersion: null,
  isAddTemplateVersionError: false,
  isAddTemplateVersionSuccess: false,
  isAddTemplateVersionLoading: false,
  addTemplateVersionMessage: "",
  addTemplateVersionCloud: null,
  isAddTemplateVersionCloudError: false,
  isAddTemplateVersionCloudSuccess: false,
  isAddTemplateVersionCloudLoading: false,
  addTemplateVersionCloudMessage: "",
};

export const getTemplatesVersions = createAsyncThunk(
  "templateVersion/getTemplatesVersions",
  async (templateVersion, thunkAPI) => {
    try {
      return await templateVersionService.getTemplatesVersions(templateVersion);
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postTemplateVersion = createAsyncThunk(
  "templateVersion/postTemplateVersion",
  async (templateVersion, thunkAPI) => {
    try {
      return await templateVersionService.postTemplateVersion(templateVersion);
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postTemplateVersionCloud = createAsyncThunk(
  "templateVersion/postTemplateVersionCloud",
  async (templateVersion, thunkAPI) => {
    try {
      return await templateVersionService.postTemplateVersionCloud(
        templateVersion
      );
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const templateVersionSlice = createSlice({
  name: "templateVersion",
  initialState,
  reducers: {
    reset: (state) => {
      (state.templatesVersions = null),
        (state.isTemplatesVersionsError = false),
        (state.isTemplatesVersionsSuccess = false),
        (state.isTemplatesVersionsLoading = false),
        (state.templatesVersionsMessage = ""),
        (state.addTemplateVersion = null),
        (state.isAddTemplateVersionError = false),
        (state.isAddTemplateVersionSuccess = false),
        (state.isAddTemplateVersionLoading = false),
        (state.addTemplateVersionMessage = ""),
        (state.addTemplateVersionCloud = null),
        (state.isAddTemplateVersionCloudError = false),
        (state.isAddTemplateVersionCloudSuccess = false),
        (state.isAddTemplateVersionCloudLoading = false),
        (state.addTemplateVersionCloudMessage = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTemplatesVersions.pending, (state) => {
        state.isTemplatesVersionsLoading = true;
      })
      .addCase(getTemplatesVersions.fulfilled, (state, action) => {
        (state.isTemplatesVersionsLoading = false),
          (state.isTemplatesVersionsError = false),
          (state.isTemplatesVersionsSuccess = true),
          (state.templatesVersionsMessage = ""),
          (state.templatesVersions = action.payload);
      })
      .addCase(getTemplatesVersions.rejected, (state, action) => {
        (state.isTemplatesVersionsLoading = false),
          (state.isTemplatesVersionsError = true),
          (state.isTemplatesVersionsSuccess = false),
          (state.templatesVersionsMessage = action.payload),
          (state.templatesVersions = null);
      })
      .addCase(postTemplateVersion.pending, (state) => {
        state.isAddTemplateVersionLoading = true;
      })
      .addCase(postTemplateVersion.fulfilled, (state, action) => {
        (state.isAddTemplateVersionLoading = false),
          (state.isAddTemplateVersionError = false),
          (state.isAddTemplateVersionSuccess = true),
          (state.addTemplateVersionMessage = ""),
          (state.addTemplateVersion = action.payload);
      })
      .addCase(postTemplateVersion.rejected, (state, action) => {
        (state.isAddTemplateVersionLoading = false),
          (state.isAddTemplateVersionError = true),
          (state.isAddTemplateVersionSuccess = false),
          (state.addTemplateVersionMessage = action.payload),
          (state.addTemplateVersion = null);
      })
      .addCase(postTemplateVersionCloud.pending, (state) => {
        state.isAddTemplateVersionCloudLoading = true;
      })
      .addCase(postTemplateVersionCloud.fulfilled, (state, action) => {
        (state.isAddTemplateVersionCloudLoading = false),
          (state.isAddTemplateVersionCloudError = false),
          (state.isAddTemplateVersionCloudSuccess = true),
          (state.addTemplateVersionCloudMessage = ""),
          (state.addTemplateVersionCloud = action.payload);
      })
      .addCase(postTemplateVersionCloud.rejected, (state, action) => {
        (state.isAddTemplateVersionCloudLoading = false),
          (state.isAddTemplateVersionCloudError = true),
          (state.isAddTemplateVersionCloudSuccess = false),
          (state.addTemplateVersionCloudMessage = action.payload),
          (state.addTemplateVersionCloud = null);
      });
  },
});

export const { reset } = templateVersionSlice.actions;
export default templateVersionSlice.reducer;
