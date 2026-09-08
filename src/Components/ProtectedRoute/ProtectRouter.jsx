import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useStore';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const ProtectRouter = ({children}) => {
    const {user, fetchUser, loading, loginRole} = useAuthStore();

    const [stopTime, setStopTime] = useState(true);

    
     useEffect(()=>{


         
        
       
        fetchUser();

        
        

    },[loading])


    useEffect(()=>{
        const timer = setTimeout(() => {
            setStopTime(false);
        },2000);
        return () => clearTimeout(timer);
    },[])

    

     

   

   





    if(stopTime){
      return <LoadingSpinner/>
    }

    
     if(user?.role !== "admin"){
          return <Navigate to='*' replace/>
    }
    
    
     

    
    if(!user?.role){
        return <Navigate to='*' replace/>
    }

  
   

   

    
   


    


    
     
    return children
};

export default ProtectRouter;