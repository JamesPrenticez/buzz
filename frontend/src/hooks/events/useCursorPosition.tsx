import {  useCallback, useState, useEffect, useRef, type RefObject,} from "react";

type RefType<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement> = RefObject<T>;

export function useCursorPosition<
  T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
>(ref: RefType<T>) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [realCursorPosition, setRealCursorPosition] = useState(0);

  const updateCaret = useCallback(() => {
    // Use a timeout to delay the reading of selectionStart and selectionEnd
    const timeoutId = setTimeout(() => {
      if (ref.current) {
        const { selectionStart, selectionEnd } = ref.current;
        setStart(selectionStart!);
        setEnd(selectionEnd!);
      }
    }, 0);

    // Return a cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  }, [ref]);

  // handle keyboard
  useEffect(() => {
    if (ref.current) {
      ref.current.setSelectionRange(start, end);
      setRealCursorPosition(ref.current.value.length - start)
    }
  }, [start, end, ref]);

  // handle click
  useEffect(() => {
    if (ref.current) {
      const invertRealCursorPosition = ref.current.value.length - realCursorPosition
      ref.current.focus();
      ref.current.setSelectionRange(invertRealCursorPosition, invertRealCursorPosition);
    }
  }, [realCursorPosition, ref]);

  return { realCursorPosition, start, end, updateCaret, setRealCursorPosition };
}