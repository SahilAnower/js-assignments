import { VITE_API_URL } from "../globals";
import axios from "axios";

export const createResult = async (payload) => {
  try {
    const response = await axios.post(VITE_API_URL + "/api/results");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllResults = async () => {
  try {
    const response = await axios.get(VITE_API_URL + "/api/results");
    return response.data;
  } catch (error) {
    throw error;
  }
};
