import { useState } from 'react';

import { BookDocument } from '../../lib/types/api';
import { Button } from '../common/button';
import { Progress } from '../common/progress';
import { TableCell, TableRow } from '../common/table';
import { BookDialog } from './dialog';
import { deleteBook, listBooks } from '../../api/book';
import { useAppStore } from '../../lib/store';

type BookTableRowProps = BookDocument & {};

export const BookTableRow: React.FC<BookTableRowProps> = ({
  _id,
  title,
  author,
  pagesRead,
  totalPages,
}) => {
  const percentage = Math.round((pagesRead / totalPages) * 100);
  const {
    actions: { setBooks },
  } = useAppStore();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    await deleteBook(_id);
    setBooks({ loading: true });
    const data = await listBooks({});
    setBooks({
      loading: false,
      list: data?.books,
      pagination: data?.meta,
    });
    setLoading(false);
  };
  return (
    <TableRow>
      <TableCell>{title}</TableCell>
      <TableCell>{author}</TableCell>
      <TableCell>
        <span>
          {pagesRead} of {totalPages}
        </span>
        <Progress value={percentage} />
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <BookDialog
            action="edit"
            id={_id}
            title={title}
            author={author}
            pagesRead={pagesRead}
            totalPages={totalPages}
            disabled={loading}
          />
          <Button
            className="w-full bg-pink-700 text-white"
            type="button"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
