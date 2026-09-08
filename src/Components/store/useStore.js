import { create } from "zustand";
import { getSavedJobALL, loginUser, logout, profile } from "../../ALlapi";


export const useAuthStore = create((set)=>({
    // user:null,
    // loading:true,
    // setUser:(user)=>set({user:user,loading:false}),
    // count:1,
    // name:"llm",
    // increment:()=>{
    //     set((state)=>({count:state.count+1}))
    // },
    // decrement:()=>set((state)=>({count:state.count-1}))

    user:null,
    select:null,
    role:null,
    
    savedInfoJob:null,
    loading:true,
    setUser:((user)=>set({user:user,loading:false})),
    setSelect:((select)=>set({select:select,loading:false})),
    setRole:((role)=>set({role:role,loading:false})),
    fetchUser:async()=>{

       const res = await profile();
       

       set({user:res?.data?.user,loading:false});
       



    },
    getSavedJobs:async()=>{
        const res = await getSavedJobALL();

        set({savedInfoJob:res,loading:false});
        

    },
    
    logout:async()=>{
        const res = await logout();
       

        set({user:null,loading:false}) 
    },
    loginRole:async(role)=>{
       const res = await loginUser(role);
       set({user:res?.data?.user?.role,loading:false})
    },

    
    
    
    
    
}))