import { useState } from 'react';

import { BookDocument } from '../../lib/types/api';
import { useAppEffects } from '../../lib/store';
import { Button } from '../common/button';
import { Progress } from '../common/progress';
import { TableCell, TableRow } from '../common/table';
import { BookFormDialog } from './form';

type BookTableRowProps = BookDocument & {};

export const BookTableRow: React.FC<BookTableRowProps> = ({
  _id,
  title,
  author,
  pagesRead,
  totalPages,
}) => {
  const percentage = Math.round((pagesRead / totalPages) * 100);
  const { deleteBookAndRefetch } = useAppEffects();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    await deleteBookAndRefetch(_id);
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
          <BookFormDialog
            className="w-full bg-teal-500 text-white"
            mode="edit"
            id={_id}
            title={title}
            author={author}
            pagesRead={pagesRead}
            totalPages={totalPages}
            disabled={loading}
          >
            Edit
          </BookFormDialog>
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
