// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);

  const updateUser = (email) => {
    setUserEmail(email);
  };
//   console.log("emailllllll "+email+" emailllll");
  return (
    <UserContext.Provider value={{ userEmail, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
