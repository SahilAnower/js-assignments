import ResultModel from "../models/Result.js";

export const createResult = async (payload) => {
  try {
    const res = await ResultModel.create(payload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const getAllResults = async (searchPayload = null) => {
  try {
    const res = await ResultModel.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 1,
          score: 1,
          user: {
            _id: "$user._id",
            username: "$user.username",
            email: "$user.email",
          },
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};
