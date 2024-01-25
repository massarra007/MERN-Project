import Axios from "axios";

export const createPost = async (postData) => {
  const result = await Axios.post("http://localhost:5000/posts/", postData);
  return result.data;
};
export const getPosts = async (id) => {
  const result = await Axios.get("http://localhost:5000/posts/");
  return result.data;
};
export const updatePost = async (id, item) => {
  const result = await Axios.put("http://localhost:5000/posts/" + id, item);
  return result.data;
};
export const getPostById = async (id) => {
  const result = await Axios.get("http://localhost:5000/posts/getpost/" + id);
  return result.data;
};
