import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import languageService from './languageService'
const initialState = {
  getLanguages: null,
  isGetLanguagesError: false,
  isGetLanguagesSuccess: false,
  isGetLanguagesLoading: false,
  getLanguagesMessage: '',
  getLanguage: null,
  isGetLanguageError: false,
  isGetLanguageSuccess: false,
  isGetLanguageLoading: false,
  getLanguageMessage: '',
  postLanguage: null,
  isPostLanguageError: false,
  isPostLanguageSuccess: false,
  isPostLanguageLoading: false,
  postLanguageMessage: null,
  putLanguage: null,
  isPutLanguageError: false,
  isPutLanguageSuccess: false,
  isPutLanguageLoading: false,
  putLanguageMessage: null,
  deleteLanguage: null,
  isDeleteLanguageError: false,
  isDeleteLanguageSuccess: false,
  isDeleteLanguageLoading: false,
  deleteLanguageMessage: null,
}
export const fetchLanguages = createAsyncThunk('language/getLanguages', async (_, thunkAPI) => {
  try {
    return await languageService.getLanguages()
  } catch (error) {
    const message = error
    return thunkAPI.rejectWithValue(message)
  }
})
export const fetchLanguage = createAsyncThunk(
  'language/getLanguage',
  async (_id: string, thunkAPI) => {
    try {
      return await languageService.getLanguage(_id)
    } catch (error) {
      const message = error
      return thunkAPI.rejectWithValue(message)
    }
  },
)
export const addLanguage = createAsyncThunk(
  'language/postLanguage',
  async (payload: any, thunkAPI) => {
    try {
      return await languageService.postLanguage(payload)
    } catch (error) {
      const message = error
      return thunkAPI.rejectWithValue(message)
    }
  },
)
export const updateLanguage = createAsyncThunk(
  'language/putLanguage',
  async (payload: any, thunkAPI) => {
    try {
      return await languageService.putLanguage(payload)
    } catch (error) {
      const message = error
      return thunkAPI.rejectWithValue(message)
    }
  },
)
export const destroyLanguage = createAsyncThunk(
  'language/deleteLanguage',
  async (payload: any, thunkAPI) => {
    try {
      return await languageService.deleteLanguage(payload)
    } catch (error) {
      const message = error
      return thunkAPI.rejectWithValue(message)
    }
  },
)
export const Language = createSlice({
  name: 'language',
  initialState,
  reducers: {
    reset: (state, action: PayloadAction<any>) => {
      state.getLanguages = null
      state.isGetLanguagesError = false
      state.isGetLanguagesSuccess = false
      state.isGetLanguagesLoading = false
      state.getLanguagesMessage = ''
      state.getLanguage = null
      state.isGetLanguageError = false
      state.isGetLanguageSuccess = false
      state.isGetLanguageLoading = false
      state.getLanguageMessage = ''
      state.postLanguage = null
      state.isPostLanguageError = false
      state.isPostLanguageSuccess = false
      state.isPostLanguageLoading = false
      state.postLanguageMessage = ''
      state.putLanguage = null
      state.isPutLanguageError = false
      state.isPutLanguageSuccess = false
      state.isPutLanguageLoading = false
      state.putLanguageMessage = ''
      state.deleteLanguage = null
      state.isDeleteLanguageError = false
      state.isDeleteLanguageSuccess = false
      state.isDeleteLanguageLoading = false
      state.deleteLanguageMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLanguages.pending, (state) => {
      state.isGetLanguagesLoading = true
    })
    builder.addCase(fetchLanguages.fulfilled, (state, action) => {
      state.isGetLanguagesLoading = false
      state.isGetLanguagesError = false
      state.isGetLanguagesSuccess = true
      state.getLanguagesMessage = ''
      state.getLanguages = action.payload
    })
    builder.addCase(fetchLanguages.rejected, (state, action) => {
      state.isGetLanguagesLoading = false
      state.isGetLanguagesError = true
      state.isGetLanguagesSuccess = false
      state.getLanguagesMessage = action.payload
      state.getLanguages = null
    })
    builder.addCase(fetchLanguage.pending, (state) => {
      state.isGetLanguageLoading = true
    })
    builder.addCase(fetchLanguage.fulfilled, (state, action) => {
      state.isGetLanguageLoading = false
      state.isGetLanguageError = false
      state.isGetLanguageSuccess = true
      state.getLanguageMessage = ''
      state.getLanguage = action.payload
    })
    builder.addCase(fetchLanguage.rejected, (state, action) => {
      state.isGetLanguageLoading = false
      state.isGetLanguageError = true
      state.isGetLanguageSuccess = false
      state.getLanguageMessage = action.payload
      state.getLanguage = null
    })
    builder.addCase(addLanguage.pending, (state) => {
      state.isPostLanguageLoading = true
    })
    builder.addCase(addLanguage.fulfilled, (state, action) => {
      state.isPostLanguageLoading = false
      state.isPostLanguageError = false
      state.isPostLanguageSuccess = true
      state.postLanguageMessage = ''
      state.postLanguage = action.payload
    })
    builder.addCase(addLanguage.rejected, (state, action) => {
      state.isPostLanguageLoading = false
      state.isPostLanguageError = true
      state.isPostLanguageSuccess = false
      state.postLanguageMessage = action.payload
      state.postLanguage = null
    })
    builder.addCase(updateLanguage.pending, (state) => {
      state.isPutLanguageLoading = true
    })
    builder.addCase(updateLanguage.fulfilled, (state, action) => {
      state.isPutLanguageLoading = false
      state.isPutLanguageError = false
      state.isPutLanguageSuccess = true
      state.putLanguageMessage = ''
      state.putLanguage = action.payload
    })
    builder.addCase(updateLanguage.rejected, (state, action) => {
      state.isPutLanguageLoading = false
      state.isPutLanguageError = true
      state.isPutLanguageSuccess = false
      state.putLanguageMessage = action.payload
      state.putLanguage = null
    })
    builder.addCase(destroyLanguage.pending, (state) => {
      state.isDeleteLanguageLoading = true
    })
    builder.addCase(destroyLanguage.fulfilled, (state, action) => {
      state.isDeleteLanguageLoading = false
      state.isDeleteLanguageError = false
      state.isDeleteLanguageSuccess = true
      state.deleteLanguageMessage = ''
      state.deleteLanguage = action.payload
    })
    builder.addCase(destroyLanguage.rejected, (state, action) => {
      state.isDeleteLanguageLoading = false
      state.isDeleteLanguageError = true
      state.isDeleteLanguageSuccess = false
      state.deleteLanguageMessage = action.payload
      state.deleteLanguage = null
    })
  },
})
export default Language.reducer
export const {reset} = Language.actions
