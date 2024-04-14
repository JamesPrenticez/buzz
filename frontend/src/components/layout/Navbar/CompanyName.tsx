import React, { type ReactElement, type HTMLAttributes } from 'react';
import { Paths } from '@models';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface CompanyNameProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function CompanyName({ className, ...props }: CompanyNameProps): ReactElement {
  return (
    <NavLink to={Paths.HOME}>
      <h1
        className={twMerge(`
          cursor-pointer
          text-[20px]
          text-primary
          font-[600]
          font-[inter]
          `, className)}
        {...props}
      >
        SELF <span className="font-[200]">REGULATOR</span>
      </h1>
    </NavLink>
  );
};

export default CompanyName;