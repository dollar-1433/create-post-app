import React from "react";

const ModeSwitcher = ({ toggleTheme, theme }) => {
  return (
    <div style={{ textAlign: "right", padding: "1rem 2rem" }}>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "🌙 Dark" : "☀️ Light"} Mode
      </button>
    </div>
  );
};

export default ModeSwitcher;
