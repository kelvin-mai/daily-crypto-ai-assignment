import { useEffect } from 'react';

import { Navbar } from './layout/navbar';
import { useAppStore } from '../lib/store';
import { getProfile } from '../api/auth';

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

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <h1 className="text-2xl font-bold">Hello World</h1>
      </main>
    </div>
  );
};
