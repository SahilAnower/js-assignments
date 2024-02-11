import { VITE_API_URL } from "../globals";
import axios from "axios";

export const createUserAPI = async (payload) => {
  try {
    const response = await axios.post(VITE_API_URL + "/api/users", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
