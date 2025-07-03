import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Enrollment from '@/lib/models/Enrollment';

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const enrollments = await Enrollment.find({ user: session.user.id })
      .populate('course', 'title shortDescription duration category')
      .sort({ lastAccessed: -1 });

    return NextResponse.json({ enrollments });
  } catch (error: any) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json(
      { error: error.message || 'Error fetching enrollments' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      user: session.user.id,
      course: courseId,
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      );
    }

    // Create new enrollment
    const enrollment = await Enrollment.create({
      user: session.user.id,
      course: courseId,
      status: 'enrolled',
      progress: 0,
      startDate: new Date(),
      lastAccessed: new Date(),
    });

    return NextResponse.json(
      { message: 'Successfully enrolled in course', enrollment },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating enrollment:', error);
    return NextResponse.json(
      { error: error.message || 'Error creating enrollment' },
      { status: 500 }
    );
  }
} 