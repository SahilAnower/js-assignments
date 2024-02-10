import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useQuizStore = create(
  persist(
    (set) => ({
      seconds: 10,
      setSeconds: (seconds) => set({ seconds }),
    }),
    {
      name: "quiz-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
