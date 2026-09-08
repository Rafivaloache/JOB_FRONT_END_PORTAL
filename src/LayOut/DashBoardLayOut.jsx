import React, { useState } from 'react';
import Header from '../Components/Header';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import { useAuthStore } from '../Components/store/useStore';

const DashBoardLayOut = () => {

    const [select, setSelect] = useState("Dashboard");
    
    const menu = [
        {
            name: "Dashboard",
            path: "/dashboard"

        },
        {
            name:"Profile",
            path:"profile"
        },
        {
            name:"Applied Jobs",
            path:"applied-jobs"
        },
       

       
    ]
    return (
        <div>
            <header>
                <Header />
            </header>

            <main className='min-h-screen'>
                <div className=' w-full  min-h-screen  flex flex-col md:flex-row '>
                    <aside className='md:sticky  bg-[#0f172a] border-2 md:h-full top-0 left-0 w-full md:w-64 md:shrink-0 '>

                        <ul className='flex flex-row md:flex-col flex-wrap'>
                          {
                            menu?.map((item,index)=><NavLink key={index}
                            to={item.path} end={item.path === "/dashboard"}
                            className={({ isActive }) => 
                            isActive 
                                ? "block p-3 text-black bg-white cursor-pointer" 
                                : "block p-3 text-white cursor-pointer"
                            }
                        >
                            {item.name}
                        </NavLink>)
                          }  
                        </ul>

                    </aside>
                    <div className=' w-full flex-1 '><Outlet /></div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default DashBoardLayOut;