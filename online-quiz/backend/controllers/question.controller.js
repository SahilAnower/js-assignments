import {
  createQuestionService,
  getRandomQuestionsService,
} from "../services/question.services.js";

export const questionCreate = async (req, res, next) => {
  try {
    const response = await createQuestionService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

export const questionGetRandom = async (req, res, next) => {
  try {
    const response = await getRandomQuestionsService();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
