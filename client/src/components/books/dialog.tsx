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
import { Button } from '../common/button';

type BookDialogProps = {
  action: 'create' | 'edit';
  className?: string;
  id?: string;
  title?: string;
  author?: string;
  totalPages?: number;
  pagesRead?: number;
};

export const BookDialog: React.FC<BookDialogProps> = ({
  action,
  className,
  ...props
}) => {
  console.log('book dialog', props);
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            'capitalize font-semibold text-white bg-violet-500 w-full',
            className,
          )}
        >
          {action}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Book</DialogTitle>
          <DialogDescription>Create a book.</DialogDescription>
        </DialogHeader>
        <BookForm mode={action} onComplete={() => setOpen(false)} {...props} />
      </DialogContent>
    </Dialog>
  );
};
