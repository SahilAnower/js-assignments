import UserModel from "../models/User.js";

export const createUser = async (payload) => {
  try {
    const res = await UserModel.create(payload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const res = await UserModel.findById(id);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};
