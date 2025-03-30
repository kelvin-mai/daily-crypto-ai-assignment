import { useState } from 'react';

import { BookParams, createBook, listBooks, updateBook } from '../../api/book';
import { FormInput } from '../common/form';
import { useAppStore } from '../../lib/store';

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
    actions: { setBooks, setBook },
  } = useAppStore();
  const [params, setParams] = useState<BookParams>({
    title: title || '',
    author: author || '',
    totalPages: totalPages || 0,
    pagesRead: pagesRead || 0,
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === 'create') {
      await createBook(params);
      setBooks({ loading: true });
      const data = await listBooks({});
      setBooks({
        loading: false,
        list: data?.books,
        pagination: data?.meta,
      });
      onComplete();
    } else if (mode === 'edit') {
      const response = await updateBook({ id: id!, ...params });
      setBook(response.book);
      onComplete();
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
            type="number"
            value={params.pagesRead}
            onChange={handleChange}
          />
          <FormInput
            id="totalPages"
            label="Total Pages"
            placeholder="420"
            type="number"
            value={params.totalPages}
            onChange={handleChange}
          />
        </div>
        <button
          className="w-full bg-violet-500 text-white py-2 px-4 rounded shadow capitalize"
          type="submit"
        >
          {mode}
        </button>
      </div>
    </form>
  );
};
