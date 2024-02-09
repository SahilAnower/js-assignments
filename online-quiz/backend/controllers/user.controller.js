import { createUserService } from "../services/user.services.js";

export const userCreate = async (req, res, next) => {
  try {
    const response = await createUserService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
