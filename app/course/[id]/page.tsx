"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import {
  ArrowLeft,
  Clock,
  Users,
  BookOpen,
  CheckCircle,
  Star,
  Award,
  PlayCircle,
  Download,
  Share2,
  Heart,
  Calendar,
  Globe,
  Target,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { RootState } from "@/lib/store"
import { enrollInCourse, unenrollFromCourse } from "@/lib/features/enrollmentSlice"
import type { Course } from "@/lib/types"

export default function CourseDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const courseId = params.id as string

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [enrolling, setEnrolling] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const enrolledCourses = useSelector((state: RootState) => state.enrollment.enrolledCourses)
  const isEnrolled = enrolledCourses.includes(courseId)

  useEffect(() => {
    fetchCourse()
  }, [courseId])

  const fetchCourse = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/courses/${courseId}`)
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Course not found")
        }
        throw new Error("Failed to fetch course details")
      }
      const data = await response.json()
      setCourse(data.course)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleEnrollment = async () => {
    setEnrolling(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (isEnrolled) {
        dispatch(unenrollFromCourse(courseId))
      } else {
        dispatch(enrollInCourse(courseId))
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      }
    } catch (err) {
      console.error("Enrollment error:", err)
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-200 rounded-2xl"></div>
                <div className="h-32 bg-gray-200 rounded-2xl"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error === "Course not found" ? "Course Not Found" : "Error Loading Course"}
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Successfully enrolled in course!
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="ghost" onClick={() => router.push("/")} className="mb-4 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                {course.category && (
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">{course.category}</Badge>
                )}
                <Badge
                  className={`${
                    course.level === "Beginner"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : course.level === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : "bg-red-100 text-red-800 border-red-200"
                  }`}
                >
                  {course.level}
                </Badge>
                {isEnrolled && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <Award className="h-3 w-3 mr-1" />
                    Enrolled
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{course.shortDescription}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>
                    Instructor: <span className="font-medium">{course.instructor}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>4.8 (1,234 reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>English</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="rounded-lg">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  Course Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">{course.fullDescription}</p>
              </CardContent>
            </Card>

            {/* Course Content Tabs */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <Tabs defaultValue="objectives" className="w-full">
                <CardHeader>
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl">
                    <TabsTrigger value="objectives" className="rounded-lg">
                      Learning Objectives
                    </TabsTrigger>
                    <TabsTrigger value="prerequisites" className="rounded-lg">
                      Prerequisites
                    </TabsTrigger>
                    <TabsTrigger value="curriculum" className="rounded-lg">
                      Curriculum
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent>
                  <TabsContent value="objectives" className="mt-0">
                    {course.learningObjectives && course.learningObjectives.length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Target className="h-5 w-5 text-green-600" />
                          <span className="font-semibold text-gray-900">What you'll achieve:</span>
                        </div>
                        <ul className="space-y-3">
                          {course.learningObjectives.map((objective, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-600">Learning objectives will be updated soon.</p>
                    )}
                  </TabsContent>

                  <TabsContent value="prerequisites" className="mt-0">
                    {course.prerequisites && course.prerequisites.length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Shield className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-gray-900">Before you start:</span>
                        </div>
                        <ul className="space-y-3">
                          {course.prerequisites.map((prereq, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="h-2 w-2 bg-blue-600 rounded-full mt-2.5 flex-shrink-0"></div>
                              <span className="text-gray-700">{prereq}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Zap className="h-12 w-12 text-green-600 mx-auto mb-3" />
                        <p className="text-gray-700 font-medium">No prerequisites required!</p>
                        <p className="text-gray-600">This course is perfect for beginners.</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="curriculum" className="mt-0">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <PlayCircle className="h-5 w-5 text-purple-600" />
                        <span className="font-semibold text-gray-900">Course Structure:</span>
                      </div>
                      <div className="space-y-3">
                        {[
                          "Introduction and Course Overview",
                          "Fundamentals and Core Concepts",
                          "Practical Applications and Examples",
                          "Advanced Techniques and Best Practices",
                          "Final Project and Assessment",
                        ].map((module, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                              {index + 1}
                            </div>
                            <span className="text-gray-700">{module}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>

            {/* Instructor Info */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Meet Your Instructor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {course.instructor.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-gray-900">{course.instructor}</h4>
                    <p className="text-gray-600 mb-3">Senior {course.category} Expert</p>
                    <p className="text-gray-700">
                      With over 10 years of industry experience, {course.instructor} has helped thousands of
                      professionals advance their careers through practical, hands-on training.
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <span>⭐ 4.9 Instructor Rating</span>
                      <span>👥 15,000+ Students</span>
                      <span>🎓 50+ Courses</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="border-0 shadow-lg rounded-2xl sticky top-6">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {isEnrolled ? (
                    <Award className="h-8 w-8 text-white" />
                  ) : (
                    <PlayCircle className="h-8 w-8 text-white" />
                  )}
                </div>
                <CardTitle className="text-2xl">{isEnrolled ? "You're Enrolled!" : "Start Learning Today"}</CardTitle>
                {isEnrolled ? (
                  <CardDescription className="text-green-600 font-medium">
                    Continue your learning journey
                  </CardDescription>
                ) : (
                  <CardDescription>Join thousands of learners advancing their careers</CardDescription>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                {isEnrolled && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                    <p className="text-sm text-gray-600">Start your first lesson to begin tracking progress</p>
                  </div>
                )}

                <Button
                  onClick={handleEnrollment}
                  disabled={enrolling}
                  className={`w-full py-3 text-lg font-semibold rounded-xl transition-all ${
                    isEnrolled
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  }`}
                >
                  {enrolling ? "Processing..." : isEnrolled ? "Unenroll from Course" : "Enroll Now - Free"}
                </Button>

                {!isEnrolled && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">30-day money-back guarantee</p>
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                      <span>✓ Lifetime access</span>
                      <span>✓ Mobile friendly</span>
                      <span>✓ Certificate</span>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Course Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Course Details</h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Duration</span>
                      </div>
                      <span className="text-sm font-medium">{course.duration}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Start Date</span>
                      </div>
                      <span className="text-sm font-medium">Anytime</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Skill Level</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          course.level === "Beginner"
                            ? "border-green-200 text-green-700 bg-green-50"
                            : course.level === "Intermediate"
                              ? "border-yellow-200 text-yellow-700 bg-yellow-50"
                              : "border-red-200 text-red-700 bg-red-50"
                        }`}
                      >
                        {course.level}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Resources</span>
                      </div>
                      <span className="text-sm font-medium">Downloadable</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Certificate</span>
                      </div>
                      <span className="text-sm font-medium">Yes</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Courses */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">You Might Also Like</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Advanced Project Management", level: "Advanced" },
                  { title: "Leadership Fundamentals", level: "Beginner" },
                  { title: "Agile Methodology", level: "Intermediate" },
                ].map((relatedCourse, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <h5 className="font-medium text-gray-900 text-sm">{relatedCourse.title}</h5>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline" className="text-xs">
                        {relatedCourse.level}
                      </Badge>
                      <span className="text-xs text-gray-500">Free</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
