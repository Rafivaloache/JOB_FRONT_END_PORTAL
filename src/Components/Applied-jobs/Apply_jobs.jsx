import React, { useState } from 'react';
import { useApplyJob, useDeleteApplyjob, useShowApplyJobs } from '../../../Hook';
import { useAuthStore } from '../store/useStore';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { deleteApplyjob } from '../../ALlapi';
import { set } from 'react-hook-form';

const Apply_jobs = () => {
    // const [open, setOpen] = useState(false);
     const {data} = useShowApplyJobs();
     const {user} = useAuthStore();
     const deletejob = useDeleteApplyjob();
     
   
     const box = data?.data?.application
     const [opendropdown, setDropdown] = useState(null)
    
    const filtered_items = box?.filter((item) => item?.user_id?._id === user?.id);


    

   

    

    // const filtering = data?.data?.applications.filter((item) => item?.user_id === user?._id);

   

    const handleView = (id)=>{
        const filtered_items = data?.data?.application?.find((item) => item?._id === id);
        
        setDropdown(filtered_items?._id)
        
    }



     


    const handleDelete = async(id)=>{
        

        // const box = data?.data?.application;
        
        const res = await deletejob.mutateAsync(id);


        
        

        // 

    }
    

    



    
    return (
        <div className='grid grid-cols-1 h-screen  p-3 md:grid-cols-2 lg:grid-cols-2 gap-3'>
                
            {
               filtered_items.length > 0 ?  filtered_items?.map((jobd, index)=>{
                    
                    return <div key={index} className='flex gap-2 works shadow p-4 md:p-6'>
                        <div className='w-16 shrink-0'>
                            <img className='w-13 h-13 object-cover shadow rounded-full' src={jobd?.job_id?.company_logo} alt="" />
                        </div>
                        <div className='relative flex-1 min-w-0 '>
                            <div>
                                <h1>{jobd?.job_id?.title}</h1>
                                 <p className='text-[14px] font-bold'> {jobd?.job_id?.location}</p>
                                 <div className='flex items-center justify-between gap-2'>
                              
                                 <p>Salary: <span className='font-bold'>{jobd?.job_id?.min_salary}$-{jobd?.job_id?.max_salary}$</span></p>
                                 </div>
                            </div>
                            <div className='flex items-center gap-2 mt-2'>
                                <p className='inline-block  text-[12px] p-2 rounded-full bg-green-400 works text-white'>{jobd?.status}</p>
                               <div className='relative '>
                                 <BsThreeDotsVertical onClick={()=>handleView(jobd?._id)} color='red' className='cursor-pointer' />
                                 <ul className={`bg-black  p-2 rounded-lg text-white   absolute top-full right-0 ${opendropdown === jobd?._id ? "block" : "hidden"} `}>
                                    <li className='works text-[13px]'><Link to={`/job/jobinfo/${jobd?.job_id?._id}`}>View</Link></li>
                                    <li onClick={()=>handleDelete(jobd?._id)} className='works text-[13px]'>Delete</li>
                                 </ul>
                               </div>

                            </div>
                        </div>
                    </div>
                }) : <h1 className='works font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[32px] text-center'>No Applied Jobs Available</h1> 
            }

            

           
        </div>
    );
};

export default Apply_jobs;