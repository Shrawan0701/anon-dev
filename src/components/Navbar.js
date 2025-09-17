import React from "react";

function Navbar({ setView }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">AnonDev</span>
        <div className="d-flex">
          <button className="btn btn-outline-light me-2" onClick={() => setView("feed")}>
            Feed
          </button>
          <button className="btn btn-outline-light me-2" onClick={() => setView("company")}>
            By Company
          </button>
          <button className="btn btn-success" onClick={() => setView("post")}>
            Post Anonymously
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
