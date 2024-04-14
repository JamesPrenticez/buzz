import { CrossIcon } from "@components/icons";
import React, { forwardRef, type ReactElement, type ReactNode, type HTMLProps, type ButtonHTMLAttributes } from "react";
import { twMerge } from 'tailwind-merge'

const Dialog = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("fixed inset-[60px_0_0_0] md:inset-[80px_0_0_0] bg-slate-900/80 z-50 !m-0", className)}
      {...props}
    />
  )
);

Dialog.displayName = "Dialog";

const DialogContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(`
        fixed
        left-[50%]
        top-[50%]
        grid
        w-full
        max-w-lg
        translate-x-[-50%]
        translate-y-[-50%]
        gap-4
        border
        border-major 
        rounded-md
        bg-ghost 
        p-6 
        shadow-lg
        duration-200`, className
      )}
      onClick={(e) => {e.stopPropagation()}}
      {...props}
    >
      {children}
    </div>
  )
);

DialogContent.displayName = "DialogContent";

interface DialogHeaderProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

function DialogHeader ({ className, children, ...props }: DialogHeaderProps): ReactElement {
  return (
    <div className={twMerge("flex items-center text-center text-muted sm:text-left", className)} {...props}>  
      {children}
    </div>

  )
};

const DialogTitle = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("text-lg font-semibold leading-none tracking-tight text-muted", className)}
      {...props}
    />
  )
);

DialogTitle.displayName = "DialogTitle";

interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string; 
  children?: ReactNode;
}

function DialogClose({ className, children, ...props }: DialogCloseProps): ReactElement{
  return (
    <button className={twMerge("ml-auto text-muted hover:text-primary", className)} {...props}>
      <CrossIcon width={26}/>
    </button>
  )
};

const DialogDescription = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("text-sm text-muted", className)}
      {...props}
    />
  )
);
DialogDescription.displayName = "DialogDescription";

const DialogFooter: React.FC<HTMLProps<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div className={twMerge("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 text-muted", className)} {...props} />
  );
};

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
