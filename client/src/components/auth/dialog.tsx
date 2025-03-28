import { cn } from '../../lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../common/dialog';
import { AuthForm } from './form';

type AuthDialogProps = {
  authType: 'register' | 'login';
  className: string;
};

export const AuthDialog: React.FC<AuthDialogProps> = ({
  authType,
  className,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            'px-4 py-2 rounded hover:cursor-pointer capitalize font-semibold',
            className,
          )}
        >
          {authType}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>
            Please log into your account or sign up for a new one before using
            this platform.
          </DialogDescription>
        </DialogHeader>
        <AuthForm authType={authType} />
      </DialogContent>
    </Dialog>
  );
};
