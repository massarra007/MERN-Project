import mongoose from "mongoose";

// Schéma de la publication
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Modèle de la publication
const Post = mongoose.model("Post", postSchema);

export default Post;
