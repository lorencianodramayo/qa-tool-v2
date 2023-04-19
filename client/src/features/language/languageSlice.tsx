// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import languageService from "./languageService";

const initialState = {
  languages: null,
  isLanguagesError: false,
  isLanguagesSuccess: false,
  isLanguagesLoading: false,
  languagesMessage: "",
  language: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  addLanguage: null,
  isAddLanguageError: false,
  isAddLanguageSuccess: false,
  isAddLanguageLoading: false,
  addLanguageMessage: "",
  translate: null,
  isTranslateError: false,
  isTranslateSuccess: false,
  isTranslateLoading: false,
  translateMessage: "",
  // textTranslated: null,
  // isTextTranslatedError: false,
  // isTextTranslatedSuccess: false,
  // isTextTranslatedLoading: false,
  // textTranslatedTextMessage: "",
};

export const getLanguages = createAsyncThunk(
  "language/getLanguages",
  async (language, thunkAPI) => {
    try {
      return await languageService.getLanguages();
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const detectLanguage = createAsyncThunk(
//   "language/detectLanguage",
//   async (language, thunkAPI) => {
//     try {
//       return await languageService.detectLanguage(language);
//     } catch (error) {
//       const message = error;
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const postLanguage = createAsyncThunk(
  "language/addLanguage",
  async (language, thunkAPI) => {
    try {
      return await languageService.postLanguage(language);
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postTranslate = createAsyncThunk(
  "language/postTranslate",
  async (language, thunkAPI) => {
    try {
      return await languageService.postTranslate(language);
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const postTranslateText = createAsyncThunk(
//   "language/postTranslateText",
//   async (text, thunkAPI) => {
//     try {
//       return await languageService.postTranslateText(text);
//     } catch (error) {
//       const message = error;
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    reset: (state) => {
      (state.languages = null),
        (state.isLanguagesLoading = false),
        (state.isLanguagesSuccess = false),
        (state.isLanguagesError = false),
        (state.languagesMessage = ""),
        (state.language = null),
        (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.message = ""),
        (state.addLanguage = null),
        (state.isAddLanguageLoading = false),
        (state.isAddLanguageSuccess = false),
        (state.isAddLanguageError = false),
        (state.addLanguageMessage = ""),
        (state.translate = null),
        (state.isTranslateLoading = false),
        (state.isTranslateSuccess = false),
        (state.isTranslateError = false),
        (state.translateMessage = "");
      // (state.textTranslated = null),
      // (state.isTextTranslatedLoading = false),
      // (state.isTextTranslatedSuccess = false),
      // (state.isTextTranslatedError = false),
      // (state.textTranslatedTextMessage = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLanguages.pending, (state) => {
        state.isLanguagesLoading = true;
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        (state.isLanguagesLoading = false),
          (state.isLanguagesError = false),
          (state.isLanguagesSuccess = true),
          (state.languagesMessage = ""),
          (state.languages = action.payload);
      })
      .addCase(getLanguages.rejected, (state, action) => {
        (state.isLanguagesLoading = false),
          (state.isLanguagesError = true),
          (state.isLanguagesSuccess = false),
          (state.languagesMessage = ""),
          (state.languages = null);
      })
      .addCase(postLanguage.pending, (state) => {
        state.isAddLanguageLoading = true;
      })
      .addCase(postLanguage.fulfilled, (state, action) => {
        (state.isAddLanguageLoading = false),
          (state.isAddLanguageError = false),
          (state.isAddLanguageSuccess = true),
          (state.addLanguageMessage = ""),
          (state.addLanguage = action.payload);
      })
      .addCase(postLanguage.rejected, (state, action) => {
        (state.isAddLanguageLoading = false),
          (state.isAddLanguageError = true),
          (state.isAddLanguageSuccess = false),
          (state.addLanguageMessage = action.payload),
          (state.addLanguage = null);
      })
      .addCase(postTranslate.pending, (state) => {
        state.isTranslateLoading = true;
      })
      .addCase(postTranslate.fulfilled, (state, action) => {
        (state.isTranslateLoading = false),
          (state.isTranslateError = false),
          (state.isTranslateSuccess = true),
          (state.translateMessage = ""),
          (state.translate = action.payload);
      })
      .addCase(postTranslate.rejected, (state, action) => {
        (state.isTranslateLoading = false),
          (state.isTranslateError = true),
          (state.isTranslateSuccess = false),
          (state.translateMessage = action.payload),
          (state.translate = null);
      });
    // .addCase(detectLanguage.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(detectLanguage.fulfilled, (state, action) => {
    //   (state.isLoading = false),
    //     (state.isError = false),
    //     (state.isSuccess = true),
    //     (state.message = ""),
    //     (state.language = action.payload.sourceLanguageCode);
    // })
    // .addCase(detectLanguage.rejected, (state, action) => {
    //   (state.isLoading = false),
    //     (state.isError = true),
    //     (state.isSuccess = false),
    //     (state.message = ""),
    //     (state.language = null);
    // })
    // .addCase(postTranslateText.pending, (state) => {
    //   state.isTextTranslatedLoading = true;
    // })
    // .addCase(postTranslateText.fulfilled, (state, action) => {
    //   (state.isTextTranslatedLoading = false),
    //     (state.isTextTranslatedError = false),
    //     (state.isTextTranslatedSuccess = true),
    //     (state.textTranslatedTextMessage = ""),
    //     (state.textTranslated = action.payload.translateText);
    // })
    // .addCase(postTranslateText.rejected, (state, action) => {
    //   (state.isTextTranslatedLoading = false),
    //     (state.isTextTranslatedError = true),
    //     (state.isTextTranslatedSuccess = false),
    //     (state.textTranslatedTextMessage = ""),
    //     (state.textTranslated = null);
    // });
  },
});

export const { reset } = languageSlice.actions;
export default languageSlice.reducer;
