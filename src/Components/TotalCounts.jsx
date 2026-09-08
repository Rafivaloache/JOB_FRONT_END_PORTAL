import React from 'react';

const TotalCounts = () => {
      const post = [{
        totalNumbers:'12400+',
        title:'Live jobs'
    },{
        totalNumbers:'450+',
        title:'Companies'
        
    },
    {
        totalNumbers:'85+',
        title:'New Daily'
    },
    {
        totalNumbers:'94%',
        title:'Success Rate'
    }
]
    return (
        <div className='bg-[#2b2d31] flex-col flex md:flex-row justify-around p-4'>
            {
                post?.map(posts => (<div className='  '>
                   <div className=''>
                     <h1 className='text-[#ffffff] text-[32px] manrope font-bold'>{posts?.totalNumbers}</h1>
                     <h1 className='text-[#ffffff] text-[25px] manrope font-bold'>{posts?.title}</h1>
                   </div>
                </div>))
            }
            
        </div>
    );
};

export default TotalCounts;