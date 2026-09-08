import React from 'react';
import JobSearch from './jobSearch&Location/JobSearch';
import './Banner.css'


const Banner = () => {

  
    return (
        <div className='banner flex justify-center items-center '>

            <div className='max-w-3xl  mx-auto'>
                <h1 className='md:text-[48px] text-[24px] text-[#ffffff] manrope font-bold text-center'>Your Next Career Move</h1>
                <h1 className='md:text-[48px] text-[24px] text-[#ffffff] manrope font-bold text-center'>Starts Here</h1>

            <div className="content">
                <p className='text-[#ffffff] manrope text-center font-extralight text-[18px] '>Explore thousands of high-impact roles at industry-leading companies. Built for the modern professional.</p>
            </div>
            <JobSearch/>

            </div>

            
            
        </div>
    );
};

export default Banner;