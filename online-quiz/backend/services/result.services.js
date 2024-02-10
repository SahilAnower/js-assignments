import { createResult, getAllResults } from "../data/result.db.js";
import { CustomError } from "../models/CustomError.js";
import { getQuestionByIdsService } from "./question.services.js";

export const createResultService = async (payload) => {
  try {
    if (!payload.answers || !payload.userId) {
      throw new CustomError(400, "Answers array and userId are required!");
    }
    const answers = payload.answers;
    const userId = payload.userId;
    const ids = answers.map((ans) => ans.id);
    const dbQuestions = await getQuestionByIdsService(ids);
    const mp = new Map();
    for (const dbQuestion of dbQuestions) {
      mp.set(dbQuestion._id.toString(), dbQuestion.correctAnswer);
    }
    let count = 0;
    for (const answer of answers) {
      if (mp.get(answer.id) === answer.answer) {
        count++;
      }
    }
    const savedResult = await createResult({
      user: userId,
      score: count,
    });
    return savedResult;
  } catch (error) {
    throw error;
  }
};

export const resultGetAllService = async () => {
  try {
    const response = await getAllResults();
    return response;
  } catch (error) {
    throw error;
  }
};
