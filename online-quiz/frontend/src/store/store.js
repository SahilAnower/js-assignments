import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useQuizStore = create(
  persist(
    (set) => {
      return {
        seconds: 5 * 60,
        user: {},
        // ownResultId: null,
        questions: null,
        currResult: null,
        questionMap: {},
        setSeconds: (seconds) => set({ seconds }),
        setUser: (user) => set({ user }),
        // setOwnResultId: (ownResultId) => set({ ownResultId }),
        setQuestions: (questions) => set({ questions }),
        setCurrResult: (currResult) => set({ currResult }),
        setQuestionMap: (questionMap) => set({ questionMap }),
      };
    },
    {
      name: "quiz-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
