import mongoose, { type Document, Schema } from 'mongoose';
import { IUser } from './user.model';

export interface IBook extends Document {
  title: string;
  author: string;
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
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IBook>('Book', bookSchema);
