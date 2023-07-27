import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import elementService from './elementService'
const initialState = {
  languages: null,
  isLanguagesError: false,
  isLanguagesSuccess: false,
  isLanguagesLoading: false,
  languagesMessage: null,
  uploadXlsx: null,
  isUploadXlsxError: false,
  isUploadXlsxSuccess: false,
  isUploadXlsxLoading: false,
  uploadXlsxMessage: null,
}
export const getLanguages = createAsyncThunk(
  'element/getLanguages',
  async (payload: any, thunkAPI) => {
    try {
      return await elementService.getLanguages(payload)
    } catch (error) {
      const message = error
      return thunkAPI.rejectWithValue(message)
    }
  },
)
export const postUploadXlsx = createAsyncThunk(
  'element/postUploadXlsx',
  async (payload: any, thunkAPI) => {
    try {
      return await elementService.postUploadXlsx(payload)
    } catch (error) {
      const message = error
      return thunkAPI.rejectWithValue(message)
    }
  },
)
export const Element = createSlice({
  name: 'element',
  initialState,
  reducers: {
    reset: (state, action: PayloadAction<any>) => {
      state.languages = null
      state.isLanguagesError = false
      state.isLanguagesSuccess = false
      state.isLanguagesLoading = false
      state.languagesMessage = null
      state.uploadXlsx = null
      state.isUploadXlsxError = false
      state.isUploadXlsxSuccess = false
      state.isUploadXlsxLoading = false
      state.uploadXlsxMessage = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLanguages.pending, (state) => {
      state.isLanguagesLoading = true
    })
    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.isLanguagesLoading = false
      state.isLanguagesError = false
      state.isLanguagesSuccess = true
      state.languagesMessage = ''
      state.languages = action.payload
    })
    builder.addCase(getLanguages.rejected, (state, action) => {
      state.isLanguagesLoading = false
      state.isLanguagesError = true
      state.isLanguagesSuccess = false
      state.languagesMessage = action.payload
      state.languages = null
    })
    builder.addCase(postUploadXlsx.pending, (state) => {
      state.isUploadXlsxLoading = true
    })
    builder.addCase(postUploadXlsx.fulfilled, (state, action) => {
      state.isUploadXlsxLoading = false
      state.isUploadXlsxError = false
      state.isUploadXlsxSuccess = true
      state.uploadXlsxMessage = ''
      state.uploadXlsx = action.payload
    })
    builder.addCase(postUploadXlsx.rejected, (state, action) => {
      state.isUploadXlsxLoading = false
      state.isUploadXlsxError = true
      state.isUploadXlsxSuccess = false
      state.uploadXlsxMessage = action.payload
      state.uploadXlsx = null
    })
  },
})

export default Element.reducer
export const {reset} = Element.actions
