import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Type definition for the user store state.
 *
 * @typedef {Object} UserStore
 * @property {string} email - The current email address of the user.
 * @property {(email: string) => void} setEmail - Function to update the email address.
 */
type UserStore = {
  email: string;
  setEmail: (email: string) => void;
};

/**
 * Creates a Zustand store for managing user email with local storage persistence.
 *
 * @function
 * @returns {UserStore} The Zustand store containing the email state and updater function.
 */

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      email: "",
      setEmail: (email: string) => set({ email }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
