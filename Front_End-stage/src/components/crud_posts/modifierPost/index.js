import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../../service/posts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModifyPostPage() {
  const _post = useParams();
  const postId = _post.id;

  const [post, setPost] = useState({ title: "", content: "", author: "" });

  useEffect(() => {
    async function fetchPost() {
      const result = await api.getPostById(postId);
      setPost(result);
    }
    fetchPost();
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.updatePost(postId, post);
      toast
        .promise(Promise.resolve(), {
          pending: "Modification en cours...",
          success: "Le post a été modifié avec succès !",
          error: "Une erreur s'est produite lors de la modification du post.",
        })
        .then(() => {
          window.location.href = "/list-posts";
        });
    } catch (error) {
      console.error("Erreur lors de la modification du post :", error);
      toast.error("Une erreur s'est produite lors de la modification du post.");
    }
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
      <h1 style={styles.h1}>Modifier le Post</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formDiv}>
          <label htmlFor="title" style={styles.label}>
            Titre :
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formDiv}>
          <label htmlFor="content" style={styles.label}>
            Contenu :
          </label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleInputChange}
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
            name="author"
            value={post.author}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Modifier</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ModifyPostPage;
