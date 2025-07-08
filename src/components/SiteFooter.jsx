import React from "react";

const SiteFooter = () => {
  return (
    <footer
      // style={{
      //   padding: "1rem",
      //   textAlign: "center",
      //   background: "#f4f4f4",
      //   marginTop: "2rem",
      // }}
      className="bg-gray-800 text-center text-white py-4 mt-8"
    >
      <p>&copy; {new Date().getFullYear()} PostHub. All rights reserved.</p>
    </footer>
  );
};

export default SiteFooter;
