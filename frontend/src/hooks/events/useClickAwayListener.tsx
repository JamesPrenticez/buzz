import { useEffect, useState, RefObject } from 'react';

export function useClickAwayListener(ref: RefObject<HTMLElement>): boolean {
  const [isClickedAway, setIsClickedAway] = useState(false);

  useEffect(() => {
    function handleClickAway(event: MouseEvent | TouchEvent) {
      const targetElement = event.target as Node;

      // Do nothing if clicking ref's element or descendent elements
      if (ref.current && ref.current.contains(targetElement)) {
        setIsClickedAway(false);
        return;
      }

      setIsClickedAway(true);
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickAway);
    document.addEventListener('touchstart', handleClickAway);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickAway);
      document.removeEventListener('touchstart', handleClickAway);
    };
  }, [ref]);

  return isClickedAway;
}
