import React, { useEffect, useState } from "react";
import {
  fetchComments,
  addComment,
  upvoteComment,
  downvoteComment,
} from "../services/api";

function PostDetail({ post, onBack }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    loadComments();
  }, [post]);

  const loadComments = async () => {
    const res = await fetchComments(post.id);
    setComments(res.data);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    const res = await addComment(post.id, { content });
    setComments([res.data, ...comments]);
    setContent("");
  };


  const sortedComments = [...comments].sort((a, b) => {
    if (sort === "newest") return new Date(b.timestamp) - new Date(a.timestamp);
    if (sort === "oldest") return new Date(a.timestamp) - new Date(b.timestamp);
    return 0;
  });


  const topComment =
    comments.length > 0
      ? comments.reduce(
          (max, c) =>
            c.upvotes - c.downvotes > max.upvotes - max.downvotes ? c : max,
          comments[0]
        )
      : null;

  return (
    <div>
      <button className="btn btn-sm btn-outline-secondary mb-3" onClick={onBack}>
        ← Back
      </button>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">
            Anonymous | {post.company} | {post.category}
          </h6>
          <p className="card-text">{post.content}</p>
          <small className="text-muted">
            {new Date(post.timestamp).toLocaleString()}
          </small>
        </div>
      </div>

      <h6>
        Comments ({comments.length}){" "}
        <select
          className="form-select form-select-sm w-auto d-inline ms-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </h6>


      <form onSubmit={handleAddComment} className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-sm mt-2">
          Add Comment
        </button>
      </form>


      {topComment && (
        <div className="card border-success mb-2">
          <div className="card-body py-2">
            <p className="card-text">
              <strong>Top Comment (Anonymous):</strong> {topComment.content}
            </p>
            <small className="text-muted">
              {new Date(topComment.timestamp).toLocaleString()}
            </small>
            <div className="mt-2">
              👍 {topComment.upvotes} | 👎 {topComment.downvotes}
            </div>
          </div>
        </div>
      )}


      {sortedComments.map((c) => (
        <div className="card mb-2" key={c.id}>
          <div className="card-body py-2">
            <h6 className="card-subtitle mb-1 text-muted">Anonymous</h6>
            <p className="card-text">{c.content}</p>
            <small className="text-muted">
              {new Date(c.timestamp).toLocaleString()}
            </small>
            <div className="mt-2">
              <button
                className="btn btn-sm btn-outline-success me-2"
                onClick={async () => {
                  const res = await upvoteComment(c.id);
                  setComments(
                    comments.map((cm) => (cm.id === c.id ? res.data : cm))
                  );
                }}
              >
                👍 {c.upvotes}
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={async () => {
                  const res = await downvoteComment(c.id);
                  setComments(
                    comments.map((cm) => (cm.id === c.id ? res.data : cm))
                  );
                }}
              >
                👎 {c.downvotes}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostDetail;
