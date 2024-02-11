import { VITE_API_URL } from "../globals";
import axios from "axios";

export const createResultAPI = async (payload) => {
  try {
    const response = await axios.post(VITE_API_URL + "/api/results", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllResultsAPI = async () => {
  try {
    const response = await axios.get(VITE_API_URL + "/api/results");
    return response.data;
  } catch (error) {
    throw error;
  }
};
