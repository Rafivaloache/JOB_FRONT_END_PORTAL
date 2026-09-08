import React, { useEffect, useState } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useApplicationsTotalResults, useTotalCategory, useTotalJobCategory, useTotalJobs } from '../../../Hook';
import NewProgressBarForJob from '../ProgressBar/NewProgressBarForJob';
import { FaSearchDollar } from "react-icons/fa";
import { searchJob } from '../../ALlapi';
import { set } from 'react-hook-form';

const Overview = () => {
    const [jobs, setJobs] = useState([]);

    const[searchBar, setSearchBar] = useState('');

    const[searchResult, setSearchResult] = useState([]);


    const { data } = useTotalCategory();
    const { data: totalJob } = useTotalJobCategory();
    
    const totalApplications = data?.data?.totalApplications;
    const { data: totalJobData } = useTotalJobs();
    
    const { data: totalApplicationResults } = useApplicationsTotalResults();
    



    
    const totalJobsApplied = totalJob?.data?.measureJobs;




    useEffect(() => {
        fetch(`${import.meta.env.VITE_JOB_URL_REQUEST}/get-jobs`).then(res => res.json()).then(data => {
            
            setJobs(data?.jobs);
        });

    }, []);

    const handleSearchEffect = async()=>{
        const res = await searchJob(searchBar);
        
        setSearchResult(res?.data?.jobs);
        
    }

    useEffect(()=>{

      
       try{
         if(!searchBar.trim()){
            fetch(`${import.meta.env.VITE_JOB_URL_REQUEST}/get-jobs`).then(res => res.json()).then(data => {
            
            setJobs(data?.jobs);
        });
            return
            
        
           
            
         }else{
            handleSearchEffect();
         }
         
       
        setJobs([]);

       }catch(err){
         
         setSearchResult([]);
         
         

       }

    },[searchBar]);


    const handleSearchBar =(e)=>{
        const value1 = e.target.value;
        setSearchBar(value1);



    }

    
    const dashboardData = [
        {
            name: 'total jobs',
            value: totalJobData?.data?.jobs,
            description: "Active positions"
        },
        {
            name: "total applicants",
            value: totalApplicationResults?.data?.totalApplications,
            description: "New applicants"
        },
        {
            name: "Active Users",
            value: 6,
            description: "Scheduled interviews"
        },
        {
            name: "Avg. Applications",
            value: 54,
            description: "per job listing"
        }
    ]

    const getStatusFromDeadLine = (deadline) => {
        const now = new Date();
        const end = new Date(deadline);
        if (now > end) {
            return <span className='text-red-500'>Expired</span>;
        }
        return <span className='text-green-500 bg-green-400 inline-block p-2 text-white'>Active</span>;


    }


    return (
        <div>
            <h1 className='works font-bold text-[32px]'>Dashboard</h1>
            <p className='text-[14px] works '>Job portal overview · Aug 2026 </p>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
                {
                    dashboardData?.map(dashboard => <div className='bg-[#f6f7f9] p-4 rounded-lg'>
                        <h1 className='works font-bold text-[24px]'>{dashboard?.value}</h1>
                        <p className='text-[16px] works '>{dashboard?.name}</p>
                        <p className='text-[14px] works '>{dashboard?.description}</p>
                    </div>)
                }


            </div>
            <div className='flex flex-col lg:flex-row gap-3'>
                <div className='w-full lg:w-1/2'>
                    {/* search bar */}
                   <div className='relative'>
                     <input type="text" onChange={(e)=>handleSearchBar(e)}  className='w-full bg-white p-3 border-sky-400 border-3 rounded-lg ' placeholder='Search Jobs' />
                     <div className='absolute top-5 right-3'>
                        <FaSearchDollar size={20} />
                     </div>
                   </div>
                    <div className='w-full overflow-x-auto'>
                    <table className='w-full min-w-[400px] shadow-lg   shadow-gray-400 '>
                        <thead>
                            <tr>
                                <th className='text-left p-4 '>Recently Posted</th>

                                <th className='text-right p-4'>By date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jobs?.length > 0 ? jobs?.slice(0, 5)?.map((job, index) =>
                                    <tr key={index} className='border-b-2   '><td className='p-4  '>
                                        <h1 className='works font-bold'>{job?.title}</h1>
                                        <p className='works  '>{job?.company_name}</p>
                                    </td>

                                        <td className='text-right  p-4 '>
                                            <p>{job?.createdAt.split('T')[0]}</p>
                                            {
                                                getStatusFromDeadLine(job?.deadline)
                                            }

                                        </td>

                                    </tr>) : searchResult?.length > 0 ? searchResult?.slice(0, 5)?.map((job, index) =>
                                    <tr key={index} className='border-b-2   '><td className='p-4  '>
                                        <h1 className='works font-bold'>{job?.title}</h1>
                                        <p className='works  '>{job?.company_name}</p>
                                    </td>

                                        <td className='text-right  p-4 '>
                                            <p>{job?.createdAt.split('T')[0]}</p>
                                            {
                                                getStatusFromDeadLine(job?.deadline)
                                            }

                                        </td>

                                    </tr>) : " "

                                
                            }
                           

                        </tbody>
                    </table>
                    </div>

                </div>
                <div className='w-full lg:w-1/2 space-y-4 rounded-lg shadow-lg shadow-gray-400 p-4'>
                    <h1 className='text-blue-500 inter font-bold'>Total Category</h1>

                    {
                        totalApplications?.map((progress, index) => <ProgressBar key={index} progress={progress} />)
                    }


                </div>

            </div>

            {/*  top job by Applications */}
            <div className=' shadow-lg shadow-gray-400 rounded-lg p-4 mt-3'>

                {
                    totalJobsApplied?.map((job, index) => <NewProgressBarForJob key={index} job={job} />)
                }

            </div>

            {/* search bar */}
          




        </div>
    );
};

export default Overview;