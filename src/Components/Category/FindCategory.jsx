import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


const FindCategory = () => {
    const {state} = useLocation();
     
    
    const [category, setCategory] = useState(state?.jobs);
    let getdate;


    useEffect(()=>{

    },[category])
   

    

    
    return (
        <div className='container mx-auto'>
            {category?.map((job, index)=>{
                return  <div key={index} className='border-white shadow-lg border-2  p-4 md:p-6 flex flex-wrap md:flex-nowrap gap-3 items-center'>
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
                <p className='text-[#108a7f] font-bold inter'>Deadline:<span className='text-red-500'>{ getdate = new Date(job?.deadline).toISOString().split('T')[0]}</span></p>
            </div>
         </div>
            } )}
            
            
        </div>
    );
};

export default FindCategory;