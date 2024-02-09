import {
  createResultService,
  resultGetAllService,
} from "../services/result.services.js";

export const resultCreate = async (req, res, next) => {
  try {
    const response = await createResultService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const resultGet = async (req, res, next) => {
  try {
    const response = await resultGetAllService();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
