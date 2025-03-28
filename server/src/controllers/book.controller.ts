import type { Request, Response, NextFunction } from 'express';
import Book from '../models/book.model';

export const listBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const books = await Book.find({ owner: req.user?.userId });
    res.json({ books });
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
