import { createUser, getUserById } from "../data/user.db.js";
import { CustomError } from "../models/CustomError.js";

export const createUserService = async (payload) => {
  try {
    if (
      !payload.username ||
      !payload.email ||
      payload.email === "" ||
      payload.username === ""
    ) {
      // console.log("here");
      throw new CustomError("Please provide username and email", 400);
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
