import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from './models/user.model';
import Book, { type IBook } from './models/book.model';

dotenv.config();

const seed = async () => {
  console.log('initializing seed');

  const hashedPassword = await bcrypt.hash('password', 12);

  const user = await User.create({
    name: 'Administrator',
    email: 'admin@test.com',
    password: hashedPassword,
  });

  console.log('created user', user);

  const booksData: Partial<IBook>[] = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      totalPages: 180,
      pagesRead: 150,
    },
    {
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      totalPages: 277,
      pagesRead: 256,
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      totalPages: 281,
      pagesRead: 281,
    },
    {
      title: 'The Hobbit',
      author: 'J.R.R Tolkien',
      totalPages: 366,
      pagesRead: 100,
    },
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      totalPages: 320,
      pagesRead: 200,
    },
    {
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      totalPages: 469,
      pagesRead: 100,
    },
    {
      title: 'Game of Thrones',
      author: 'George R. R. Martin',
      totalPages: 835,
      pagesRead: 754,
    },
    {
      title: 'How to Win Friends & Influence People',
      author: 'Dale Carnegie',
      totalPages: 288,
      pagesRead: 288,
    },
    {
      title: 'The Hunger Games',
      author: 'Suzanne Collins',
      totalPages: 374,
      pagesRead: 374,
    },
    {
      title: 'The Lord of the Rings',
      author: 'J.R.R Tolkien',
      totalPages: 742,
      pagesRead: 742,
    },
    {
      title: 'Fifty Shades of Grey',
      author: 'E.L. James',
      totalPages: 356,
      pagesRead: 1,
    },
    {
      title: 'Twilight',
      author: 'Stephanie Meyer',
      totalPages: 498,
      pagesRead: 1,
    },
  ].map((b) => ({ ...b, owner: user._id }));

  const books = await Book.create(booksData);

  console.log('created books', books);
};

(async () => {
  try {
    console.log('process.env', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('connected to mongodb');
    await mongoose.connection.db.dropDatabase();
    console.log('database dropped');
    await seed();
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
})();
