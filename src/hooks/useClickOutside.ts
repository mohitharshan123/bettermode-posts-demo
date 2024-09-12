import { useEffect, RefObject } from "react";

/**
 * Parameters for the useClickOutside hook.
 */
interface UseClickOutsideParams {
  popupRef: RefObject<HTMLElement>;
  buttonRef: RefObject<HTMLElement>;
  action: () => void;
}

/**
 * Hook that triggers a callback when a click is detected outside of the specified elements.
 *
 * @param params - An object containing `popupRef`, `buttonRef`, and `action`.
 */
const useClickOutside = ({
  popupRef,
  buttonRef,
  action,
}: UseClickOutsideParams) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      action();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, buttonRef, action]);
};

export default useClickOutside;
