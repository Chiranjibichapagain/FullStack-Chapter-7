import axios from "axios";
const baseUrl = "/api/login";

export const login = async (username, password ) => {
  const { data } = await axios.post(baseUrl, { username, password });
  return data;
};

