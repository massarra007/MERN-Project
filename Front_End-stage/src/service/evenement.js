import Axios from "axios"

export const createEvenement = async (EvenementData) => {
  const result = await Axios.post("http://localhost:5000/evenements/create", EvenementData)
  return result.data
}
export const updateEvenement = async (EvenementData, id) => {
  const result = await Axios.put("http://localhost:5000/evenements/updatebyid/"+id, EvenementData)
  return result.data
}

export const deleteEvenement = async (id) => {
  const result = await Axios.delete("http://localhost:5000/evenements/deletebyid/"+id)
  return result.data
}
export const getEvenementbyid = async (id) => {
  const result = await Axios.get("http://localhost:5000/evenements/getbyid/"+id)
  return result.data
}
export const getAllEvenement = async () => {
  const result = await Axios.get("http://localhost:5000/evenements/getAll")
  return result.data
}

export const getAllEvenementSaison = async (annee) => {
  const result = await Axios.get("http://localhost:5000/evenements/getAllEventSaison/"+annee)
  return result.data
}