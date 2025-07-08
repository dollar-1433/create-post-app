// src/components/PostList.js
import React from "react";

const PostList = ({ posts, onDeletePost, onEditPost }) => {
  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              position: "relative",
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "16px",
              background: "var(--bg)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <button
              onClick={() => onDeletePost(post.id)}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
            <button
              onClick={() => onEditPost(post)}
              style={{
                position: "absolute",
                top: "8px",
                right: "70px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p style={{ fontStyle: 'italic', color: '#555', marginTop: 8 }}>
              Posted by: {post.name}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
