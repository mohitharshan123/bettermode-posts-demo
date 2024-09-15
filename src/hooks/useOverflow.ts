import { useState, useRef, useLayoutEffect } from "react";

/**
 * Custom hook to check if a content div is overflowing.
 * @returns A boolean indicating if the content is overflowing.
 */
const useOverflow = (): [boolean, React.RefObject<HTMLDivElement>] => {
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        setIsOverflowing(
          contentRef.current.scrollHeight > contentRef.current.clientHeight
        );
      }
    };

    checkOverflow();
  }, []);

  return [isOverflowing, contentRef];
};

export default useOverflow;
