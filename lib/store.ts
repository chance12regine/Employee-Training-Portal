import { configureStore } from "@reduxjs/toolkit"
import enrollmentReducer from "./features/enrollmentSlice"

export const store = configureStore({
  reducer: {
    enrollment: enrollmentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
