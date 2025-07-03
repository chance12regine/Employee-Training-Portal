import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { EnrollmentState } from "../types"

const initialState: EnrollmentState = {
  enrolledCourses: [],
}

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    enrollInCourse: (state, action: PayloadAction<string>) => {
      if (!state.enrolledCourses.includes(action.payload)) {
        state.enrolledCourses.push(action.payload)
      }
    },
    unenrollFromCourse: (state, action: PayloadAction<string>) => {
      state.enrolledCourses = state.enrolledCourses.filter((courseId) => courseId !== action.payload)
    },
    clearEnrollments: (state) => {
      state.enrolledCourses = []
    },
  },
})

export const { enrollInCourse, unenrollFromCourse, clearEnrollments } = enrollmentSlice.actions
export default enrollmentSlice.reducer
