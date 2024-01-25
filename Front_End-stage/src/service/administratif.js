import Axios from "axios";
export const createAdministratif = async (AdministratifData) => {
  const result = await Axios.post(
    "http://localhost:5000/users/create",
    AdministratifData
  );
  return result.data;
};
export const updateAdministratif = async (AdministratifData, id) => {
  const result = await Axios.put(
    "http://localhost:5000/users/updatebyid/" + id,
    AdministratifData
  );
  return result.data;
};

export const deleteAdministratif = async (id) => {
  const result = await Axios.delete(
    "http://localhost:5000/users/deletebyid/" + id
  );
  return result.data;
};
export const getAdministratifbyid = async (id) => {
  const result = await Axios.get("http://localhost:5000/users/getbyid/" + id);
  return result.data;
};
export const getAllAdministratif= async () => {
  const result = await Axios.get("http://localhost:5000/users/getAllAdministartif");
  return result.data;
};





