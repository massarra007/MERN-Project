import mongoose from "mongoose";
const technologieSchema = mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
});

const technologie = mongoose.model("technologie", technologieSchema);
export default technologie;