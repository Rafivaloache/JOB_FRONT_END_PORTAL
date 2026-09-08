import React, { useState } from 'react';

const ProgressBar = ({ progress}) => {
    const [progressbar, setProgress] = useState(progress?.percentage);
    return (
        <div className='w-full '>
        <div className='flex justify-between'>
        <h1 className='inter'>{progress?.category.toUpperCase()}</h1>  
        <h1 className='inter'>{progress?.percentage}%</h1>  
        </div>
       <div className="w-full bg-gray-200 rounded-full h-4">
          
      <div
        className="bg-blue-500  h-4 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress?.percentage}%` }}
      ></div>
       </div>
        </div>
    );
};

export default ProgressBar;