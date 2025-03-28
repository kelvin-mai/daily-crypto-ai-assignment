import { Bookmark, SpinnerOne } from '@mynaui/icons-react';

import { AuthDialog } from '../auth/dialog';
import { useAppStore } from '../../lib/store';

export const Navbar = () => {
  const { initialized, user } = useAppStore();
  return (
    <header className="bg-slate-800 py-2">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl font-bold text-teal-500">
          <Bookmark />
          <span>Book Tracker</span>
        </div>
        <div className="flex gap-2">
          {initialized ? (
            user ? (
              <>
                <div className="uppercase flex h-8 w-8 items-center justify-center rounded-full bg-violet-400 text-white font-bold">
                  <span>{user.name[0]}</span>
                </div>
              </>
            ) : (
              <>
                <AuthDialog
                  authType="login"
                  className="bg-teal-500 text-white"
                />
                <AuthDialog
                  authType="register"
                  className="bg-violet-500 text-white"
                />
              </>
            )
          ) : (
            <SpinnerOne className="text-teal-500 animate-spin" />
          )}
        </div>
      </div>
    </header>
  );
};
