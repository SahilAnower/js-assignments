import { VITE_API_URL } from "../globals";
import axios from "axios";

export const getQuestionsAPI = async () => {
  try {
    const response = await axios.get(VITE_API_URL + "/api/questions");
    return response.data;
  } catch (error) {
    throw error;
  }
};
