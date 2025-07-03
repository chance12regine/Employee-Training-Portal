import mongoose from 'mongoose';

export interface ICourse extends mongoose.Document {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  instructor: string;
  prerequisites: string[];
  objectives: string[];
  curriculum: {
    title: string;
    description: string;
    duration: string;
  }[];
  rating: number;
  totalRatings: number;
  enrolledCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
    },
    fullDescription: {
      type: String,
      required: [true, 'Full description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: [true, 'Level is required'],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
    },
    instructor: {
      type: String,
      required: [true, 'Instructor name is required'],
    },
    prerequisites: [{
      type: String,
    }],
    objectives: [{
      type: String,
    }],
    curriculum: [{
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
    }],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    enrolledCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for search functionality
courseSchema.index({ title: 'text', shortDescription: 'text', fullDescription: 'text' });

export default mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema); 