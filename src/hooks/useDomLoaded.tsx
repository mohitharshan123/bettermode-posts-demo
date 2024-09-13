import { useState, useEffect } from "react";

/**
 * A custom React hook that tracks whether the DOM has fully loaded.
 *
 * This hook initializes a state variable `isDomLoaded` to `false`. Once the component
 * mounts and the DOM is loaded, it sets `isDomLoaded` to `true`. This can be useful for
 * deferring rendering or other actions until the DOM is ready.
 *
 * @returns {boolean} A boolean value indicating if the DOM is loaded.
 *
 */
const useDOMLoaded = (): boolean => {
  const [isDomLoaded, setIsDomLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsDomLoaded(true);
  }, []);

  return isDomLoaded;
};

export default useDOMLoaded;
