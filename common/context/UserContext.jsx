// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userDocId, setUserDocId] = useState(null);
  const [role, setRole] = useState(null);
  const updateUser = (email) => {
    setUserEmail(email);
  };
  const updateDocId=(id)=>{
    setUserDocId(id[0]);
  }
  const updateRole=(id)=>{
    setRole(id);
  }
    // console.log("emailllllll "+userEmail+" emailllll");
  return (
    <UserContext.Provider value={{ userEmail, updateUser,userDocId,updateDocId,role,updateRole }}>
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
