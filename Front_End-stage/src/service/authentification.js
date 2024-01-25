import Axios from "axios";
export const header = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export const signin = async (signinData) => {
  console.log(signinData, "signinData");
  const result = await Axios.post(
    "http://localhost:5000/users/signin",
    signinData
  );
  console.log(result, "result");
  return result.data;
};
export const password_reset = async (email) => {
  const result = await Axios.post("http://localhost:5000/reset", { email });
  return result.data;
};
export const verify_password_reset_link = async (id, token) => {
  const url = `http://localhost:5000/reset/${id}/${token}`;
  const result = await Axios.get(url);
  return result;
};
export const new_password = async (id, token, password) => {
  const url = `http://localhost:5000/reset/${id}/${token}`;
  const result = await Axios.post(url, { password });
  return result.data;
};
export const checkStatus = async (code) => {
  const url = `http://localhost:5000/alumnis/check/${code}`;
  const result = await Axios.get(url);
  return result.data;
};
export const change_password = async (id, password) => {
  const url = `http://localhost:5000/reset/${id}`;
  const result = await Axios.post(url, { password });
  return result.data;
}; 
