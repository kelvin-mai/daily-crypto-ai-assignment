import { useEffect } from 'react';

import { Navbar } from './layout/navbar';
import { useAppStore } from '../lib/store';
import { getProfile } from '../api/auth';
import { BooksContainer } from './books/container';

export const App = () => {
  const {
    initialized,
    user,
    actions: { setInitialized, setUser, setTheme },
  } = useAppStore();

  const initializeApp = async () => {
    try {
      if (localStorage.getItem('token')) {
        const profile = await getProfile();
        setUser(profile);
      }
      const root = window.document.documentElement;
      const systemTheme = localStorage.getItem('vite-ui-theme');
      if (systemTheme) {
        setTheme(localStorage.getItem('vite-ui-theme') as 'light' | 'dark');
        root.classList.add(systemTheme);
      } else {
        localStorage.setItem('vite-ui-theme', 'light');
        setTheme('light');
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
    </div>
  );
};
