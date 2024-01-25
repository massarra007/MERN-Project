import Axios from "axios";
export const createEnseignant = async (EnseignantData) => {
  const result = await Axios.post(
    "http://localhost:5000/users/create",
    EnseignantData
  );
  return result.data;
};
export const updateEnseignant = async (EnseignantData, id) => {
  const result = await Axios.put(
    "http://localhost:5000/users/updatebyid/" + id,
    EnseignantData
  );
  return result.data;
};

export const deleteEnseignant = async (id) => {
  const result = await Axios.delete(
    "http://localhost:5000/users/deletebyid/" + id
  );
  return result.data;
};
export const getEnseignantbyid = async (id) => {
  const result = await Axios.get("http://localhost:5000/users/getbyid/" + id);
  return result.data;
};
export const getAllEnseignant = async () => {
  const result = await Axios.get(
    "http://localhost:5000/users/getAllEnseignant"
  );
  return result.data;
};
export const getAlumnis = async () => {
  const result = await Axios.get("http://localhost:5000/enseignant/lists");
  return result.data;
};
export const acceptDemande = async (id) => {
  const result = await Axios.post(
    "http://localhost:5000/enseignant/acceptAlumni/" + id
  );
  return result.data;
};

export const reportDemande = async (id) => {
  const result = await Axios.put(
    "http://localhost:5000/enseignant/report/" + id
  );
  return result.data;
};
export const getStats = async () => {
  const result = await Axios.get("http://localhost:5000/alumnis/stat");
  return result.data;
};
export const getStatChomage = async () => {
  const result = await Axios.get("http://localhost:5000/alumnis/statchomage");
  return result.data;
};
export const getDemandes = async () => {
  const result = await Axios.get(
    "http://localhost:5000/administratif/getDemandesVacation"
  );
  return result.data;
};
export const getDemandesExpert = async () => {
  const result = await Axios.get(
    "http://localhost:5000/administratif/getDemandesExpert"
  );
  return result.data;
};
