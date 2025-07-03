# Employee Training Portal

A comprehensive Employee Training Portal built with Next.js, TypeScript, Tailwind CSS, and Redux Toolkit. This application simulates a platform for HRTech/EdTech where employees can browse and enroll in training courses.

## Features

### Core Functionality
- **Course Listing**: Browse available training courses with search and filter capabilities
- **Course Details**: View comprehensive course information including prerequisites and learning objectives
- **Enrollment System**: Enroll/unenroll from courses with state management
- **Search & Filter**: Real-time search functionality for finding courses
- **Responsive Design**: Fully responsive UI that works on all devices

### Technical Features
- **Next.js App Router**: Modern routing with server and client components
- **TypeScript**: Full type safety throughout the application
- **Redux Toolkit**: Global state management for enrollment data
- **API Routes**: RESTful API endpoints for course data
- **Error Handling**: Comprehensive error handling on both API and UI levels
- **Loading States**: Smooth loading experiences with skeleton screens

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   └── courses/
│   │       ├── route.ts          # GET /api/courses
│   │       └── [id]/route.ts     # GET /api/courses/[id]
│   ├── course/
│   │   └── [id]/page.tsx         # Course details page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── providers.tsx             # Redux provider
│   └── globals.css               # Global styles
├── lib/
│   ├── data/
│   │   └── courses.ts            # Sample course data
│   ├── features/
│   │   └── enrollmentSlice.ts    # Redux enrollment slice
│   ├── store.ts                  # Redux store configuration
│   └── types.ts                  # TypeScript interfaces
└── components/ui/                # shadcn/ui components
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd employee-training-portal
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### GET /api/courses
Returns a list of all courses with optional search filtering.

**Query Parameters:**
- `search` (optional): Filter courses by title, description, or category

**Response:**
\`\`\`json
{
  "courses": [
    {
      "id": "1",
      "title": "Course Title",
      "shortDescription": "Brief description",
      "duration": "6 weeks",
      "instructor": "Instructor Name",
      "level": "Beginner",
      "category": "Category"
    }
  ],
  "total": 6
}
\`\`\`

### GET /api/courses/[id]
Returns detailed information for a specific course.

**Response:**
\`\`\`json
{
  "course": {
    "id": "1",
    "title": "Course Title",
    "shortDescription": "Brief description",
    "fullDescription": "Detailed description",
    "duration": "6 weeks",
    "instructor": "Instructor Name",
    "level": "Beginner",
    "category": "Category",
    "prerequisites": ["Prerequisite 1"],
    "learningObjectives": ["Objective 1"]
  }
}
\`\`\`

## State Management

The application uses Redux Toolkit for managing enrollment state:

### Enrollment Slice
- `enrollInCourse(courseId)`: Add a course to enrolled courses
- `unenrollFromCourse(courseId)`: Remove a course from enrolled courses
- `clearEnrollments()`: Clear all enrollments

### State Structure
\`\`\`typescript
interface EnrollmentState {
  enrolledCourses: string[]
}
\`\`\`

## Design Decisions

### Architecture
- **Next.js App Router**: Chosen for its modern approach to routing and server components
- **TypeScript**: Ensures type safety and better developer experience
- **Redux Toolkit**: Provides predictable state management for enrollment data
- **API Routes**: Simulates a real backend with proper REST endpoints

### UI/UX
- **Mobile-First Design**: Responsive design that works on all screen sizes
- **Consistent Styling**: Uses Tailwind CSS with a cohesive design system
- **Loading States**: Skeleton screens provide smooth user experience
- **Error Handling**: Graceful error messages and fallback states

### Data Management
- **Simulated Database**: Uses a JSON file to simulate course data
- **Search Functionality**: Case-insensitive search across multiple fields
- **State Persistence**: Enrollment state persists across page navigation

## Future Enhancements

### Potential Features
- **User Authentication**: Add login/logout functionality
- **Course Progress**: Track completion status and progress
- **Certificates**: Generate completion certificates
- **Course Reviews**: Allow users to rate and review courses
- **Admin Panel**: Course management interface for administrators
- **Real Database**: Integration with MongoDB or PostgreSQL
- **File Uploads**: Support for course materials and assignments

### Technical Improvements
- **Caching**: Implement Redis for API response caching
- **Testing**: Add unit and integration tests
- **Performance**: Implement virtual scrolling for large course lists
- **SEO**: Add meta tags and structured data
- **Analytics**: Track user engagement and course popularity

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with automatic builds

### Manual Deployment
1. Build the application:
\`\`\`bash
npm run build
\`\`\`

2. Start the production server:
\`\`\`bash
npm start
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
