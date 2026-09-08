import React, { useState } from 'react';

const NewProgressBarForJob = ({job}) => {
    const [progrssBar, setProgress] = useState(50)
    return (
        <div className='w-full '>
        <div className='flex justify-between'>
        <h1 className='inter'>{job?.category}</h1>  
        <h1 className='inter'>{job?.percentage}%</h1>  
        </div>
       <div className="w-full bg-gray-200 rounded-full h-4">
          
      <div
        className="bg-yellow-500  h-4 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${job?.percentage}%` }}
      ></div>
       </div>
        </div>
    );
};

export default NewProgressBarForJob;