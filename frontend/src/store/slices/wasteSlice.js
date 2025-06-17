import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  categories: ['recyclable', 'organic', 'hazardous', 'electronic', 'general'],
  selectedCategory: 'all',
  totalWeight: 0,
  monthlyStats: {
    recycled: 0,
    composted: 0,
    disposed: 0,
  },
  loading: false,
  error: null,
}

const wasteSlice = createSlice({
  name: 'waste',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    updateMonthlyStats: (state, action) => {
      state.monthlyStats = action.payload
    },
    calculateTotalWeight: (state) => {
      state.totalWeight = state.items.reduce((total, item) => total + item.weight, 0)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  setSelectedCategory,
  updateMonthlyStats,
  calculateTotalWeight,
  setLoading,
  setError,
  clearError,
} = wasteSlice.actions

export default wasteSlice.reducer