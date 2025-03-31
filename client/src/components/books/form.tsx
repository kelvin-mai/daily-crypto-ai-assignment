import { useState } from 'react';
import { toast } from 'sonner';

import { BookParams, updateBook } from '../../api/book';
import { useAppEffects, useAppStore } from '../../lib/store';
import { FormInput } from '../common/form';
import { Button } from '../common/button';

type BookFormProps = {
  mode: 'create' | 'edit';
  onComplete(): void;
  id?: string;
  title?: string;
  author?: string;
  totalPages?: number;
  pagesRead?: number;
};

export const BookForm: React.FC<BookFormProps> = ({
  mode,
  onComplete,
  id,
  title,
  author,
  totalPages,
  pagesRead,
}) => {
  const {
    actions: { setBook },
  } = useAppStore();
  const { createBookAndRefetch } = useAppEffects();
  const [params, setParams] = useState<BookParams>({
    title: title || '',
    author: author || '',
    totalPages: totalPages || 0,
    pagesRead: pagesRead || 0,
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === 'create') {
      try {
        await createBookAndRefetch(params);
        toast.success('Book added');
        onComplete();
      } catch (e) {
        toast.error('Error adding book', {
          description: (e as Error).message
            ? (e as Error).message
            : 'Please try again',
        });
      }
    } else if (mode === 'edit') {
      try {
        const response = await updateBook({ id: id!, ...params });
        setBook(response.book);
        toast.success('Book updated');
        onComplete();
      } catch (e) {
        toast.error('Error updating book', {
          description: (e as Error).message
            ? (e as Error).message
            : 'Please try again',
        });
      }
    }
  };
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setParams({ ...params, [target.id]: target.value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col space-y-2">
        <FormInput
          className="mb-4"
          id="title"
          label="Title"
          placeholder="Title of book"
          type="text"
          value={params.title}
          onChange={handleChange}
        />
        <FormInput
          className="mb-4"
          id="author"
          label="Author"
          placeholder="Author of book"
          type="text"
          value={params.author}
          onChange={handleChange}
        />
        <div className="mb-4 flex flex-row space-y-0 space-x-2">
          <FormInput
            id="pagesRead"
            label="Pages Read"
            placeholder="0"
            min={0}
            type="number"
            value={params.pagesRead}
            onChange={handleChange}
          />
          <FormInput
            id="totalPages"
            label="Total Pages"
            placeholder="420"
            min={0}
            type="number"
            value={params.totalPages}
            onChange={handleChange}
          />
        </div>
        <Button
          className="bg-violet-500 text-white capitalize"
          type="submit"
          disabled={
            !params.title ||
            !params.author ||
            !params.totalPages ||
            params.totalPages < 1
          }
        >
          {mode}
        </Button>
      </div>
    </form>
  );
};
