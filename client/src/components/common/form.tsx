import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';

import { cn } from '../../lib/utils';
import { useAppStore } from '../../lib/store';

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className,
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, type, ...props }, ref) => {
  const radius = 100;
  const { theme } = useAppStore();
  const [visible, setVisible] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          ${theme === 'dark' ? '#14b8a6' : '#8b5cf6'},
          transparent 80%
        )`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input rounded-lg p-[2px] transition duration-300"
    >
      <input
        type={type}
        ref={ref}
        className={cn(
          `shadow-input
             flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none
             file:border-0 file:bg-transparent file:text-sm file:font-medium
           placeholder:text-neutral-400
             focus-visible:ring-[2px] focus-visible:ring-violet-400 focus-visible:outline-none
             dark:focus-visible:ring-teal-400
             disabled:cursor-not-allowed disabled:opacity-50
             `,
          className,
        )}
        {...props}
      />
    </motion.div>
  );
});

export const FormInput: React.FC<
  React.ComponentProps<'input'> & { label: string }
> = ({ label, className, ...props }) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      <Label htmlFor={props.id}>{label}</Label>
      <Input {...props} />
    </div>
  );
};
