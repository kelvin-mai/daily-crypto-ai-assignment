import { BookCheckSolid, SpinnerOne, Sun, Moon } from '@mynaui/icons-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../common/dropdown';
import { AuthDialog } from '../auth/dialog';
import { useAppStore } from '../../lib/store';
import { Switch } from '../common/switch';

type AvatarProps = {
  email: string;
  name: string;
};

const Avatar: React.FC<AvatarProps> = ({ email, name }) => {
  const {
    actions: { logout },
  } = useAppStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="uppercase flex h-8 w-8 items-center justify-center rounded-full bg-violet-400 text-white font-bold">
          <span>K</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <p>{email}</p>
          <p>{name}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Navbar = () => {
  const { initialized, user } = useAppStore();
  return (
    <header className="bg-slate-800 py-2">
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
            <Switch onCheckedChange={console.log} />
            <Moon className="text-teal-500" />
          </div>
        </div>
      </div>
    </header>
  );
};
