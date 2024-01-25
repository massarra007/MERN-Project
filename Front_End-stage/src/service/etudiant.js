import Axios from "axios";

export const createEtudiant = async (EtudiantData) => {
  console.log(EtudiantData, "EtudiantData");
  const result = await Axios.post(
    "http://localhost:5000/users/create",
    EtudiantData
  );
  return result.data;
};
export const updateEtudiant = async (EtudiantData, id) => {
  const result = await Axios.put(
    "http://localhost:5000/users/updatebyid/" + id,
    EtudiantData
  );
  return result.data;
};

export const deleteEtudiant = async (id) => {
  const result = await Axios.delete(
    "http://localhost:5000/users/deletebyid/" + id
  );
  return result.data;
};
export const getEtudiantbyid = async (id) => {
  const result = await Axios.get("http://localhost:5000/users/getbyid/" + id);
  return result.data;
};
export const getAllEtudiant = async () => {
  const result = await Axios.get("http://localhost:5000/users/getAllEtudiant");
  return result.data;
};
export const etatEtd = async (id) => {
  const result = await Axios.get("http://localhost:5000/users/findol/" + id);
  return result;
};
export const newAlumni = async (data) => {
  console.log(data, "alumniData");
  const result = await Axios.post("http://localhost:5000/alumnis/create", data);
  return result.data;
};


export const addDemande = async (data) => {
  const result = await Axios.post(
    "http://localhost:5000/alumnis/addDemande",
    data
  );
  return result;
};

export const importExcel = async (data) => {
  console.log(data, "file csv");
  const result = await Axios.post("http://localhost:5000/users/uploadFile", data);
  return result.data;
};
export const getPublicCompteEtudiant = async () => {
  const result = await Axios.get(
    "http://localhost:5000/users/public-users" );
    return result.data;
  };

  export const sendmail = async () => {
    const result = await Axios.post("http://localhost:5000/users/sendmaildiplome" );
    return result;
  };
  export const sendmailcmp = async () => {
    const result = await Axios.post("http://localhost:5000/users/sendmailmajcompetences" );
    return result;
  };
  export const sendmailtravail = async () => {
    const result = await Axios.post("http://localhost:5000/users/sendmailtravail" );
    return result;
  };