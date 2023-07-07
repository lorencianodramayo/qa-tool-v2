import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import templateService from './templateService'
const initialState = {
  template: null,
  isTemplateError: false,
  isTemplateSuccess: false,
  isTemplateLoading: false,
  templateMessage: null,
  upload: null,
  isUploadError: false,
  isUploadSuccess: false,
  isUploadLoading: false,
  uploadMessage: null,
}
export const getTemplate = createAsyncThunk(
  'template/getTemplate',
  async (id: string, thunkAPI) => {
    try {
      return await templateService.getTemplate(id)
    } catch (error) {
      const message = error
      return thunkAPI.rejectWithValue(message)
    }
  },
)
export const postUpload = createAsyncThunk(
  'template/postUpload',
  async (payload: any, thunkAPI) => {
    try {
      return await templateService.postUpload(payload)
    } catch (error) {
      const message = error
      return thunkAPI.rejectWithValue(message)
    }
  },
)
export const Template = createSlice({
  name: 'template',
  initialState,
  reducers: {
    reset: (state, action: PayloadAction<any>) => {
      state.template = null
      state.isTemplateError = false
      state.isTemplateSuccess = false
      state.isTemplateLoading = false
      state.templateMessage = ''
      state.upload = null
      state.isUploadError = false
      state.isUploadSuccess = false
      state.isUploadLoading = false
      state.uploadMessage = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTemplate.pending, (state) => {
      state.isTemplateLoading = true
    })
    builder.addCase(getTemplate.fulfilled, (state, action) => {
      state.isTemplateLoading = false
      state.isTemplateError = false
      state.isTemplateSuccess = true
      state.templateMessage = ''
      state.template = action.payload
    })
    builder.addCase(getTemplate.rejected, (state, action) => {
      state.isTemplateLoading = false
      state.isTemplateError = true
      state.isTemplateSuccess = false
      state.templateMessage = action.payload
      state.template = null
    })
    builder.addCase(postUpload.pending, (state) => {
      state.isUploadLoading = true
    })
    builder.addCase(postUpload.fulfilled, (state, action) => {
      state.isUploadLoading = false
      state.isUploadError = false
      state.isUploadSuccess = true
      state.uploadMessage = ''
      state.upload = action.payload
    })
    builder.addCase(postUpload.rejected, (state, action) => {
      state.isUploadLoading = false
      state.isUploadError = true
      state.isUploadSuccess = false
      state.uploadMessage = action.payload
      state.upload = null
    })
  },
})

export default Template.reducer
export const {reset} = Template.actions
