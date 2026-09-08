import axios from "axios";



export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL_REQUEST,
    headers: {
        "Content-Type": "application/json",
       
        
    },
    withCredentials: true
    

    

});

axiosInstance.interceptors.request.use((config)=>{

    
  
    config.headers.channelName="My Channel invited";
    return config
})

axiosInstance.interceptors.response.use((response)=>{
    return response
},(error)=>{
    if(error.response.isSuspend===true){
        return window.location.href = "/suspended";
    }
    return Promise.reject(error)
})

export const apiClientSearch_Url = axios.create({
    baseURL:import.meta.env.VITE_JOB_URL_REQUEST,
    headers: {
        "Content-Type": "application/json",
       
        
    },
    withCredentials: true
})


apiClientSearch_Url.interceptors.request.use((config)=>{
    config.headers.channelName="My Channel invited";
    return config
})

apiClientSearch_Url.interceptors.response.use((response)=>{
    return response
})

export const jobaxiosInstace = axios.create({
    baseURL: import.meta.env.VITE_JOB_URL_REQUEST,
    headers: {
        "Content-Type": "application/json",
       
        
    },
    withCredentials: true
})

export const applyJobInstace = axios.create({
    baseURL:import.meta.env.VITE_APPLY_JOB_REQUEST,
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials: true

    

})


export const saveJobInstance = axios.create({
    baseURL:import.meta.env.VITE_SAVE_JOB_REQUEST,
    headers: {
        "Content-Type": "application/json",
       
        
    },
    withCredentials: true
})

export const profileAxiosInstance = axios.create({
    baseURL:import.meta.env.VITE_PROFILE_PIC_REQUEST,
    headers: {
        "Content-Type": "application/json",
       
        
    },
    withCredentials: true
})