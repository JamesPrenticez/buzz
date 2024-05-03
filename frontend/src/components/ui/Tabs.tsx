import React, { useState, isValidElement, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

// TODO focus-visible

interface TabProps {
  name: string;
  className?: string;
  children: ReactNode;
}

interface Props {
  children: ReactNode[];
  className?: string;
  defaultActiveIndex?: number;
}

export function Tabs({ children, className, defaultActiveIndex = 0 }: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(defaultActiveIndex);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className={twMerge("flex bg-shadow", className)}>

      {children.map((child, index) => {
        if (!isValidElement(child)) return null;
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            className={twMerge(
              "grow flex items-center justify-center text-lg text-muted font-bold border-b-2 border-transparent mt-[3px] hover:text-major transition duration-200 ease-in-out",
              isActive ? "text-major border-major" : ""
            )}
            onClick={() => handleClick(index)}
          >
            <div className='p-4 w-full'>{(child.props as TabProps).name}</div>
          </button>
        );
      })}
      </div>

      {children[activeIndex]}
    </>
  );
}

export function Tab({ children, className }: TabProps) {
  return <div className={twMerge("", className)}>{children}</div>;
}

  /**
   * https://tsdoc.org/
   * Component allowing switching between tabs
   *
   * @remarks
   * This component provides a user interface for navigating between multiple tabs.
   *
   * @param items - An array of tab items.
   * @param onClick - A function to handle tab clicks.
   * @param defaultActiveValue - Optional: default active tab value.
  */
