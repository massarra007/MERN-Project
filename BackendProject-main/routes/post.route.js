import express from "express";
const router = express.Router();
import {
  getPosts,
  createPost,
  updatePost,
  getPostById,
} from "../controllers/post.controller.js";

// Route pour récupérer toutes les publications
router.get("/", getPosts);

// Route pour créer une nouvelle publication
router.post("/", createPost);
router.get("/getpost/:id", getPostById);
router.put("/:postId", updatePost);

export default router;
