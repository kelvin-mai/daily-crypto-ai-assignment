import { useState } from 'react';
import {
  BookOpen,
  BookUser,
  ClockCircle,
  Edit,
  SpinnerOne,
} from '@mynaui/icons-react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { toast } from 'sonner';

import type { BookDocument } from '../../lib/types/api';
import { updateBook } from '../../api/book';
import { useAppActions, useAppEffects, useAppStore } from '../../lib/store';
import { Progress } from '../common/progress';
import { Button } from '../common/button';
import { BookFormDialog } from './form';

type UpdateProgressInputProps = {
  pagesRead: number;
  totalPages: number;
  value: number;
  onChange: (pagesRead: number) => void;
};

const UpdateProgressInput: React.FC<UpdateProgressInputProps> = ({
  totalPages,
  pagesRead,
  value,
  onChange,
}) => {
  const radius = 100;
  const [visible, setVisible] = useState(false);
  const { theme } = useAppStore();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };
  return (
    <motion.div
      style={{
        background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          ${theme === 'dark' ? '#14b8a6' : '#8b5cf6'},
          transparent 80%
        )`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input rounded-lg p-[2px] transition duration-300 grow"
    >
      <div className="shadow-input flex items-center rounded">
        <input
          className="px-3 py-2 grow bg-white rounded-s-lg placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-violet-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-black dark:focus-visible:ring-teal-400"
          placeholder={String(pagesRead)}
          type="number"
          min={0}
          max={totalPages}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
        <div className="border-l-2 border-l-transparent px-3 py-2 bg-white rounded-e-lg ml-0.5 dark:text-black">
          of {totalPages}
        </div>
      </div>
    </motion.div>
  );
};

type BookCardProps = BookDocument & {};

export const BookCard: React.FC<BookCardProps> = ({
  _id,
  title,
  author,
  pagesRead,
  totalPages,
}) => {
  const percentage = Math.round((pagesRead / totalPages) * 100);
  const { setBook } = useAppActions();
  const { deleteBookAndRefetch } = useAppEffects();
  const [page, setPage] = useState(pagesRead);
  const [loading, setLoading] = useState(false);
  const handleUpdateProgress = async () => {
    setLoading(true);
    if (page > totalPages) {
      toast.error('Invalid page number', {
        description: `Page number must be between 0 and ${totalPages}`,
      });
    } else if (page < 0) {
      toast.error('Invalid page number', {
        description: `Page number must be greater than or equal to 0`,
      });
    } else {
      try {
        const response = await updateBook({ id: _id, pagesRead: page });
        setBook(response.book);
        toast.success('Book progress updated');
      } catch (e) {
        toast.error('Error updating book progress', {
          description: (e as Error).message
            ? (e as Error).message
            : 'Please try again',
        });
      }
    }
    setLoading(false);
  };
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteBookAndRefetch(_id);
      toast.success('Book deleted');
    } catch (e) {
      toast.error('Error deleting book', {
        description: (e as Error).message
          ? (e as Error).message
          : 'Please try again',
      });
    }
    setLoading(false);
  };
  return (
    <div className="p-4 rounded-lg shadow-md space-y-2 dark:bg-slate-700">
      <div className="flex justify-between items-start">
        <h4 className="text-xl font-semibold">{title}</h4>
        <div className="inline-flex items-center justify-center rounded-xl px-2 text-sm font-semibold shadow text-white bg-teal-500 w-16">
          {percentage} %
        </div>
      </div>
      <p className="flex gap-2 items-center italic">
        <BookUser className="h-5 w-5" />
        <span>{author}</span>
      </p>
      <p className="flex justify-between items-center">
        <span className="inline-flex gap-2 item-center">
          <ClockCircle className="h-5 w-5" />
          <span>Progress</span>
        </span>
        <span>
          {pagesRead} of {totalPages}
        </span>
      </p>
      <Progress value={percentage} />
      <div>
        <p className="flex gap-2 items-center">
          <BookOpen className="h-5 w-5" />
          <span>Update Progress</span>
        </p>
      </div>
      <div className="flex items-center gap-4">
        <UpdateProgressInput
          pagesRead={pagesRead}
          totalPages={totalPages}
          value={page}
          onChange={setPage}
        />
        <button
          type="button"
          className="py-2 px-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-500 hover:cursor-pointer disabled:cursor-default"
          onClick={handleUpdateProgress}
          disabled={loading}
        >
          {loading ? (
            <SpinnerOne className="animate-spin h-6 w-6" />
          ) : (
            <Edit className="h-6 w-6" />
          )}
        </button>
      </div>
      <div className="flex gap-2">
        <BookFormDialog
          mode="edit"
          className="w-full bg-teal-500 text-white"
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
    </div>
  );
};
