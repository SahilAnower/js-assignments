import {
  createQuestion,
  getQuestionByIds,
  getRandomQuestions,
} from "../data/question.db.js";
import { CustomError } from "../models/CustomError.js";

export const createQuestionService = async (payload) => {
  try {
    if (!payload.statement || !payload.answers || !payload.correctAnswer) {
      throw new CustomError(
        "Please provide statement, answers and correctAnswer",
        400
      );
    }
    const questionCreated = createQuestion(payload);
    return questionCreated;
  } catch (error) {
    throw error;
  }
};

export const getRandomQuestionsService = async () => {
  try {
    const questions = await getRandomQuestions();
    return questions;
  } catch (error) {
    throw error;
  }
};

export const getQuestionByIdsService = async (ids) => {
  try {
    const questions = await getQuestionByIds(ids);
    return questions;
  } catch (error) {
    throw error;
  }
};
