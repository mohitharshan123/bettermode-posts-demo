import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to check if a content div is overflowing.
 * @returns A boolean indicating if the content is overflowing.
 */
const useOverflow = (): [boolean, React.RefObject<HTMLDivElement>] => {
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        setIsOverflowing(
          contentRef.current.scrollHeight > contentRef.current.clientHeight
        );
      }
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return [isOverflowing, contentRef];
};

export default useOverflow;
