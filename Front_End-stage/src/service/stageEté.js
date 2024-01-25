import Axios from "axios";

export const createStageEté = async (StageEtéData) => {
  console.log(StageEtéData, "StageEtéData");
  const result = await Axios.post(
    "http://localhost:5000/stage/create",
    StageEtéData
  );

  return result.data;
};
export const getStageEtéByID = async (id) => {
  const result = await Axios.get(
    "http://localhost:5000/stage/getbyid/"+ id
  );
console.log(result,"rrr");
  return result.data;
};
export const getStageid = async (id) => {
  const result = await Axios.get(
    "http://localhost:5000/stage/getid/"+ id
  );
console.log(result,"rrr");
  return result.data;
};
export const deleteStageEte = async (id) => {
  const result = await Axios.delete(
    "http://localhost:5000/stage/deletebyid/" + id
  );
  return result.data;
};
export const updateStage = async (StageEtéData, id) => {
  const result = await Axios.put(
    "http://localhost:5000/stage/updatebyid/" + id,
    StageEtéData
  );
  return result.data;
};