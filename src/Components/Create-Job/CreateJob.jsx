import React from 'react';
import { FaRegSave } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import CreateJobForm from './CreateJobForm';

const CreateJob = () => {
    return (
        <div className='container mx-auto'>

       <div className='flex justify-center my-2'>
          <p className='inline-block mx-auto text-[#17958A] border-2 border-[#17958A] p-3 rounded-full'>Carreer Intelligence</p>
       </div>

       <div className='max-w-3xl  mx-auto'>
         <h1 className='inter text-black text-center font-bold text-[48px]'>Find Your Next Challenge</h1>
         <p className='text-center'>Specify your professional requirements below to search across our curated network of industry-leading opportunities</p>
       </div>

       <div className='flex justify-between items-center'>
         <div>
          <h1 className='works font-bold text-[32px]'>Create New Job Posting</h1>
          <p className="text-[#c4c6c8]">Fill in the details below to find your next great hire at CareerPath Pro</p>
         </div>
         <div className='flex gap-3'>
            <button className='bg-[#f6f7f9]  flex gap-2 p-3 rounded-lg items-center'><MdDeleteOutline /> Discard</button>
            <button className='bg-[#f6f7f9] border flex gap-2 p-3 rounded-lg items-center'><FaRegSave />  Save Draft</button>
         </div>
        
       </div>

        <CreateJobForm/>

            
        </div>
    );
};

export default CreateJob;