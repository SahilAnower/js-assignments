import QuestionModel from "../models/Question.js";

// // create, get 5 random, get passed in ids to get from db

export const createQuestion = async (payload) => {
  try {
    const res = await QuestionModel.create(payload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const getRandomQuestions = async () => {
  try {
    const pipeline = [
      {
        $sample: { size: 5 },
      },
      {
        $project: {
          correctAnswer: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
    ];
    const res = await QuestionModel.aggregate(pipeline);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const getQuestionByIds = async (ids) => {
  try {
    const res = await QuestionModel.find(
      { _id: { $in: ids } },
      {
        correctAnswer: 1,
      }
    );
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};
