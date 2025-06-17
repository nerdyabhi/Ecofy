import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activities: [],
  totalSaved: 0,
  monthlyGoal: 50,
  categories: ['transport', 'energy', 'waste', 'food', 'shopping'],
  loading: false,
  error: null,
}

const carbonSlice = createSlice({
  name: 'carbon',
  initialState,
  reducers: {
    setActivities: (state, action) => {
      state.activities = action.payload
    },
    addActivity: (state, action) => {
      state.activities.push(action.payload)
    },
    updateTotalSaved: (state) => {
      state.totalSaved = state.activities.reduce((total, activity) => total + activity.carbonSaved, 0)
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
  setActivities,
  addActivity,
  updateTotalSaved,
  setLoading,
  setError,
  clearError,
} = carbonSlice.actions

export default carbonSlice.reducer