import { Router } from 'express';
import {
  createBook,
  listBooks,
  updateBook,
  deleteBook,
  getBook,
} from '../controllers/book.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, listBooks);
router.post('/', authenticate, createBook);
router.get('/:id', authenticate, getBook);
router.put('/:id', authenticate, updateBook);
router.delete('/:id', authenticate, deleteBook);

export default router;
