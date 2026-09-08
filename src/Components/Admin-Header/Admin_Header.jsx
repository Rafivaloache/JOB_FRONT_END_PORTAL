import React from 'react';

const Admin_Header = ({currentNavigation}) => {

    return (
        <div>
           <header>
             <nav className='flex justify-between items-center p-2'>
                <div className='flex gap-2 p-2'>
                   <h1> Admin &gt; </h1>
                    <h1>{currentNavigation?.name}</h1>
                </div>
                <div>
                    <p>{new Date().toDateString()}</p>
                </div>
            </nav>
           </header>
            
        </div>
    );
};

export default Admin_Header;