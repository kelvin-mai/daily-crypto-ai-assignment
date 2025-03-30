import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '../../lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          `py-2 px-4
           inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors
           hover:cursor-pointer
           focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400
           disabled:pointer-events-none disabled:opacity-50
           [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
