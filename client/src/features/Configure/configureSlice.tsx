import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import configureService from './configureService'
const initialState = {
  templateDefaultValues: null,
  isTemplateDefaultValuesError: false,
  isTemplateDefaultValuesSuccess: false,
  isTemplateDefaultValuesLoading: false,
  templateDefaultValuesMessage: null,
  templateSelectedVersion: null,
  isTemplateSelectedVersionsError: false,
  isTemplateSelectedVersionsSuccess: false,
  isTemplateSelectedVersionsLoading: false,
  templateSelectedVersionsMessage: null,
}
export const postTemplateDefaultValues = createAsyncThunk(
  'configure/postTemplateDefaultValues',
  async (payload: any, thunkAPI) => {
    try {
      return await configureService.postTemplateDefaultValues(payload)
    } catch (error) {
      const message = error
      return thunkAPI.rejectWithValue(message)
    }
  },
)
export const getTemplateSelectedVersion = createAsyncThunk(
  'configure/getTemplateSelectedVersion',
  async (payload: any, thunkAPI) => {
    try {
      return await configureService.getTemplateSelectedVersion(payload)
    } catch (error) {
      const message = error
      return thunkAPI.rejectWithValue(message)
    }
  },
)
export const Configure = createSlice({
  name: 'configure',
  initialState,
  reducers: {
    reset: (state, action: PayloadAction<any>) => {
      state.templateDefaultValues = null
      state.isTemplateDefaultValuesError = false
      state.isTemplateDefaultValuesSuccess = false
      state.isTemplateDefaultValuesLoading = false
      state.templateDefaultValuesMessage = null
      state.templateSelectedVersion = null
      state.isTemplateSelectedVersionsError = false
      state.isTemplateSelectedVersionsSuccess = false
      state.isTemplateSelectedVersionsLoading = false
      state.templateSelectedVersionsMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTemplateSelectedVersion.pending, (state) => {
      state.isTemplateSelectedVersionsLoading = true
    })
    builder.addCase(getTemplateSelectedVersion.fulfilled, (state, action) => {
      state.isTemplateSelectedVersionsLoading = false
      state.isTemplateSelectedVersionsError = false
      state.isTemplateSelectedVersionsSuccess = true
      state.templateSelectedVersionsMessage = null
      state.templateSelectedVersion = action.payload
    })
    builder.addCase(getTemplateSelectedVersion.rejected, (state, action) => {
      state.isTemplateSelectedVersionsLoading = false
      state.isTemplateSelectedVersionsError = true
      state.isTemplateSelectedVersionsSuccess = false
      state.templateSelectedVersionsMessage = action.payload
      state.templateSelectedVersion = null
    })
    builder.addCase(postTemplateDefaultValues.pending, (state) => {
      state.isTemplateDefaultValuesLoading = true
    })
    builder.addCase(postTemplateDefaultValues.fulfilled, (state, action) => {
      state.isTemplateDefaultValuesLoading = false
      state.isTemplateDefaultValuesError = false
      state.isTemplateDefaultValuesSuccess = true
      state.templateDefaultValuesMessage = null
      state.templateDefaultValues = action.payload
    })
    builder.addCase(postTemplateDefaultValues.rejected, (state, action) => {
      state.isTemplateDefaultValuesLoading = false
      state.isTemplateDefaultValuesError = true
      state.isTemplateDefaultValuesSuccess = false
      state.templateDefaultValuesMessage = action.payload
      state.templateDefaultValues = null
    })
  },
})

export default Configure.reducer
export const {reset} = Configure.actions
