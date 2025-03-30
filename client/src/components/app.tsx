import { useEffect } from 'react';

import { Navbar } from './layout/navbar';
import { useAppStore } from '../lib/store';
import { getProfile } from '../api/auth';
import { BooksContainer } from './books/container';

export const App = () => {
  const {
    initialized,
    user,
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

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-4">
        <div className="container">
          {initialized &&
            (user ? (
              <BooksContainer />
            ) : (
              <div className="mt-8 p-8 rounded-lg shadow-md w-full h-72 flex justify-center items-center">
                <h4 className="text-xl">
                  You are currently not logged in, please log in to continue
                  using the platform.
                </h4>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};
