import mongoose from "mongoose";
const pfeSchema = mongoose.Schema({
  description: {
    type: String,
    required: false,
  },
  sujet: {
    type: String,
    required: false,
  },
  technologies: {
    type: String,
    required: false,
  },
  societe: {
    type: String,
    required: false,
  },
  duree: {
    type: String,
    required: false,
  },
  statutStage: {
    type: String,
    required: false,
    enum: ["pas encore commencé", "en cours", "validé"],
  },
  dateDébutStage: {
    type: Date,
    required: false,
  },
  dateFinStage: {
    type: Date,
    required: false,
  },
  id_enseignant: { type: mongoose.Schema.ObjectId, ref: "users" },
  emailEnseignant: {
    type: String,
    required: false,
  },
  emailEtudiant: {
    type: String,
    required: false,
  },
  id_etudiant: { type: mongoose.Schema.ObjectId, ref: "users" },
  pays:{type:String,
  required:false}
});
const pfe = mongoose.model("listepfe", pfeSchema);
export default pfe;
