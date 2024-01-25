import { useState } from "react";
import * as api from "../../../service/posts";
function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content, author };
    await api.createPost(newPost);
    // Réinitialiser les champs après la soumission
    setTitle("");
    setContent("");
    setAuthor("");
    // Rediriger vers la page de liste des publications
    window.location.href = "/list-posts";
  };

  const styles = {
    h1: {
      fontSize: "32px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "400px",
      margin: "0 auto",
    },
    formDiv: {
      marginBottom: "20px",
    },
    label: {
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#f2f2f2",
      color: "#333",
      fontWeight: "bold",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#ddd",
    },
  };

  return (
    <div>
      <h1 style={styles.h1}>Ajouter un post</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formDiv}>
          <label htmlFor="title" style={styles.label}>
            Titre :
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formDiv}>
          <label htmlFor="content" style={styles.label}>
            Contenu :
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={styles.input}
          ></textarea>
        </div>
        <div style={styles.formDiv}>
          <label htmlFor="author" style={styles.label}>
            Auteur :
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default AddPost;
