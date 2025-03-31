import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import mongoose from 'mongoose';

import {
  createBook,
  deleteBook,
  getBook,
  updateBook,
} from '../../src/controllers/book.controller';
import Book from '../../src/models/book.model';
import {} from '../../src/models/user.model';

jest.mock('../../src/models/book.model', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
}));

describe('Book Controller Tests', () => {
  let req: any;
  let res: any;
  let mockUserId: mongoose.Types.ObjectId;
  beforeEach(() => {
    mockUserId = new mongoose.Types.ObjectId();
    req = {
      user: { userId: mockUserId },
      params: {},
    } as unknown as jest.Mock;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as jest.Mock;
  });

  it('should create a new book', async () => {
    const data = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      totalPages: 180,
      pagesRead: 150,
    };
    req.body = data;
    const created = {
      ...data,
      owner: mockUserId,
    };

    // @ts-ignore
    (Book.create as jest.Mock).mockResolvedValue(created);

    await createBook(req, res, jest.fn());
    expect(Book.create).toHaveBeenCalledWith(created);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ book: created });
  });

  it('should get an existing book', async () => {
    const id = new mongoose.Types.ObjectId();
    req.params.id = String(id);
    const existing = {
      _id: id,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      totalPages: 180,
      pagesRead: 150,
      owner: mockUserId,
    };

    // @ts-ignore
    (Book.findOne as jest.Mock).mockResolvedValue(existing);

    await getBook(req, res, jest.fn());
    expect(Book.findOne).toHaveBeenCalledWith({
      _id: String(id),
      owner: mockUserId,
    });
    expect(res.json).toHaveBeenCalledWith({ book: existing });
  });

  it('should update an existing book', async () => {
    const id = new mongoose.Types.ObjectId();
    req.params.id = String(id);
    const existing = {
      _id: id,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      totalPages: 180,
      pagesRead: 150,
      owner: mockUserId,
    };
    const params = { pagesRead: 170 };
    req.body = params;
    const updated = { ...existing, ...params };
    // @ts-ignore
    const updateOne = jest.fn().mockResolvedValue(updated);

    (Book.findOne as jest.Mock)
      // @ts-ignore
      .mockResolvedValueOnce({ updateOne })
      // @ts-ignore
      .mockResolvedValueOnce(updated);

    await updateBook(req, res, jest.fn());
    expect(Book.findOne).toHaveBeenCalledWith({
      _id: String(id),
      owner: mockUserId,
    });
    expect(updateOne).toHaveBeenCalledWith(params);
    expect(res.json).toHaveBeenCalledWith({
      book: { ...existing, ...params },
    });
  });

  it('should get an existing book', async () => {
    const id = new mongoose.Types.ObjectId();
    req.params.id = String(id);
    const existing = {
      _id: id,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      totalPages: 180,
      pagesRead: 150,
      owner: mockUserId,
    };

    // @ts-ignore
    (Book.deleteOne as jest.Mock).mockResolvedValue(existing);

    await deleteBook(req, res, jest.fn());
    expect(Book.deleteOne).toHaveBeenCalledWith({
      _id: String(id),
      owner: mockUserId,
    });
    expect(res.json).toHaveBeenCalledWith({
      message: 'Book deleted successfully',
    });
  });
});
