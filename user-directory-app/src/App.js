import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';



const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const showUserDetails = (user) => {
    setSelectedUser(user);
  };

  const goBack = () => {
    setSelectedUser(null);
  };

  return (
    <div className="app">
      {selectedUser ? (
        <UserDetails user={selectedUser} goBack={goBack}  />
      ) : (
        <UserList showUserDetails={showUserDetails} postCount={10} />
      )}
    </div>
  );
};

export default App;


