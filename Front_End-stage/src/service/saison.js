import Axios from "axios";

export const createSaison = async (saison) => {
  console.log(saison, "saison");
  const result = await Axios.post(
    "http://localhost:5000/saison/createSaison",
    saison
  );
//console.log(result.data, "saision");
  return result.data;
};

export const findSaison = async (saison) => {
  const result = await Axios.get(
    "http://localhost:5000/saison/findSaison",
    saison
  );
//console.log(result.data, "saision");
  return result.data;
};