import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStore } from '../store/useStore';


export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const {user,loading}  = useAuthStore();
  
   
  const [bookMarked, setBookMarked] = useState(() => {
    const savedJobs = localStorage.getItem(`savedJobs${user?.id}`);
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  
  useEffect(() => {
   if(loading){
     return
   }

//   if (user?.id) {
//       const saved = localStorage.getItem(`savedJobs${user.id}`);
//       setBookMarked(saved ? JSON.parse(saved) : []);
//     } else {
//       setBookMarked([]); // confirmed logged out
//     }
if(user?.id){
     const saved = localStorage.getItem(`savedJobs${user.id}`);
     setBookMarked(saved ? JSON.parse(saved) : []);

}else{
  setBookMarked([])       // confirmed logged out
}
  },[user,loading])
  return (
    <BookmarkContext.Provider value={{ bookMarked, setBookMarked , }}>
      {children}
    </BookmarkContext.Provider>
  );
};

