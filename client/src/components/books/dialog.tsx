import { useState } from 'react';

import { cn } from '../../lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../common/dialog';
import { BookForm } from './form';

type BookDialogProps = {
  action: 'create' | 'edit';
  className?: string;
};

export const BookDialog: React.FC<BookDialogProps> = ({
  action,
  className,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            'px-4 py-2 rounded hover:cursor-pointer capitalize font-semibold',
            className,
          )}
        >
          {action}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Book</DialogTitle>
          <DialogDescription>Create a book.</DialogDescription>
        </DialogHeader>
        <BookForm mode={action} onComplete={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
