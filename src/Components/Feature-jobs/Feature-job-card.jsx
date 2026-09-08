import React from 'react';
import { useGetJobs } from '../../../Hook';
import Items from '../Item/Items';
import { useAuthStore } from '../store/useStore';

const FeatureJobcard = () => {
    const { data, isLoading, refetch } = useGetJobs();

    







    return (
        <div className='bg-[#2e3034] p-3 max-w-6xl mx-auto rounded-xl
        '>
            <div className='text-white flex justify-between py-3 shadow-lg'>
                <p className='text-[18px] '>Recent posting</p>
                <p className='text-[18px] text-[#108a7f]'>Recomended</p>

            </div>
            <div className='space-y-4'>

                {data?.data?.jobs.slice(0, 5).map((job, index) => <Items key={index} job={job} />)}
            </div>

            <div className='my-5  text-center'>
                <button className='bg-orange-600 w-[160px] cursor-pointer h-auto p-3 rounded-lg text-white'>See More Jobs</button>
            </div>




        </div>
    );
};

export default FeatureJobcard;