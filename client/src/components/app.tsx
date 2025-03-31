import { useEffect } from 'react';

import { useAppEffects, useAppStore } from '../lib/store';
import { Toaster } from './common/toast';
import { Navbar } from './layout/navbar';
import { BooksContainer } from './books/container';

export const App = () => {
  const { initialized, user } = useAppStore();
  const { initialize } = useAppEffects();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  return (
    <div className="min-h-screen dark:bg-slate-800 dark:text-white">
      <Navbar />
      <main className="py-4">
        <div className="container">
          {initialized &&
            (user ? (
              <BooksContainer />
            ) : (
              <div className="mt-8 p-8 rounded-lg shadow-md w-full h-72 flex justify-center items-center dark:bg-slate-700">
                <h4 className="text-xl">
                  You are currently not logged in, please log in to continue
                  using the platform.
                </h4>
              </div>
            ))}
        </div>
      </main>
      <Toaster />
    </div>
  );
};
