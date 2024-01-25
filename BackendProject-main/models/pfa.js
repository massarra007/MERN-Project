import mongoose from "mongoose";
const pfaSchema = mongoose.Schema({
  sujet: {
  type: String,
  required: false,
  },

  titre: {
    type: String,
    required: false,
  },

  nbre_etudiant: {
    type: Number,
    required: false,
    default: 1
  },

  description: {
    type: String,
    required: false,
  },

  isValidated: {
    type: Boolean,
    default: false,
    required: false,
  },

  isAffected: {
    type: Boolean,
    default: false,
    required: false,
  },

  technologies: [
    {
      type: mongoose.Schema.ObjectId, ref:"technologie",
    }
  ],
  
  id_enseignant: { type: mongoose.Schema.ObjectId, ref: "users" },
  id_etudiant: { type: mongoose.Schema.ObjectId, ref: "users" },
});

const pfa = mongoose.model("pfa", pfaSchema);
export default pfa;
