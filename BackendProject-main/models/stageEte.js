import mongoose from "mongoose";

const stageEteSchema = new mongoose.Schema(
  {
   
    description: {
      type: String,
      required: true,
    },
    sujet: {
      type: String,
      required: true,
    },
    technologies: {
type:String,
required:true
    },
    societe: {
      type: String,
      required: true,
    },
    duree: {
      type: String,
      required: true,
    },
    statutStage:{
      type: String,
      required: true,
      enum: [ "pas encore commencé", "en cours", "validé", ],

    },
    dateDébutStage:{
      type: Date,
      required: true,
    },
    dateFinStage:{
      type: Date,
      required: true,
    },
    id_etudiant: { type: mongoose.Schema.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

const StageEte = mongoose.model("StageEte", stageEteSchema);
export default StageEte;
