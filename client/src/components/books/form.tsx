import { useState } from 'react';

import { BookParams, createBook, updateBook } from '../../api/book';
import { FormInput } from '../common/form';

type BookFormProps = {
  mode: 'create' | 'edit';
  onComplete(): void;
};

export const BookForm: React.FC<BookFormProps> = ({ mode, onComplete }) => {
  const action = mode === 'create' ? createBook : updateBook;
  const [params, setParams] = useState<BookParams>({
    title: '',
    author: '',
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createBook(params);
    console.log(response);
    onComplete();
  };
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setParams({ ...params, [target.id]: target.value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col space-y-2">
        <FormInput
          id="title"
          label="Title"
          placeholder="Title of book"
          type="text"
          value={params.title}
          onChange={handleChange}
        />
        <FormInput
          id="author"
          label="Author"
          placeholder="Author of book"
          type="text"
          value={params.author}
          onChange={handleChange}
        />
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
