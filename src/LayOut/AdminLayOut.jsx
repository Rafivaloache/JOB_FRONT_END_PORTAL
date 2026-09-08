import React from 'react';
import { MdWindow} from "react-icons/md";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Admin_Header from '../Components/Admin-Header/Admin_Header';


const AdminLayOut = () => {

    const location = useLocation();
    

    
    const navigation_data = [
    {
        name:"Overview",
        icon:<MdWindow/>,
        path:"/admin/overview"


    },
    {
        name:"Jobs",
        icon:<BsFillSuitcaseLgFill/>,
        path:"/admin/jobs"

    },
    {
        name:"User",
        icon:<BsPeopleFill/>,
        path:"/admin/user"


    },
    
]

    const currentPath = location.pathname;
    
    const currentNavigation = navigation_data.find(item => item.path === currentPath);
    
    return (
       <div className='min-h-screen'>
      
         <div className='min-h-screen flex flex-col md:flex-row  '>
            <aside className='  md:sticky top-0  left-0 bg-pink-200 w-full md:w-64 md:shrink-0 '>
              <div className='flex justify-between items-center p-3'>
                 <div className=" grow ">
                    <h1 className='font-extrabold'><span className='text-red-600 text-[50px]'>D</span>akio</h1>
                </div>
                  <span>Admin</span>
              </div>

                <hr />
                {/* navigation of Admin dashboard */}
                <p className='p-3 inter font-bold'>Navigation</p>
                <div>
                <ul className='flex flex-row md:flex-col flex-wrap gap-3'>
                    {
                        navigation_data.map((item, index)=>{
                            return <>

                            <NavLink to={item.path} className={({isActive})=>isActive ? "active" : ""} key={index} >
                                <li className='flex items-center gap-3 p-3 hover:text-white hover:bg-[#1a1d22] '>
                                    {item.icon}
                                    <p className='inter'>{item.name}</p>
                                </li>
                            </NavLink>
                            
                             
                            </>
                        })
                    }
                    </ul>
                    <hr />
                    <p>System</p>
                    <ul>
                        <NavLink  className={({isActive})=>isActive ? "active" : ""} >
                            <li className='flex items-center gap-3 p-3 hover:bg-[#1a1d22] '>
                                <IoMdSettings size={25} className='text-[#54b3ab]'/>
                                <p className='inter'>Settings</p>
                            </li>
                        </NavLink>
                    </ul>
                </div>
            </aside>
            <div className='w-full'>
                <div className='bg-white shadow'>
                     <Admin_Header currentNavigation={currentNavigation} />
                </div>
                <div className='px-4'>
                    <Outlet/>
                </div>
            </div>
            
        </div>
       </div>
    );
};

export default AdminLayOut;