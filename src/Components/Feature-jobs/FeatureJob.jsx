import React from 'react';
import FeatureJobcard from './Feature-job-card';

const FeatureJob = () => {

    return (
        <div className='my-4 bg-[#838588]'>
            <div className='text-white max-w-3xl  mx-auto text-center bg-[#838588] p-4'>
                <p className='inline-block p-3 rounded-full border-[#189388] font-extrabold border-2 text-[#189388]'>OPPORTUNITY AWAITS</p>
                <h1 className='works text-[32px] font-bold'>Featured Jobs for You</h1>
                <p className='inter text-[16px]  '>Hand-picked roles based on industry trends and company growth. Apply today and take the lead in your field.</p>
            </div>
            <div>
                <FeatureJobcard />
            </div>
        </div>
    );
};

export default FeatureJob;