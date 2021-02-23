import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getAll = async () => {
  const {data} = await axios.get(baseUrl);
  return data
};

export const createBlog = async (newBlog) => {
  const config = {
    headers: { authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

export const changeBlog = async (changedBlog) => {
  const response = await axios.put(`${baseUrl}/${changedBlog.id}`, changedBlog);
  return response.data;
};

export const deleteBlog = async (id) => {
  const config = {
    headers: { authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export const commentBlog = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

