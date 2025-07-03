import { type NextRequest, NextResponse } from "next/server"
import { courses } from "@/lib/data/courses"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""

    let filteredCourses = courses

    if (search) {
      const searchLower = search.toLowerCase()
      filteredCourses = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchLower) ||
          course.shortDescription.toLowerCase().includes(searchLower) ||
          course.fullDescription.toLowerCase().includes(searchLower) ||
          course.category?.toLowerCase().includes(searchLower),
      )
    }

    return NextResponse.json({
      courses: filteredCourses,
      total: filteredCourses.length,
    })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}
