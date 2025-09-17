import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import PostForm from "./components/PostForm";
import CompanyFilter from "./components/CompanyFilter";
import PostDetail from "./components/PostDetail";

function App() {
  const [view, setView] = useState("feed");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [feedSort, setFeedSort] = useState("popular");
  const [tempSortForUser, setTempSortForUser] = useState(null);

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setView("postDetail");
  };


  const handleSetView = (v) => {
    if (v === "feed") {
      setSelectedCompany(null);
    }
    setView(v);
  };

  return (
    <div>
      <Navbar setView={handleSetView} />
      <div className="container mt-4">
        {view === "feed" && (
          <Feed
            onSelectPost={handleSelectPost}
            sort={tempSortForUser || feedSort}
            setSort={(s) => {
              setFeedSort(s);
              setTempSortForUser(null);
            }}
            company={selectedCompany}
          />
        )}
        {view === "company" && (
          <>
            <CompanyFilter setSelectedCompany={setSelectedCompany} />
            {selectedCompany && (
              <Feed
                company={selectedCompany}
                onSelectPost={handleSelectPost}
                sort={tempSortForUser || feedSort}
                setSort={(s) => {
                  setFeedSort(s);
                  setTempSortForUser(null);
                }}
              />
            )}
          </>
        )}
        {view === "post" && (
          <PostForm
            setView={handleSetView}
            setTempSortForUser={setTempSortForUser}
          />
        )}
        {view === "postDetail" && (
          <PostDetail
            post={selectedPost}
            onBack={() => setView(selectedCompany ? "company" : "feed")}
          />
        )}
      </div>
    </div>
  );
}

export default App;
