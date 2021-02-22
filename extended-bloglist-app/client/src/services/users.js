import axios from "axios";
const baseUrl = "/api/users";

// let token = null;
// const setToken = (newToken) => {
//   token = `bearer ${newToken}`;
// };

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};



