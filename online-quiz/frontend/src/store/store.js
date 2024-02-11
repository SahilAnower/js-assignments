import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useQuizStore = create(
  persist(
    (set) => ({
      seconds: 10,
      userId: null,
      ownResultId: null,
      setSeconds: (seconds) => set({ seconds }),
      setUserId: (userId) => set({ userId }),
      setOwnResultId: (ownResultId) => set({ ownResultId }),
    }),
    {
      name: "quiz-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
