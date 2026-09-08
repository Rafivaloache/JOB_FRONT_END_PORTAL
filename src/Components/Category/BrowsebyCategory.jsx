import React from 'react';
import Category from './Category-cards';

const BrowsebyCategory = () => {
    const categroy = [
        {
        name: 'technology',
        totalNumbers: '12400+',
        image: 'https://i.ibb.co.com/fVssszXm/pexels-peaky-codes.jpg'

        },
        {
            name: 'marketing',
            totalNumbers: '850+',
            image: "https://i.ibb.co.com/SDtd7NWX/pexels-kindelmedia-marketing.jpg"
        },
        {
            name: "design",
            totalNumbers: '620+',
            image: "https://i.ibb.co.com/ccRF4Kg8/pexels-walls-io-440716388-Design.jpg"
        },
        {
            name: "Finance",
            totalNumbers: '450+',
            image: "https://i.ibb.co.com/xtZXDg4P/pexels-bia-limova-finance.jpg"
    
        }
        ]
    return (
        <>
            <div className='flex flex-col md:flex-row gap-2 md:gap-0  justify-between items-center'>
                <div>
                    <h1 className='text-[32px] works text-white font-bold'>Browse by Category</h1>
                    <p className='text-white'>Discover opportunities across specialized industries. We curate the best roles from <br /> top-tier organizations.</p>
                </div>
                <button className='bg-[#1d1f23] w-[200px] text-white rounded-full h-auto p-3'>View all categories</button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4'>
                {
                    categroy.splice(0, 6).map((item, index) => <Category item={item} key={index} />
                    )}
            </div>
           
        </>
    );
};

export default BrowsebyCategory;