import React from 'react';
import { Outlet } from 'react-router-dom';

const SuspendLayOut = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default SuspendLayOut;