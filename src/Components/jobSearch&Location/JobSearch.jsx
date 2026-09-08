import React, { useEffect, useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { jobaxiosInstace } from '../../../client';
import { getSearchJObs } from '../../ALlapi';
import { set } from 'react-hook-form';

const JobSearch = () => {
    const [search, setSearch] = useState([]);
    const [location, setLocation] = useState('');
    const [job, setjob] = useState(null);



    const handleSearch = async (e) => {
        e.preventDefault()

        
        
        
        
        



        try {
            const res = await getSearchJObs(job, location);
            if (res?.data?.jobs.length === 0) {
                
                setSearch([]);
                return
            }
            
            // setSearch(res?.data?.jobs)
            setSearch(res?.data?.jobs)

        } catch (err) {
            
            setSearch([]);
        }





    }







    return (
        <div className=' relative flex w-full  bg-yellow-500  items-center justify-center '>
            <form onSubmit={handleSearch} action="" className='relative w-full  bg-green-400  p-3 '>
                <div className='flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-2 w-full '>
                    <input type="text" onChange={(e) => setjob(e.target.value)} className='bg-[#1d1f23] focus:outline-none   px-3 py-2 gap-2 w-full sm:w-[45%] text-white placeholder:text-[#8a8d93]' placeholder='Job title, keywords, or company' />
                    <input type="text" onChange={(e) => setLocation(e.target.value)} className='bg-[#1d1f23] focus:outline-none  px-3 py-2 gap-2   w-full sm:w-[45%] text-white placeholder:text-[#8a8d93]' placeholder='Location (City, State, or Remote)' />
                    <button type='submit' className='bg-[#0c9488] w-full sm:w-[80px] cursor-pointer flex items-center justify-center gap-2 h-auto shrink-0 text-white text-[12px] font-extralight p-2'> <FaMagnifyingGlass /> Search</button>
                </div>
                <div className='w-full mt-2 sm:absolute sm:top-[64px] bg-white left-0 z-10'>
                    {
                        search.map((job, index) => {
                            return <>
                                <div className='flex gap-3 inter justify-between p-3'>
                                    <div className='w-[10%]'>
                                        <img src={job?.company_logo} alt="" />

                                    </div>
                                    <div className='w-[90%]'>
                                        <h1 className='text-2xl font-bold'>{job?.title}</h1>
                                        <h1>{job?.company}</h1>
                                        <h1>{job?.company_location}</h1>
                                        <div className='flex gap-2 justify-between'>
                                            <p>{job?.job_category}</p>

                                            <p className='inline-block p-3 bg-pink-200 font-bold text-black'>{job?.location}</p>
                                        </div>

                                    </div>
                                </div>
                            </>
                        })
                    }



                </div>
            </form>






        </div>
    );
};

export default JobSearch;