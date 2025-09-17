import React, { useState } from "react";
import { addPost } from "../services/api";

function PostForm({ setView, setTempSortForUser }) {
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();


   const abusiveWords = [
     "bitch", "jerk", "bastard", "dick",
     "ass", "cunt", "slut", "douche",
     "prick", "fag", "homo", "screw",
     "shit", "fuck","chutiya",
     "madarchod", "benchod", "mc", "bc", "gandu"
   ];


   const foundAbuse = abusiveWords.some((word) => {
     const regex = new RegExp(`\\b${word}\\b`, "i");
     return regex.test(content);
   });


    if (foundAbuse) {
      setToast("Your post contains inappropriate language and cannot be submitted.");
      return;
    }

    addPost({ company, category, content }).then(() => {
      setMessage("Post submitted successfully!");
      setView("feed");
      setTempSortForUser("recent");
    });
  };

  return (
    <div className="card shadow-sm p-3">
      <h5 className="mb-2">Post Anonymously</h5>
      <p className="text-warning mb-3">
        Please do not use abusive language or include personal names of Managers/HR. Posts violating this will be removed.
      </p>


      {toast && (
        <div
          className="toast align-items-center text-bg-danger border-0 show mb-3"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{toast}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setToast("")}
            ></button>
          </div>
        </div>
      )}


      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            type="text"
            className="form-control"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter company name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Select category
            </option>
            <option>General</option>
            <option>Overtime</option>
            <option>Harassment</option>
            <option>Salary</option>
            <option>Work Culture</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your review or experience..."
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostForm;
