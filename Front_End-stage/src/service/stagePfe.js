import Axios from "axios";

export const createStagePfe = async (StagePfeData) => {
  console.log(createStagePfe, "StageEtéData");
  const result = await Axios.post(
    "http://localhost:5000/pfe/createPfe",
    StagePfeData
  );

  return result.data;
};

export const getPFENotencadred = async () => {
  const result = await Axios.get("http://localhost:5000/pfe/notencadred");
  console.log(result.data,"data");
  return result.data;
};
export const getAllPfe = async () => {
  const result = await Axios.get("http://localhost:5000/pfe/");
  console.log(result.data,"data");
  return result.data;
};

export const getPfeByEnseignant = async (id) => {
  const result = await Axios.get("http://localhost:5000/pfe/"+id);
  return result.data;
};

export const getStagePfeByID = async (id) => {
  const result = await Axios.get(
    "http://localhost:5000/pfe/getbyid/"+ id
  );
  return result.data;
};


export const getStageEnseignant = async (id) => {
  const result = await Axios.get(
    "http://localhost:5000/pfe/getbyidenseignant/"+ id
  );
console.log(result,"rrr");
  return result.data;
};

export const getStageid = async (id) => {
  const result = await Axios.get(
    "http://localhost:5000/pfe/getid/"+ id
  );
console.log(result,"rrr");
  return result.data;
};
export const deleteStagePfe = async (id) => {
  const result = await Axios.delete(
    "http://localhost:5000/pfe/deletebyid/" + id
  );
  return result.data;
};
export const updateStage = async (StagePFEData, id) => {
  const result = await Axios.put(
    "http://localhost:5000/pfe/updatebyid/" + id,
    StagePFEData
  );
  console.log(result,"res");
  return result.data;
};
export const getPfebyidEtudiant= async (id) => {
  const result = await Axios.get("http://localhost:5000/pfe/getpfebyidetudiant/"+id);
  return result.data;
};
export const getStudentIdOfPFE = async (id) => {
  const result = await Axios.get("http://localhost:5000/pfe/getstudent/"+id);
console.log(result);
  return result.data;
}