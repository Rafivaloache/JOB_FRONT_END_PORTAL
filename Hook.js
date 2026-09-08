import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { allUser, applyJobs, createCoverPic, createJobs, createProfile, createProfilePic, createSaveJobs, deleteApplyjob, deleteJob, deleteSaveJob, deleteUser, getJob, getJobProgressCategory, getjobs, getProfile,  getProgressCategory,  getSavedJobALL,  getUsers,  jobFindsByCategory,  listJobDashboard,  searchJobFromDashboard,  showapplyJobs, totalApplicationsResults, totleJobs, updatejob, updateProfileInfo, updateUserInfo_Profile } from "./src/ALlapi"
import Swal from "sweetalert2";




export const useCreateJob = ()=>{

    return useMutation({
        mutationFn: async(data)=>await createJobs(data),
        onSuccess: (data)=>{
            Swal.fire({
            position: "center",
            icon: "success",
            title: data?.data?.message,
            showConfirmButton: false,
            timer: 1500
          });
        },

    })
    
}

export const useGetProfile = ()=>{

    return useQuery({
        queryFn: async(data)=>await getProfile(data),
        queryKey: ["profiles"]
    })
}



export const useProfilePic = ()=>{
    return useMutation({
        mutationFn:async(data)=>{
            const res = await createProfilePic(data);
            return res
        }
    })
}



export const useCreateProfile = ()=>{
    return useMutation({
        mutationFn:async(data)=>{
            const res = await createProfile(data);
            return res
        },
        onSuccess: (data)=>{
            Swal.fire({
            title: data?.data?.message,
            icon: "success",
            draggable: true
           });
            
        },
        onError:(data)=>{
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "<a href=\"#\">Why do I have this issue?</a>"
           });
        }

    })
}


export const useCreateCoverPic = ()=>{
    return useMutation({
        mutationFn:async(data)=>{
            const res = await createCoverPic(data);
            return res
        }
    })
}


export const useDeleteApplyjob = ()=>{
    const queryClient =  useQueryClient();


    


    return useMutation({
        mutationFn: async(id)=>{
            
            
            const res = await deleteApplyjob(id);
            return res

        },
        onSuccess: (data)=>{
            Swal.fire({
            position: "center",
            icon: "success",
            title: data?.data?.message,
            showConfirmButton: false,
            timer: 1500
          });
          queryClient.invalidateQueries({queryKey:["applyjobs"]})
        },
        

    })

}

export const useDeleteSaveJobs = ()=>{
    const queryClient =  useQueryClient();

    return useMutation({
        mutationFn: async(id)=>{
            const res = await deleteSaveJob(id);
            return res

        },
        onSuccess: (data)=>{
           Swal.fire({
            title: data?.data?.message,
            icon: "success",
            draggable: true
        });
        queryClient.invalidateQueries({queryKey:["savedjobs"]})
        }
        
    })

    

}




export const useGetJobs = ()=>{

    return useQuery({
        queryKey: ["jobs"],
        queryFn: async()=>await getjobs(),
        
    })
}

export const useGetJob = (id)=>{

    return useQuery({
        queryKey: ["job",id],
        queryFn: async()=>await getJob(id),
        enabled: !!id
        
    })
}






export const useCreateSaveJobs = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(data)=>await createSaveJobs(data),
        onSuccess:(data)=>{
            
            
        }
    })
}




export const useShowApplyJobs = ()=>{
    

    return useQuery({
        queryKey: ["applyjobs"],
        queryFn: async()=>await showapplyJobs(),
        
    })
}

export const useTotalCategory = ()=>{

    return useQuery({
        queryKey: ["category"],
        queryFn: async()=>await getProgressCategory(),
        
    })
}

export const useTotalJobCategory = ()=>{

    return useQuery({
        queryKey: ["jobcategory"],
        queryFn: async()=>await getJobProgressCategory(),
        
    })
}

export const useApplicationsTotalResults = ()=>{

    return useQuery({
        queryKey: ["totalapplications"],
        queryFn: async()=>await totalApplicationsResults(),
        
    })
}

export const useTotalJobs = ()=>{
    return useQuery({
        queryKey: ["totaljobs"],
        queryFn: async()=>await totleJobs(),
    })
}
   
export const useApplyJob = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(data)=>await applyJobs(data),
        onSuccess: (data)=>{
            Swal.fire({
            position: "center",
            icon: "success",
            title: data?.data?.message,
            showConfirmButton: false,
            timer: 1500
          });
          queryClient.invalidateQueries({queryKey:["applyjobs"]})


        },
        onError:(data)=>{
         Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data?.response?.data?.message,
        footer: "<a href=\"#\">Why do I have this issue?</a>"
        });
        }
    })
}

export const useGetUsers = ()=>{
    return useQuery({
        queryKey: ["users"],
        queryFn: async()=>await getUsers(),
    })
}

export const useGetUserByQuery = (role) => {
    return useQuery({
        queryKey: ["userquery", role],
        queryFn: () => allUser(role),
        enabled: !!role,
    });
};

export const useGetJobsQuery = (category)=>{
    
    return useQuery({
        queryKey: ["jobquery", category],
        queryFn:async()=> jobFindsByCategory(category),
        enabled: !!category
    })

}

export const useDeletejobsByQuery = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(id)=>await deleteJob(id),
        onSuccess: (data)=>{
            Swal.fire({
                 position: "center",
                 icon: "success",
                 title: data?.data?.message,
                 showConfirmButton: false,
                 timer: 1500
                
            })
          queryClient.invalidateQueries({queryKey:["jobquery"]})  
        }
    })
}

export const useUpdateJobdetails = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:async(data)=> updatejob(data),
        onSuccess: (data)=>{
            Swal.fire({
            position: "center",
            icon: "success",
            title: data?.data?.message,
            showConfirmButton: false,
            timer: 1500
          });
          queryClient.invalidateQueries({queryKey:["jobquery"]})
        }
    })
}


export const useGetProfileInfo = ()=>{
    const queryCLient = useQueryClient();
    return useMutation({
        mutationFn: async(data)=>await updateProfileInfo(data),
        onSuccess: (data)=>{
            Swal.fire({
            position: "center",
            icon: "success",
            title: data?.data?.message,
            showConfirmButton: false,
            timer: 1500
          });


           
             

         queryCLient.invalidateQueries({queryKey:["profiles"]}) 
          


        }
         
        

    })
}




export const useUpdateInfo_Profile = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(data)=>await updateUserInfo_Profile(data),
        onSuccess: (data)=>{
             Swal.fire({
             position: "center",
             icon: "success",
             title: data?.data?.message,
             showConfirmButton: false,
             timer: 1500
          });

          queryClient.invalidateQueries({queryKey:["userquery"]})
            
        }
    })
}

export const useGetListJobDashboard = ()=>{
    return useQuery({
        queryKey: ["listjobdashboard"],
        queryFn: async()=>await listJobDashboard(),
    })
}

export const useGetDeleteUser = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(data)=>await deleteUser(data),
        onSuccess: (data)=>{
            Swal.fire({
             position: "center",
             icon: "success",
             title: data?.data?.message,
             showConfirmButton: false,
             timer: 1500
          });

          queryClient.invalidateQueries({queryKey:["userquery"]});
            
        }
        
    })
}

export const useSearchJobFromDashboard = (search)=>{
    return useQuery({
        queryKey: ["jobdashboard", search],
        queryFn: async()=>await searchJobFromDashboard(search),
        enabled: !!search
    })
}










//  return useQuery({
//         queryKey: ["userquery", role],
//         queryFn: () => allUser(role),
//         enabled: !!role,
//     });