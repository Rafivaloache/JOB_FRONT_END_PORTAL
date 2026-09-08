import React from 'react';
import Header from '../Components/Header';
import { Outlet } from 'react-router-dom';

const ContactLayOut = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default ContactLayOut;