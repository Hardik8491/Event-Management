// InstructorModel.ts

import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';


// Interface for TypeScript type-checking
interface IInstructor extends Document {
  userId: IUser['_id'];  // Link to IUser ID for type-checking
  certification: string;
  experienceYears: number;
  bio: string;
  profilePhotoUrl: string;
}

// Instructor schema
const InstructorSchema = new Schema<IInstructor>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  certification: { type: String, required: false },
  experienceYears: { type: Number, required: false },
  bio: { type: String, required: false },
  profilePhotoUrl: { type: String, required: false }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt timestamps
});

const instructorModel = mongoose.model<IInstructor>('Instructor', InstructorSchema);

export default instructorModel;
