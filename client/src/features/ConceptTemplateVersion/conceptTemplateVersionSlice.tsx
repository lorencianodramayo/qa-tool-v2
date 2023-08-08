import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import conceptTemplateVersionService from './conceptTemplateVersionService'
const initialState = {
  templateVariants: null,
  isTemplateVariantsError: false,
  isTemplateVariantsSuccess: false,
  isTemplateVariantsLoading: false,
  templateVariantsMessage: null,
}
export const getVariants = createAsyncThunk(
  'conceptTemplateVersion/postTemplateVersionImageVideoCloud',
  async (_: any, thunkAPI) => {
    try {
      return await conceptTemplateVersionService.getVariants()
    } catch (error) {
      const message = error
      return thunkAPI.rejectWithValue(message)
    }
  },
)
export const ConceptTemplateVersion = createSlice({
  name: 'conceptTemplateVersion',
  initialState,
  reducers: {
    reset: (state, action: PayloadAction<any>) => {
      state.templateVariants = null
      state.isTemplateVariantsError = false
      state.isTemplateVariantsSuccess = false
      state.isTemplateVariantsLoading = false
      state.templateVariantsMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVariants.pending, (state) => {
      state.isTemplateVariantsLoading = true
    })
    builder.addCase(getVariants.fulfilled, (state, action) => {
      state.isTemplateVariantsLoading = false
      state.isTemplateVariantsError = false
      state.isTemplateVariantsSuccess = true
      state.templateVariantsMessage = ''
      state.templateVariants = action.payload
    })
    builder.addCase(getVariants.rejected, (state, action) => {
      state.isTemplateVariantsLoading = false
      state.isTemplateVariantsError = true
      state.isTemplateVariantsSuccess = false
      state.templateVariantsMessage = action.payload
      state.templateVariants = null
    })
  },
})

export default ConceptTemplateVersion.reducer
export const {reset} = ConceptTemplateVersion.actions
