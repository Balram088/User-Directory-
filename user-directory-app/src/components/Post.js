import React, { useState } from 'react';

const Post = ({ post }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="post-card" onClick={togglePopup}>
      <h4>{post.title}</h4>
      <p>{post.body}</p>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
