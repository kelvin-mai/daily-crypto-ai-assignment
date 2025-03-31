import { BookCheckSolid, SpinnerOne, Sun, Moon } from '@mynaui/icons-react';

import { useAppEffects, useAppStore } from '../../lib/store';
import { Switch } from '../common/switch';
import { AuthDialog } from '../auth/dialog';
import { Avatar } from '../auth/avatar';

export const Navbar = () => {
  const { initialized, user, theme } = useAppStore();
  const { setTheme } = useAppEffects();
  return (
    <header className="bg-slate-900 py-2">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl font-bold text-teal-500">
          <BookCheckSolid className="h-8 w-8" />
          <span>Book Tracker</span>
        </div>
        <div className="flex gap-2">
          {initialized ? (
            user ? (
              <Avatar {...user} />
            ) : (
              <>
                <AuthDialog
                  action="login"
                  className="bg-teal-500 text-white font-bold"
                />
                <AuthDialog
                  action="register"
                  className="bg-violet-500 text-white font-bold"
                />
              </>
            )
          ) : (
            <SpinnerOne className="text-teal-500 animate-spin" />
          )}
          <div className="flex items-center justify-center gap-2">
            <Sun className="text-teal-500" />
            <Switch checked={theme === 'dark'} onCheckedChange={setTheme} />
            <Moon className="text-teal-500" />
          </div>
        </div>
      </div>
    </header>
  );
};
