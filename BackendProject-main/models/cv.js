import mongoose from "mongoose";
const cvSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  Birth_date: {
    type: Date,
    required: false,
  },
  niveau: {
    type: String,
    required: false,
    enum: ["licence", "master", "cycle ingénieur"],
  },
  classe: {
    type: String,
    required: false,
  },
  adresse: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  experiences: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      date_debut: {
        type: Date,
        required: true,
      },
      date_fin: {
        type: Date,
        required: true,
      },
    },
  ],
  stages: [
    {
      sujet: {
        type: String,
        required: true,
      },
      societe: {
        type: String,
        required: true,
      },
      duree: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["Stage d'ete", "PFA", "PFE"],
        required: true,
      },
    },
  ],
  photo: {
    type: String,
    required: false,
  },
  mode: {
    type: String,
    required: false,
    default: 'light',
  },
  iduser: { type: mongoose.Schema.ObjectId, ref: "users" },
});

const cv = mongoose.model("cv", cvSchema);
export default cv;
