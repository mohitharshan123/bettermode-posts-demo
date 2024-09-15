import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook to check if a content div is overflowing.
 * @returns A boolean indicating if the content is overflowing and a ref to the content div.
 */
const useOverflow = (): [boolean, React.RefObject<HTMLDivElement>] => {
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const checkOverflow = useCallback(() => {
    if (contentRef.current) {
      setIsOverflowing(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      checkOverflow();
    });

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    checkOverflow();

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, [checkOverflow]);

  return [isOverflowing, contentRef];
};

export default useOverflow;
