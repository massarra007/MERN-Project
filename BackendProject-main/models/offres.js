import mongoose from "mongoose";

const OffreSchema = mongoose.Schema({
  Description: {
    type: String,
    required: false,
  },

  id_alumni: {
    type: mongoose.Schema.ObjectId,
    ref: "Alumni",
  },

  type: [
    {
      type: String,
      required: false,
    },
  ],
});

const Offres = mongoose.model("Offre", OffreSchema);
export default Offres;
