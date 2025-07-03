export interface Course {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  duration: string
  instructor: string
  level: "Beginner" | "Intermediate" | "Advanced"
  category?: string
  prerequisites?: string[]
  learningObjectives?: string[]
  createdAt: string
  updatedAt: string
}

export interface EnrollmentState {
  enrolledCourses: string[]
}

export interface RootState {
  enrollment: EnrollmentState
}
