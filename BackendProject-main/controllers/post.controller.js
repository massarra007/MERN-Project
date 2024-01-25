import Post from "../models/post.model.js";

// Méthode pour récupérer toutes les publications
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(50);
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des publications." });
  }
};
// Méthode pour créer une nouvelle publication
export const createPost = async (req, res) => {
  try {
    const postData = req.body;
    const post = await Post.create(postData);
    res.status(201).json({ message: "Publication créée avec succès." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la publication." });
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.postId;
  const { title, content, author } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content, author },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post introuvable." });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du post." });
  }
};
export const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ error: "Le post spécifié est introuvable." });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du post." });
  }
};
