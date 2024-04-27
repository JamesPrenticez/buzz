import { useState, useEffect, useRef, type FocusEvent } from 'react';

export const useFocusBlur = (initialIsActive: boolean) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<boolean>(initialIsActive);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return {
    inputRef,
    containerRef,
    isActive,
    setIsActive,
    handleBlur
  };
};

// ALTERNATIVLY 
// We could add this code to the main component...

// const inputRef = useRef(null);
// const containerRef = useRef(null);
// const [inputValue, setInputValue] = useState("");
// const [isActive, setIsActive] = useState(false);

// useEffect(() => {
//   if (isActive && inputRef.current) {
//     inputRef.current.focus();
//   }
// }, [isActive]);

// useEffect(() => {
//   const handleClickOutside = (e) => {
//     if (containerRef.current && !containerRef.current.contains(e.target)) {
//       setIsActive(false);
//     }
//   };

//   document.addEventListener('mousedown', handleClickOutside);

//   return () => {
//     document.removeEventListener('mousedown', handleClickOutside);
//   };
// }, []);

// const handleChange = (e) => {
//   setInputValue(e.target.value);
// };

// const handleBlur = (e) => {
//   e.preventDefault();
//   if (isActive && inputRef.current) {
//     inputRef.current.focus();
//   }
// };