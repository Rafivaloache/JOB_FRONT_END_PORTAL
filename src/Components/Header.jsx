import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from './store/useStore';
import { FaBookmark } from "react-icons/fa";
import { useBookmark } from './BookMarkContext/UseBOOKCONText';
import { FaRegCircleXmark } from "react-icons/fa6";
import { useDeleteSaveJobs } from '../../Hook';
import {   setRoleUser } from '../ALlapi';
import { socket } from './soket/soket';
import { set } from 'react-hook-form';
import { FaBars, FaXmark } from "react-icons/fa6";






const Header = () => {
    const {user, setUser, fetchUser,loginRole, logout,select,  getSavedJobs,savedInfoJob} = useAuthStore();
    const [open, setOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const deleteSavedJob = useDeleteSaveJobs();
    const [toRole, setTORole] = useState(null);
     

    
    

    
    const savedJobs = savedInfoJob?.data?.saveJob;
    

    


    const handleGetRole=async()=>{


     
     if(toRole === null){
        setTORole(null);
        
        
     }


     const  res = await  setRoleUser({userId:user?.id});
     
     setTORole(res?.data?.user?.role);
    }

    
    useEffect(()=>{

        handleGetRole()

      


    },[user]);
     
    
    
    useEffect(()=>{
        
         getSavedJobs();
         
    },[]);

    useEffect(() => {

    socket.on("connect", () => {
        
    });

    return () => {
        socket.off("connect");
    };

}, []);


   

    

  


     
    
    


    
    
   
   

    useEffect(()=>{
        fetchUser();
    },[fetchUser])


  
    const handleLogout = async()=>{
      const res = await  logout();

      setTORole(null);
      
      

        
    }


    const handleDeleteSavedJobs = async(id)=>{
        
        const res = await deleteSavedJob.mutateAsync(id);
        
    }
   
     const handleDropDown = async()=>{
        setOpen(!open);
     }
    
    return (
        <div className=' max-w-7xl container  mx-auto  shadow-lg  p-4 md:p-6 relative'>
            <nav className='flex justify-between gap-2 items-center'>
                <div className=" grow ">
                    <h1 className='font-extrabold'><span className='text-red-600 text-[50px]'>D</span>akio</h1>
                </div>
                <button
                    type='button'
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className='md:hidden p-2 text-2xl cursor-pointer'
                    aria-label='Toggle menu'
                >
                    {mobileMenuOpen ? <FaXmark /> : <FaBars />}
                </button>
                <div className={`grow-3 w-full md:w-auto md:flex justify-center absolute md:static top-full left-0 bg-white md:bg-transparent z-40 shadow-lg md:shadow-none p-4 md:p-0 ${mobileMenuOpen ? "flex" : "hidden"}`}>
                    <ul className='flex flex-col md:flex-row gap-2 w-full md:w-auto '>
                    <li className='p-3'><NavLink to="/">Home</NavLink></li>
                    <li className='p-3'><NavLink>About</NavLink></li>
                    <li className='p-3'><NavLink to='/contact/contact-me'>Contact</NavLink></li>   
                    <li className='p-3'><NavLink to='/job/findjob'>Find Jobs</NavLink></li>  
                    {
                      toRole ==='admin'?(<li className='p-3'><NavLink to='/admin/overview'>Admin</NavLink></li>):" "
                    }
                    {
                       toRole === 'admin' || toRole ==='recruiter' ? (<li className='p-3'><NavLink to='/job/create-job'>Create Jobs</NavLink></li>):" "
                    }
                    {
                        savedJobs?.length > 0 && user?.id ? (<li onClick={handleDropDown} className=' relative  flex gap-1 items-center'><FaBookmark/>Saved Jobs
                            <ul className={`absolute top-12 w-[300px] p-4 left-0 bg-white ${open ? "visible" : "invisible"}`}>
                            {
                                savedJobs?.map((item, index)=>{
                                    return (
                                       
                                            <li key={index} className='p-4 w-full rounded-lg relative  shadow-lime-400 shadow-lg'>
                                                <div className='flex gap-3'>
                                                    <div className=''>
                                                        <img className='w-13 h-13 rounded-full object-cover shadow-lg' src={item?.job_id?.company_logo} alt="" />
                                                    </div>
                                                    <div className=''>
                                                        <h1 className='works font-bold text-[15px]'>{item?.job_id?.title}</h1>
                                                        <p>${item?.job_id?.min_salary} - ${item?.job_id?.max_salary} </p>
                                                    </div>
                                                </div>
                                                <div className='absolute right-2 top-5'>
                                                    <FaRegCircleXmark onClick={()=>handleDeleteSavedJobs(item?._id)} size={20} />
                                                </div>
                                            </li>
                                       
                                    )
                                })
                            }
                         </ul>

                        </li>):" "
                        
                    }
                    
                </ul>
                </div>
                {
                    !user && (<div className=' flex gap-2 md:gap-3 shrink-0'>
                    <Link to='/auth/login' className='w-[90px] md:w-[150px] text-center text-[12px] md:text-base h-auto cursor-pointer  bg-black p-2 md:p-3 text-white font-extralight'>Log in</Link>
                    <Link to='/auth/register' className='w-[90px] md:w-[150px] text-center text-[12px] md:text-base cursor-pointer h-auto bg-cyan-300 p-2 md:p-3 font-extralight text-white '>Sign up</Link>
                </div>)
                }

                {
                    user && (<div className=' flex grow-2 justify-end items-center  gap-2 shrink-0 '>
                        <button  className='w-[90px] md:w-[150px] text-[12px] md:text-base h-auto cursor-pointer  bg-red-500 p-2 md:p-3 text-white font-extralight' onClick={handleLogout}>Logout</button>
                        <div className='relative group'>
                            <img className='w-14 h-14 rounded-full cursor-pointer hover:border-purple-500 hover:border-2 object-cover' src="https://i.ibb.co.com/JS2yD3Y/charlie-green-3-Jmf-ENc-L24-M-unsplash.jpg" alt="" />
                            <div className=' invisible group-hover:visible   text-black bg-[#f6f7f9] p-3 rounded-lg absolute -bottom-12.5 -right-4'>
                                <ul>
                                    <NavLink to='/dashboard'><li className='text-[10px] inter font-bold cursor-pointer'>Dashboard</li></NavLink>
                                    <NavLink to='/dashboard/profile'><li className='text-[10px] inter font-bold cursor-pointer'>Profile</li></NavLink>
                                    
                                </ul>
                            </div>
                        </div>

                    </div>)
                    
                }
                
            </nav>
            
        </div>
    );
};

export default Header;