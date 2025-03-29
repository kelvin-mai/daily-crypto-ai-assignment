import mongoose, { type Document, Schema } from 'mongoose';
import { IUser } from './user.model';

export interface IBook extends Document {
  title: string;
  author: string;
  totalPages: number;
  pagesRead: number;
  owner: IUser;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    pagesRead: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IBook>('Book', bookSchema);
