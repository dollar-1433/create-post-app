import React from "react";

const HeaderBar = () => {
  return (
    <nav
      style={{
        padding: "1rem 2rem",
        background: "var(--accent)",
        color: "#fff",
      }}
    >
      <h2 style={{ margin: 0 }}>📝 PostHub</h2>
    </nav>
  );
};

export default HeaderBar;
