import { useState } from 'react';

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
import { Button } from '../common/button';

type AuthDialogProps = {
  action: 'register' | 'login';
  className: string;
};

export const AuthDialog: React.FC<AuthDialogProps> = ({
  action,
  className,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn('capitalize font-semibold', className)}>
          {action}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>
            Please log into your account or sign up for a new one before using
            this platform.
          </DialogDescription>
        </DialogHeader>
        <AuthForm mode={action} onComplete={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
