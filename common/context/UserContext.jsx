// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userDocId, setUserDocId] = useState(null);
  const [role, setRole] = useState(null);
  const [notification, setNotification] = useState(null);
  const [apply, setapply] = useState([]);
  const [enableNotification,setEnableNotification]=useState();
  const updateUser = (email) => {
    setUserEmail(email);
  };
  const updateDocId=(id)=>{
    setUserDocId(id);
  }
  const updateRole=(id)=>{
    setRole(id);
  }
  const updateApply=(id)=>{
    setapply(...apply,id);
  }
  const updateNotification=(id)=>{
    setNotification(id);
  }
  const notificationEnable=(id)=>{
    setEnableNotification(id)
  }
    // console.log("emailllllll "+userEmail+" emailllll");
  return (
    <UserContext.Provider value={{ 
      userEmail, updateUser,
      userDocId,updateDocId,
      role,updateRole,
      apply, updateApply,
      notification,updateNotification,
      enableNotification,notificationEnable
      }}>
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
