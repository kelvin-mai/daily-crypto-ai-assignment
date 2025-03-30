import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: `group toast group-[.toaster]:bg-white group-[.toaster]:text-black group-[.toaster]:border-slate-200 group-[.toaster]:shadow-lg`,
          description:
            'group-[.toast]:text-slate-500 dark:group-[.toast]:text-slate-400',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
