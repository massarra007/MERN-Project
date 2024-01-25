import mongoose from "mongoose";

const EtudiantsSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: false,
  },

  password: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  Birth_date: {
    type: Date,
    required: true,
  },
  Cv: {
    type: String,
    required: false,
  },

  depot: {
    type: String,
    required: false,
  },
  Role: {
    type: String,
    default: "etudiant",
  },
  niveau:{
    type: String,
    required: true,
    enum: [ "licence", "master", "cycle ingénieur", ],
},
  
  classe:{
    type: String,
    required: true,
  },
  status:{
    type: String,
    required: true,
    enum: [ "alumni", "actuel"],
  }
});
const Etudiants = mongoose.model("Etudiant", EtudiantsSchema);
export default Etudiants;
