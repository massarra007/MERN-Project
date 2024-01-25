import { useEffect, useState } from "react";
import * as api from "../../../service/posts";
import { Link } from "react-router-dom";

function ListPosts() {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    async function fetchData() {
      const result = await api.getPosts();
      setRows(result);
    }
    fetchData();
  }, []);

  const displayPosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    const postStyles = {
      post: {
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "20px",
        marginTop: "10px",
        width: "90%",
        margin: "0 auto",
        boxSizing: "border-box",
        backgroundColor: "lightgrey",
      },
      postTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "10px",
      },
      postContent: {
        fontSize: "16px",
        marginBottom: "10px",
      },
      postDetails: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      },
      postAuthor: {
        fontSize: "14px",
      },
      postCreatedAt: {
        fontSize: "14px",
      },
      editPostLink: {
        position: "right",
        top: "0",
        right: "0",
        color: "red",
      },
    };

    return rows.slice(startIndex, endIndex).map((post) => (
      <div style={postStyles.post} key={post._id}>
        <h2 style={postStyles.postTitle}>{post.title}</h2>
        <p style={postStyles.postContent}>{post.content}</p>
        <div style={postStyles.postDetails}>
          <p style={postStyles.postAuthor}>{post.author}</p>
          <p style={postStyles.postCreatedAt}>{post.createdAt}</p>
        </div>
        {/* Ajoutez le lien ou le bouton de modification */}
        <Link to={`/modifier-post/${post._id}`} style={postStyles.editPostLink}>
          Modifier
        </Link>
      </div>
    ));
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    const lastPage = Math.ceil(rows.length / postsPerPage);
    if (currentPage < lastPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const totalPages = Math.ceil(rows.length / postsPerPage);

  const paginationStyles = {
    pagination: {
      textAlign: "center",
      marginTop: "20px",
    },
    paginationButton: {
      display: "inline-block",
      padding: "5px 10px",
      margin: "0 5px",
      backgroundColor: "#ccc",
      border: "none",
      cursor: "pointer",
    },
    paginationButtonHover: {
      backgroundColor: "#aaa",
    },
  };

  return (
    <div>
      <h1>Liste des Posts</h1>
      <a href="/ajouter-post" className="add-post-link">
        Ajouter un post
      </a>
      {displayPosts()}
      <div className="pagination">
        <p className="page-info">{`Page ${currentPage} sur ${totalPages}`}</p>
        <button className="prev-btn" onClick={goToPrevPage}>
          Précédent
        </button>

        <button className="next-btn" onClick={goToNextPage}>
          Suivant
        </button>
      </div>
    </div>
  );
}
export default ListPosts;
