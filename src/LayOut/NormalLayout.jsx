import React from 'react';
import { Outlet } from 'react-router-dom';

const NormalLayout = () => {
    return (
        <div className='flex justify-center h-screen items-center'>
            <div className='w-full h-auto'>
                <Outlet/>
            </div>
        </div>
    );
};

export default NormalLayout;