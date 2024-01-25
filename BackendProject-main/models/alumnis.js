import mongoose from "mongoose";

const AlumnisSchema = mongoose.Schema({
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
  email: {
    type: String,
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
  pays: {
    type: String,
    required: true,
  },
  societe: {
    type: String,
    required: true,
  },
  promotion: {
    type: Number,
    required: true,
  },

  date_diplome: {
    type: Date,
    required: true,
  },
  date_embauche: {
    type: Date,
    required: true,
  },
  demande: {
    type: Boolean,
    required: false,
    default: false,
  },
  report: {
    type: Boolean,
    required: false,
    default: false,
  },
  code: {
    type: String,
    required: true,
  },
  duree_chomage: {
    type: Number,
    required: true,
  },
});

const Alumins = mongoose.model("Alumni", AlumnisSchema);
export default Alumins;
