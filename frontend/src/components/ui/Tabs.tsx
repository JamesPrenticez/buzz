import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  items: string[];
  onClick: (name: any) => void;
  defaultActiveValue?: string;
}

export function Tabs({ items, onClick, defaultActiveValue }: Props) {
  const [active, setActive] = useState<string | null>(defaultActiveValue ? defaultActiveValue : null )

  return (
    <div className="flex w-full h-full">
      {items.map((item, index) => (
        <button 
          key={index}
          className={
            twMerge("grow flex items-center justify-center text-lg text-muted font-bold border-b-2 border-transparent mt-[3px] hover:text-major", 
            active === item ? "text-major border-major" : "")
          }
          onClick={() => { 
            onClick(item);
            setActive(item)
          }}
        >
          <div className='px-4 w-full'>
            {item}
          </div>
        </button>
      ))}
    </div>
  );
}
