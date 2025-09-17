import React, { useEffect, useState } from "react";
import {
  fetchPosts,
  fetchPostsByCompany,
  upvotePost,
  downvotePost,
  reportPost,
  fetchComments,
} from "../services/api";

function Feed({ company, onSelectPost, sort, setSort }) {
  const [posts, setPosts] = useState([]);
  const [commentCounts, setCommentCounts] = useState({});
  const [expandedPosts, setExpandedPosts] = useState({});

  useEffect(() => {
    const load = async () => {
      let res;
      if (company) {
        res = await fetchPostsByCompany(company);
      } else {
        res = await fetchPosts(sort);
      }
      setPosts(res.data);

      const counts = {};
      for (const post of res.data) {
        try {
          const commentsRes = await fetchComments(post.id);
          counts[post.id] = commentsRes.data.length;
        } catch (err) {
          counts[post.id] = 0;
        }
      }
      setCommentCounts(counts);
    };
    load();
  }, [sort, company]);

  const handleUpvote = async (id) => {
    await upvotePost(id);
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
  };

  const handleDownvote = async (id) => {
    await downvotePost(id);
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, downvotes: p.downvotes + 1 } : p))
    );
  };

  const handleReport = async (id) => {
    await reportPost(id);
    alert("Thanks for reporting. Our team will review it.");
  };


  const toggleExpand = (id) => {
    setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const truncateText = (text, limit = 150) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  return (
    <div>
      {!company && (
        <div className="mb-3 d-flex justify-content-end">
          <button
            className={`btn btn-sm me-2 ${
              sort === "popular" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setSort("popular")}
          >
            Popular
          </button>
          <button
            className={`btn btn-sm ${
              sort === "recent" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setSort("recent")}
          >
            Recent
          </button>
        </div>
      )}

      {posts.map((post) => (
        <div className="card mb-3 shadow-sm" key={post.id}>
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">
              Anonymous | {post.company} | {post.category}
            </h6>

            {/* ✅ Content with Read More */}
            <p className="card-text">
              {expandedPosts[post.id] ? (
                <>
                  {post.content}{" "}
                  <button
                    className="btn btn-link p-0"
                    onClick={() => toggleExpand(post.id)}
                  >
                    Read Less
                  </button>
                </>
              ) : (
                <>
                  {truncateText(post.content)}{" "}
                  {post.content.length > 150 && (
                    <button
                      className="btn btn-link p-0"
                      onClick={() => toggleExpand(post.id)}
                    >
                      Read More
                    </button>
                  )}
                </>
              )}
            </p>


            <small className="text-muted d-block mb-2">
              {new Date(post.timestamp).toLocaleString()}
            </small>

            <div className="mt-2 d-flex justify-content-between">
              <div>
                <button
                  className="btn btn-sm btn-outline-success me-2"
                  onClick={() => handleUpvote(post.id)}
                >
                  👍 {post.upvotes}
                </button>
                <button
                  className="btn btn-sm btn-outline-danger me-2"
                  onClick={() => handleDownvote(post.id)}
                >
                  👎 {post.downvotes}
                </button>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => onSelectPost(post)}
                >
                  {commentCounts[post.id] > 0
                    ? `💬 View Comments (${commentCounts[post.id]})`
                    : "💬 No Comments Yet"}
                </button>

              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;
