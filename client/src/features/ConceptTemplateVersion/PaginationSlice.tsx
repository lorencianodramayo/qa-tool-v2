import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface PaginationState {
  records: Record[]
  totalPages: number
  currentPage: number
}

interface Record {
  // Define your record properties here
}

const initialState: PaginationState = {
  records: [],
  totalPages: 0,
  currentPage: 1,
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<{records: Record[]; totalPages: number}>) => {
      state.records = action.payload.records
      state.totalPages = action.payload.totalPages
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
})

export const {setRecords, setCurrentPage} = paginationSlice.actions

export default paginationSlice.reducer
