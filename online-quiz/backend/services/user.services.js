import { createUser, getUserById } from "../data/user.db.js";
import { CustomError } from "../models/CustomError.js";

export const createUserService = async (payload) => {
  try {
    if (!payload.username || !payload.email) {
      throw new CustomError(400, "Please provide username and email");
    }
    const createdUser = await createUser(payload);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

export const getUserByIdService = async (id) => {
  try {
    const foundUser = await getUserById(id);
    return foundUser;
  } catch (error) {
    throw error;
  }
};
