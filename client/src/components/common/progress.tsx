import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { motion } from 'framer-motion';

import { cn } from '../../lib/utils';

const getProgressColor = (n?: number | null) => {
  if (!n) return { cn: 'bg-slate-700', v: `var(--color-slate-700)` };
  if (n === 100) return { cn: 'bg-violet-500', v: `var(--color-violet-500)` };
  if (n >= 50) return { cn: 'bg-teal-500', v: `var(--color-teal-500)` };
  if (n >= 30) return { cn: 'bg-amber-300', v: `var(--color-amber-300)` };
  return { cn: 'bg-rose-400', v: `var(--color-rose-400)` };
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const progressColor = getProgressColor(value);
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-slate-700/20',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator asChild>
        <motion.div
          className={cn(
            'h-full w-full flex-1 transition-all',
            progressColor.cn,
          )}
          initial={{
            translateX: `-100%`,
            backgroundColor: `var(--color-amber-300)`,
          }}
          animate={{
            translateX: `-${100 - (value || 0)}%`,
            backgroundColor: progressColor.v,
          }}
        />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
