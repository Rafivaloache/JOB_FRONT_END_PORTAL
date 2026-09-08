import axios from "axios";
import { apiClientSearch_Url, applyJobInstace, axiosInstance, jobaxiosInstace, profileAxiosInstance, saveJobInstance } from "../client"

export const createUser = async (data) => {
    
    const res = await axiosInstance.post("/register", data);
    return res
}

export const getSavedJobALL = async()=>{
    const res = await saveJobInstance.get('/get-save-jobs');
    
    return res
}



export const getProgressCategory = async()=>{
    const res = await applyJobInstace.get('/total-category-result');
    return res
}

export const getJobProgressCategory = async()=>{
    const res = await applyJobInstace.get('/measure-job');
    return res;
}

export const filterSalaryJob = async(data)=>{
    const res = await jobaxiosInstace.get(`/filter-salary?salary=${data}`);
    return res
    
}

export const allUser = async(data)=>{
    const res = await axiosInstance.get(`/all-users?role=${data}`);
    return res
    
}



export const totleJobs = async ()=>{
    const res = await jobaxiosInstace.get('/total-job');
    return res;
}
export const totalApplicationsResults = async()=>{
    const res = await applyJobInstace.get('/total-application');
    return res;
}




export const loginUser = async (data) => {
    const res = await axiosInstance.post("/login", data);
    return res
}

export const profile = async (data) => {
    const res = await axiosInstance.get("/profile", data);
    return res

}

export const logout = async (data) => {
    const res = await axiosInstance.post("/logout", data);
    return res
}

export const setRoleUser = async(data)=>{
    
    const res = await axiosInstance.post(`/set-role`, data);
    return res;
}


export const updateUserInfo_Profile = async (data) => {
    
    const res = await axiosInstance.put(`/update-profile`, data);
    return res;
}



export const deleteUser = async (data) => {
    
    const res = await axiosInstance.delete(`/delete-user`, {data});
    return res
}

export const listJobDashboard = async()=>{
    const res = await jobaxiosInstace.get('/list-job/dashboard');
    return res;
}

export const searchJobFromDashboard = async(data)=>{
    const res = await jobaxiosInstace.get(`/search-job-dashboard?search=${data}`);
    return res
}


export const createJobs = async (data) => {
    const res = await jobaxiosInstace.post("/create-job", data);
    return res

}

export const findJobCategory = async (data) => {
    

    const res = await jobaxiosInstace.get(`/find-job-category?job_category=${data}`);
    return res
}



export const getjobs = async () => {
    const res = await jobaxiosInstace.get("/get-jobs");
    return res
}

export const applyJobs = async (data) => {
    
    const res = await applyJobInstace.post("/create-application", data);
    return res
}

export const getSearchJObs = async (job, location) => {
    
    const res = await jobaxiosInstace.get(`/search-job?search=${job}&location=${location}`);
    return res
}

export const getProfileSearch = async(data)=>{
    const res = await axiosInstance.get(`/search-profile?search=${data}`);
    return res;
}

export const createProfilePic = async (data) => {
    
    const res = await fetch(`${import.meta.env.VITE_PROFILE_PIC_REQUEST}/create-uploaded-pic`, {
        method: "POST",
        body: data
    })
    const data1 = await res.json();
    return data1
}

export const createCoverPic = async (data) => {
    
    // const res = await axios.post(`https://job-portal-website-back-end.vercel.app/api/profile/create-updated-cover-pic`,data);
    const res = await fetch(`${import.meta.env.VITE_PROFILE_PIC_REQUEST}/create-updated-cover-pic`, { method: "POST", body: data, credentials: "include" });
    const data2 = res.json();
    return data2

}


export const getProfile = async (data) => {
    const res = await profileAxiosInstance.get(`/unique-profile`, data);
    return res
}


export const createProfile = async (data) => {
    const res = await profileAxiosInstance.post(`/create-profile`, data);
    return res
}




export const updateProfileInfo = async (data) => {
    const res = await profileAxiosInstance.put(`/update-profile`, data);
    return res
}

export const showapplyJobs = async (data) => {
    
    const res = await applyJobInstace.get('/get-application');
    return res

}

export const createSaveJobs = async (data) => {
    
    const res = await saveJobInstance.post('/create-save-job', data);
    return res

}

export const jobFindsByCategory = async(data)=>{
    const res = await jobaxiosInstace.get(`/job-finds-by-category?category=${data}`);
    return res 

}

export const updatejob = async (body) => {
    
    const res = await jobaxiosInstace.put(`/update-job`, body);
    return res
}


export const deleteJob = async (data) => {
    
    const res = await jobaxiosInstace.delete(`/delete-job/${data}`);
    return res


}

export const deleteApplyjob = async (data) => {
    
    const res = await applyJobInstace.delete(`/delete-application/${data}`);
    return res

}


export const searchJob = async (data) => {
    
    const res = await apiClientSearch_Url.get(`/find-job?search=${data}`);
    return res
}

export const getJob = async (data) => {
    const res = await jobaxiosInstace.get(`/get-job/${data}`, data);
    return res
}

export const showImgurl = async () => {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/showProfileImage`);
    return res
}

export const deleteSaveJob = async(data)=>{
    
    const res = await saveJobInstance.delete(`/delete-save-job/${data}`);
    return res;
}

export const getUsers = async()=>{
    const res = await axiosInstance.get('/getUsers');
    return res;
}









