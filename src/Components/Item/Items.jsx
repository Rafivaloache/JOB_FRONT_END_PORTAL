import React, { useEffect, useState } from 'react';
import { GiLevelThree } from 'react-icons/gi';
import { MdAccessTimeFilled, MdOutlineAttachMoney } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { CiBookmarkPlus } from "react-icons/ci";
import { useCreateSaveJobs } from '../../../Hook';

import { set } from 'react-hook-form';
import { useAuthStore } from '../store/useStore';
import { useBookmark } from '../BookMarkContext/UseBOOKCONText';
import { FaBookmark, FaHeart } from 'react-icons/fa6';

const Items = ({job }) => {

    const {savedJobs} = useBookmark();
    
      
    const [isBookmarked, setIsBookmarked] = useState(savedJobs);
    const getdate = new Date(job?.deadline).toISOString().split('T')[0];
    const saveCreateJobs = useCreateSaveJobs();
    const {user} = useAuthStore()
    const {bookMarked, setBookMarked} = useBookmark()
    

    const [isSaved, setIsSaved] = useState(null);
    
  

   
   

   

   

    const handleCreateSaveJobs = async(jobid,userid)=>{
        
         try{
            const res = await saveCreateJobs.mutateAsync({job_id:jobid});
         
         }catch(err){
            
         }

        // setBookMarked((prev)=>{
        //   if(!prev.includes(jobid)){
        //     
            
        //     const new_data = [...prev, jobid];
        //     localStorage.setItem(`savedJobs${userid}`, JSON.stringify(new_data));
            
          
        //     return new_data
        //   }else{
        //     
        //      
        //      const filter_data = prev.filter((item)=>item !== jobid);
        //      localStorage.setItem(`savedJobs${userid}`, JSON.stringify(filter_data));
             
            
        //      return filter_data
        //   }
        // })

       
        
         
        // setBookMarked((prev)=>{
        //   if(!prev.includes(jobid)){
        //     
        //     const new_data = [...prev, jobid];

        //     localStorage.setItem('savedJobs', JSON.stringify(new_data));
            
          
        //     return new_data
        //   }else{
        //     
        //      
        //      const filter_data = prev.filter((item)=>item !== jobid);
        //      localStorage.setItem('savedJobs', JSON.stringify(filter_data));
             
             
        //      return filter_data
        //   }
         
            
        // })

       

        //  if(bookMarked){
        //      const res = await saveCreateJobs.mutateAsync({job_id:jobid});
        //      
        //   }

      
        
        
       
       

    }

    return (
        
         <div className='border-white relative shadow-lg my-3 border-2 m-3 rounded-lg lg:rounded-full p-4 md:p-6 flex flex-wrap md:flex-nowrap gap-3 items-center'>
            <div className='w-10 h-10 shrink-0'>
                <img className='w-10 h-10 md:w-12 md:h-12  object-cover rounded-full' src={job?.company_logo} alt="" />
            </div>
            <div className='flex justify-between items-center gap-3  flex-1 min-w-0'>
            <div className='w-[60%] md:w-[30%] md:flex-none'>
               <Link to={`/job/jobinfo/${job?._id}`}> <p className='text-[#108a7f] text-[12px] md:text-[15px] font-bold inter '>{job?.title}</p></Link>
               <p className='text-blue-500 text-[9px] md:hidden md:text-[10px] font-bold inline-block md:p-3 md:rounded-full '> {job?.type} </p>
               
                <div className='flex items-center gap-2'>
                     <p className='text-[#108a7f] text-[10px] md:text-[15px] hidden md:block font-bold md:bg-white md:p-3 rounded-full'>{job?.location}</p>
                     <p className='inter hidden md:block font-extralight text-[#108a7f] '>{job?.job_category || "nothing"} </p>
                </div>
            </div>
            <div className='w-[50%] md:w-[50%] flex justify-end flex-column items-center gap-3'>
                 <p className='text-[#108a7f]  md:block text-[10px] md:text-[15px] font-bold'>Salary:${job?.min_salary}-${job?.max_salary}</p>
                <p className='text-[#108a7f] text-sm p-5  font-bold hidden md:inline-block md:p-3 md:rounded-full '> {job?.type} </p>
                
            </div>

            
            </div>
            <div className='hidden md:block shrink-0'>
                <p className='text-[#108a7f] font-bold inter'>Deadline:<span className='text-red-500'>{getdate}</span></p>
            </div>
            <div className='shrink-0'>
                
             
               {
                 bookMarked.includes(job?._id) ? <FaBookmark onClick={()=>handleCreateSaveJobs(job?._id,user?.id)} className='text-green-500 text-3xl md:text-4xl'/>:<CiBookmarkPlus className='text-red-500 text-3xl md:text-4xl' onClick={()=>handleCreateSaveJobs(job?._id,user?.id)}/>
               }
                 
                 
            </div>
         </div>
    );
};

export default Items;