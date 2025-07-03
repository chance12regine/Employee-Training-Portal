import mongoose from 'mongoose';

export interface IEnrollment extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  status: 'enrolled' | 'in_progress' | 'completed';
  progress: number;
  completedModules: mongoose.Types.ObjectId[];
  startDate: Date;
  completionDate?: Date;
  lastAccessed: Date;
  rating?: number;
  review?: string;
  createdAt: Date;
  updatedAt: Date;
}

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    status: {
      type: String,
      enum: ['enrolled', 'in_progress', 'completed'],
      default: 'enrolled',
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedModules: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course.curriculum',
    }],
    startDate: {
      type: Date,
      default: Date.now,
    },
    completionDate: {
      type: Date,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure a user can only enroll in a course once
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// Update course enrolledCount when enrollment status changes
enrollmentSchema.post('save', async function() {
  const Course = mongoose.model('Course');
  const course = await Course.findById(this.course);
  if (course) {
    course.enrolledCount = await mongoose.model('Enrollment').countDocuments({
      course: this.course,
      status: { $in: ['enrolled', 'in_progress', 'completed'] }
    });
    await course.save();
  }
});

export default mongoose.models.Enrollment || mongoose.model<IEnrollment>('Enrollment', enrollmentSchema); 