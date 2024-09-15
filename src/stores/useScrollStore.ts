import { create } from "zustand";

// Define the types for the store state and actions
export type ScrollStoreState = {
  isInfiniteScrollEnabled: boolean; // Flag to enable or disable infinite scrolling
  toggleInfiniteScroll: () => void; // Function to toggle the infinite scroll state
};

/**
 * useStore - Zustand store for managing infinite scroll state.
 *
 * @returns {StoreState} - The Zustand store with state and actions for infinite scroll.
 */
const useScrollStore = create<ScrollStoreState>((set) => ({
  isInfiniteScrollEnabled: false,
  toggleInfiniteScroll: () =>
    set((state) => ({
      isInfiniteScrollEnabled: !state.isInfiniteScrollEnabled,
    })),
}));

export default useScrollStore;
