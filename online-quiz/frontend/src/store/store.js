import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useQuizStore = create(
  persist(
    (set) => ({
      seconds: 5 * 60,
      user: {},
      ownResultId: null,
      setSeconds: (seconds) => set({ seconds }),
      setUser: (user) => set({ user }),
      setOwnResultId: (ownResultId) => set({ ownResultId }),
    }),
    {
      name: "quiz-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
