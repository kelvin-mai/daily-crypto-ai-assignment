import { useState } from 'react';

import { BookDocument } from '../../lib/types/api';
import { useAppEffects } from '../../lib/store';
import { Button } from '../common/button';
import { Progress } from '../common/progress';
import { TableCell, TableRow } from '../common/table';
import { BookDialog } from './dialog';

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
          <BookDialog
            className="w-full"
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
