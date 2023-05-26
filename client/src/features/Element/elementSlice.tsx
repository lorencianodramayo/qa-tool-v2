import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import elementService from "./elementService";
const initialState = {
  languages: null,
  isLanguagesError: false,
  isLanguagesSuccess: false,
  isLanguagesLoading: false,
  languagesMessage: null,
};
export const getLanguages = createAsyncThunk(
  "element/getLanguages",
  async (payload: any, thunkAPI) => {
    try {
      return await elementService.getLanguages(payload);
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const Element = createSlice({
  name: "element",
  initialState,
  reducers: {
    reset: (state, action: PayloadAction<any>) => {
        state.languages = null;
        state.isLanguagesError = false;
        state.isLanguagesSuccess = false;
        state.isLanguagesLoading = false;
        state.languagesMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLanguages.pending, (state) => {
        state.isLanguagesLoading = true;
    });
    builder.addCase(getLanguages.fulfilled, (state, action) => {
        state.isLanguagesLoading = false;
        state.isLanguagesError = false;
        state.isLanguagesSuccess = true;
        state.languagesMessage = "";
        state.languages = action.payload;
    });
    builder.addCase(getLanguages.rejected, (state, action) => {
        state.isLanguagesLoading = false;
        state.isLanguagesError = true;
        state.isLanguagesSuccess = false;
        state.languagesMessage = action.payload;
        state.languages = null;
    });
  },
});

export default Element.reducer;
export const { reset } = Element.actions;