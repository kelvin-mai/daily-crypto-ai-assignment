import { toast } from 'sonner';

import { useAppEffects } from '../../lib/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../common/dropdown';

type AvatarProps = {
  email: string;
  name: string;
};

export const Avatar: React.FC<AvatarProps> = ({ email, name }) => {
  const { logout } = useAppEffects();
  const handleLogout = () => {
    logout();
    toast.success('You have been logged out.');
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="uppercase flex h-8 w-8 items-center justify-center rounded-full bg-violet-400 text-white font-bold">
          <span>{name[0]}</span>
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
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
