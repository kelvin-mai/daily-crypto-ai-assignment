import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import Book from '../models/book.model';

export const listBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    const books = await Book.find({ owner: req.user?.userId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (books.length <= 0) {
      res.json({
        books,
        statistics: undefined,
        meta: {
          total: 0,
          pages: 1,
          currentPage: page,
          pageSize: limit,
        },
      });
    } else {
      const stats = await Book.aggregate([
        {
          $match: {
            owner: new mongoose.Types.ObjectId(req.user?.userId),
          },
        },
        {
          $project: {
            _id: 0,
            completed: {
              $cond: [{ $eq: ['$pagesRead', '$totalPages'] }, 1, 0],
            },
            totalPages: '$totalPages',
            pagesRead: '$pagesRead',
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            completed: { $sum: '$completed' },
            totalPages: { $sum: '$totalPages' },
            totalPagesRead: { $sum: '$pagesRead' },
          },
        },
      ]);
      const total = stats[0].total;
      const pages = Math.ceil(total / limit);

      res.json({
        books,
        statistics: stats[0],
        meta: {
          total,
          pages,
          currentPage: page,
          pageSize: limit,
        },
      });
    }
  } catch (e) {
    next(e);
  }
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const book = await Book.create({
      ...req.body,
      owner: req.user?.userId,
    });
    res.status(201).json({ book });
  } catch (e) {
    next(e);
  }
};

export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      owner: req.user?.userId,
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ book });
  } catch (e) {
    next(e);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      owner: req.user?.userId,
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    await book.updateOne(req.body);
    const updated = await Book.findOne({
      _id: req.params.id,
      owner: req.user?.userId,
    });
    res.json({ book: updated });
  } catch (e) {
    next(e);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const book = await Book.deleteOne({
      _id: req.params.id,
      owner: req.user?.userId,
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (e) {
    next(e);
  }
};
