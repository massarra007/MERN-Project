import mongoose from "mongoose";

const SaisonSchema = mongoose.Schema({
  AnneeUniv: {
    type: String,
    required: false,
  },

 

});

const Saison = mongoose.model("Saison", SaisonSchema);
export default Saison;
