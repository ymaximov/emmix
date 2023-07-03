import { configureStore } from '@reduxjs/toolkit'
import alertsSlice from './alertsSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    alerts: alertsSlice,
    user: userSlice
  },
})