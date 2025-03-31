import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Book from '../../src/models/book.model';

dotenv.config();

describe('Book Model Test', () => {
  beforeAll(async () => {
    console.log('beforeAll env', process.env.MONGODB_URI);
    await mongoose.connect(
      `${
        process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017/'
      }`,
    );
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a new book successfully', async () => {
    const userId = new mongoose.Types.ObjectId();
    const book = await Book.create({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      totalPages: 180,
      pagesRead: 150,
      owner: userId,
    });

    expect(book._id).toBeDefined();
    expect(book.title).toBe('The Great Gatsby');
    expect(book.author).toBe('F. Scott Fitzgerald');
    expect(book.totalPages).toBe(180);
    expect(book.pagesRead).toBe(150);
    expect(book.owner).toEqual(userId);
  });

  it('should fail to create invalid book', async () => {
    const userId = new mongoose.Types.ObjectId();
    try {
      await Book.create({
        totalPages: 180,
        pagesRead: 200,
        owner: userId,
      });
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should update existing book', async () => {
    const userId = new mongoose.Types.ObjectId();
    const book = await Book.create({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      totalPages: 180,
      pagesRead: 150,
      owner: userId,
    });

    expect(book._id).toBeDefined();
    expect(book.title).toBe('The Great Gatsby');
    expect(book.author).toBe('F. Scott Fitzgerald');
    expect(book.totalPages).toBe(180);
    expect(book.pagesRead).toBe(150);
    expect(book.owner).toEqual(userId);

    await book.updateOne({
      pagesRead: 180,
    });
    const updated = await Book.findOne({
      owner: userId,
      _id: book._id,
    });

    expect(updated).toBeDefined();
    expect(updated!.pagesRead).toBe(180);
  });

  it('should delete existing book', async () => {
    const userId = new mongoose.Types.ObjectId();
    const book = await Book.create({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      totalPages: 180,
      pagesRead: 150,
      owner: userId,
    });

    expect(book._id).toBeDefined();
    expect(book.title).toBe('The Great Gatsby');
    expect(book.author).toBe('F. Scott Fitzgerald');
    expect(book.totalPages).toBe(180);
    expect(book.pagesRead).toBe(150);
    expect(book.owner).toEqual(userId);

    await Book.deleteOne({
      owner: userId,
      _id: book._id,
    });
    const deleted = await Book.findOne({
      owner: userId,
      _id: book._id,
    });

    expect(deleted).toBeNull();
  });
});
