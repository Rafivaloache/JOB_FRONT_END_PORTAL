import React from 'react';
import { useShowApplyJobs } from '../../../Hook';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useStore';


const Recent = () => {
    const {data} = useShowApplyJobs();

    const {user} = useAuthStore();
    
    
    const box = data?.data?.application;
    const filterForApply_jobs = box?.filter((item) => item?.user_id?._id === user?.id);

    

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full gap-3 bg-white my-4 p-3'>
           
            {
                filterForApply_jobs?.map((item, index)=>{
                    return <>
                     <div key={index} className='flex items-center gap-2 w-full h-auto bg-[#f6f7f9] p-4 rounded-lg'>
                        {/* image section */}
                        <div className="w-[20%]">
                            <img className='w-9 h-9 rounded-full object-cover shadow-lg' src={item?.job_id?.company_logo} alt="" />
                        </div>
                        {/* info section */}
                        

                        <div className='w-[80%] '>
                            <Link to={`/job/jobinfo/${item?.job_id?._id}`}><h1 className='text-[17px] inter font-bold'>{item?.job_id?.title}</h1></Link>
                            <p className='text-[#0c9488] text-[18px] works'>{item?.status.toUpperCase()}</p>

                        </div>
                     </div>
                    </>
                })
            }

             {/* <div className='w-[25%] h-auto bg-[#f6f7f9] p-4'>
                <p className='text-[12px] inter text-[#5cb6af]'>Application Viewed</p>
                <h1 className='text-[16px] inter font-bold'>TechFlow Systems</h1>
            </div> */}
            
        </div>
    );
};

export default Recent;