import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import uploadService from './uploadService'
const initialState = {
  upload: null,
  isUploadError: false,
  isUploadSuccess: false,
  isUploadLoading: false,
  uploadMessage: null,
}
export const uploadTemplate = createAsyncThunk(
  'upload/uploadTemplate',
  async (payload: any, thunkAPI) => {
    try {
      return await uploadService.uploadTemplate(payload)
    } catch (error) {
      const message = error
      return thunkAPI.rejectWithValue(message)
    }
  },
)
export const Upload = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    reset: (state, action: PayloadAction<any>) => {
      state.upload = null
      state.isUploadError = false
      state.isUploadSuccess = false
      state.isUploadLoading = false
      state.uploadMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadTemplate.pending, (state) => {
      state.isUploadLoading = true
    })
    builder.addCase(uploadTemplate.fulfilled, (state, action) => {
      state.isUploadLoading = false
      state.isUploadError = false
      state.isUploadSuccess = true
      state.uploadMessage = ''
      state.upload = action.payload
    })
    builder.addCase(uploadTemplate.rejected, (state, action) => {
      state.isUploadLoading = false
      state.isUploadError = true
      state.isUploadSuccess = false
      state.uploadMessage = action.payload
      state.upload = null
    })
  },
})
export default Upload.reducer
export const {reset} = Upload.actions
