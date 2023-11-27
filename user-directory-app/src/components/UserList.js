import React, { useState, useEffect } from 'react';
import '../Styles/UserList.css'; // Import your CSS file

const UserList = ({ showUserDetails ,postCount }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Fetch user data
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);
//   console.log('data:',users)

  return (
    <div className="user-list">
      <h1>User Directory</h1>
      {users.map((user) => (
        <div key={user.id} className="card" onClick={() => showUserDetails(user)}>
          <div className='cardName'>
            <strong>Name:</strong> {user.name}  
            </div>
             <div className='cardPost'>
            <strong>Posts:</strong> {postCount}
            </div>
          
         
        </div>
      ))}
    </div>
  );
};

export default UserList;
