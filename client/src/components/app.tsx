import { use, useEffect, useState } from 'react';
import { register, login, getProfile } from '../api/auth';
import { createBook, listBooks } from '../api/book';

export const App = () => {
  const env = import.meta.env;
  console.log('API_URL', env);
  const [books, setBooks] = useState();

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold">Hello World</h1>
      <button
        className="rounded shadow py-2 px-4 bg-teal-500 text-white"
        onClick={() =>
          login({
            email: 'me@kelvinmai.io',
            password: 'password',
          })
        }
      >
        button
      </button>
      <button
        className="rounded shadow py-2 px-4 bg-purple-500 text-white"
        onClick={() => listBooks({})}
      >
        button
      </button>
    </div>
  );
};
