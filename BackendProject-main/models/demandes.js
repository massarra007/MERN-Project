import mongoose from "mongoose";

const DemandesSchema = mongoose.Schema({
  idAlumni: {
    type: mongoose.Schema.ObjectId,
    ref: "Alumni",
  },
  idDirecteur: {
    type: mongoose.Schema.ObjectId,
    ref: "Directeur",
  },
  status: {
    type: Boolean,
    required: true,
  },
  vacation: {
    type: Boolean,
    required: true,
  },
  expert: {
    type: Boolean,
    required: true,
  },
  matiere: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Demandes = mongoose.model("Demande", DemandesSchema);
export default Demandes;
