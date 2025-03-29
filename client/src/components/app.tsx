import { useEffect } from 'react';

import { Navbar } from './layout/navbar';
import { useAppStore } from '../lib/store';
import { getProfile } from '../api/auth';
import { listBooks } from '../api/book';
import { BooksContainer } from './books/container';

export const App = () => {
  const {
    initialized,
    actions: { setInitialized, setUser },
  } = useAppStore();

  const initializeApp = async () => {
    try {
      if (localStorage.getItem('token')) {
        const profile = await getProfile();
        setUser(profile);
      }
    } catch (err) {
      localStorage.removeItem('token');
    } finally {
      setInitialized(true);
    }
  };

  useEffect(() => {
    if (!initialized) {
      initializeApp();
    }
  }, [initialized]);

  const handleLoadBooks = async () => {
    console.log('handle load books');
    const response = await listBooks({});
    console.log(response);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-4">
        <div className="container">
          <button
            className="py-2 px-4 rounded shadow bg-teal-500 text-white"
            onClick={handleLoadBooks}
          >
            Load Books
          </button>
          <BooksContainer />
        </div>
      </main>
    </div>
  );
};
