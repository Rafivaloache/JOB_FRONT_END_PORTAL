import React from 'react';
import { FaStar } from 'react-icons/fa';

const Skills = ({skills}) => {
    return (
       <div>
         <div className='my-3 flex items-center p-3 justify-between'>
           <h1 className='flex gap-2 items-center inter text-[24px] font-bold '> <FaStar color='#17958A' size={45}/> Skills</h1>
           <span className='text-[#54b3ab] text-[18px] font-bold works'>Manage Skills</span>
        </div>
        <div className='flex flex-wrap gap-3 p-3'>
            {/* <span className='p-3 bg-[#eaf2f3] rounded-full inter font-bold'>React</span>
            <span className='p-3 bg-[#eaf2f3] rounded-full inter font-bold'>Tailwind CSS</span>
            <span className='p-3 bg-[#eaf2f3] rounded-full inter font-bold'>Javascript</span>
            <span className='p-3 bg-[#eaf2f3] rounded-full inter font-bold'>Mongodb</span> */}

            {
            skills &&    skills?.length === 0 ? <h1 className='text-[#54b3ab] text-[20px] font-bold'>No skills added</h1> : skills?.map((skill, index) => <span key={index} className='p-3 bg-[#eaf2f3] rounded-full inter font-bold'>{skill}</span>)
            }
        </div>
       </div>
    );
};

export default Skills;