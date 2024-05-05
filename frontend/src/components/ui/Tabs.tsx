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
    <div className='flex flex-col h-full'>
      <div className={twMerge("flex bg-shadow", className)}>

      {children.map((child, index) => {
        if (!isValidElement(child)) return null;
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            className={twMerge(
              "flex  w-full items-center justify-center text-lg text-muted font-bold border-b-2 border-transparent mt-[3px] hover:text-major transition duration-200 ease-in-out",
              isActive ? "text-major border-major" : ""
            )}
            onClick={() => handleClick(index)}
          >
            <div className='p-4 w-full'>{(child.props as TabProps).name}</div>
          </button>
        );
      })}
      </div>

      {/* TODO - fade-in out transition */}
      {/* <div className={`flex flex-grow transition duration-2000 ease-in-out`}> */}
        {/* {children.map((child, index) => {
          console.log(index)
          if (!isValidElement(child)) return null;

          return (
            <div key={index} className={`flex flex-grow transition duration-1000 ease-in-out ${index === activeIndex ? "opacity-1" : "opacity-0"}`}>
              {child}
            </div>
          );
        })} */}
      {/* </div>  */}

      {children[activeIndex]}

    </div>
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
