import React, { useState, useEffect } from 'react';
import '../Styles/UserDetails.css'; // Import your CSS file

const UserDetails = ({ user, goBack }) => {
  const [posts, setPosts] = useState([]);
  const [time, setTime] = useState(new Date());
  const [timezone, setTimezone] = useState('America/New_York'); // Default timezone
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // Fetch user posts
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching user details:', error));
  }, [user.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setTime(new Date());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const fetchTimezoneList = async () => {
    try {
      const response = await fetch('http://worldtimeapi.org/api/timezone');
      const timezoneList = await response.json();
      // For simplicity, let's take the first timezone from the list
      setTimezone(timezoneList[0]);
    } catch (error) {
      console.error('Error fetching timezone list:', error);
    }
  };

  useEffect(() => {
    fetchTimezoneList();
  }, []);

  const fetchCurrentTime = async () => {
    try {
      const response = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
      const data = await response.json();
      const currentTime = new Date(data.utc_datetime);
      setTime(currentTime);
    } catch (error) {
      console.error('Error fetching current time:', error);
    }
  };

  useEffect(() => {
    fetchCurrentTime();
  }, [timezone]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const openPostPopup = (post) => {
    setSelectedPost(post);
  };

  const closePostPopup = () => {
    setSelectedPost(null);
  };

  return (
    <div className="user-details">
      <button className='btn' onClick={goBack}>Back</button>
      <h2>{user.name}'s Profile</h2>
      <div className="clock">
        <div className="clock-header">
          <h3>Page Title</h3>
          <label>
            Country:
            <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
              {timezone && <option value={timezone}>{timezone}</option>}
            </select>
          </label>
        </div>
        <div className="clock-body">
            <div className='timer'>
            {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })}
            </div>
          <br />
          <button className='btn' onClick={togglePause}>{isPaused ? 'Start' : 'Pause'}</button>
        </div>
      </div>
      <div className="user-info">
        <div className="left">
          <p>Username: {user.username}</p>
          <p>Catchphrase: {user.company.catchPhrase}</p>
        </div>
        <div className="right">
          <p>Address: {user.address.street}, {user.address.city}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
      </div>
      <h3>Posts</h3>
      <div className="post-section">
        {posts.map((post) => (
          <div key={post.id} className="post-card" onClick={() => openPostPopup(post)}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      {selectedPost && (
        <div className="popup" onClick={closePostPopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedPost.title}</h3>
            <p>{selectedPost.body}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
