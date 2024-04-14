import React, { forwardRef, type LabelHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  value: string;
  className?: string;
  children?: ReactNode;
}

const Label = forwardRef<HTMLLabelElement, Props>(({ value, className, children, ...props }, ref) => {
  return (
    <div className="pb-4 relative">
      <label ref={ref} {...props} className={twMerge('' , className )}>
        <h5 className='text-[#90a299] text-sm mt-2 mb-[2px] ml-[2px] font-bold'>
          {value}
        </h5>
        {children}
      </label>
    </div>
  );
});

Label.displayName = "Label";

export { Label };
