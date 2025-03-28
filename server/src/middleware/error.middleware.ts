import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(error.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined,
  });
};
