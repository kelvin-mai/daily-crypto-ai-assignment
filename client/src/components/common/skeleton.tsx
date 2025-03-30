import { cn } from '../../lib/utils';

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-slate-500/10', className)}
      {...props}
    />
  );
};
