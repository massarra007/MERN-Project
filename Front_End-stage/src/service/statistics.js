import Axios from "axios";

/* export const getAllSociete = async () => {
    const result = await Axios.get(
      "http://localhost:5000/pfe/"
    );
  console.log(result,"rrr");
    return result.data;;
  };
  export const getAllPfe = async () => {
    const result = await Axios.get("http://localhost:5000/pfe/");
    return result.data.listepfe;;
  }; */


  export const getStats = async () => {
    const result = await Axios.get("http://localhost:5000/pfe/getstatpfe");
    return result.data;
  };