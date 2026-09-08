import React from 'react';
import { IoPersonSharp } from 'react-icons/io5';

const About = ({about}) => {
    return (
        <div className="p-3 bg-white shadow-lg">
            <h1 className='flex items-center gap-2 text-[24px] works font-bold'><IoPersonSharp />About Me</h1>
            <div>
                <p>{about}</p>
            </div>
        </div>
    );
};

export default About;