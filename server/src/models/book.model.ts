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
      required: [true, 'Title is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    totalPages: {
      type: Number,
      required: [true, 'Total pages is required'],
    },
    pagesRead: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value: number): boolean {
          return value <= (this as unknown as IBook).totalPages;
        },
        message: 'Pages read must be less than or equal to total pages',
      },
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
