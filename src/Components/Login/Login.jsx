import React, { useEffect } from 'react';
import { FaGooglePlus } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { loginUser } from '../../ALlapi';
import Swal from 'sweetalert2';
import { useAuthStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const {setUser, user, fetchUser,  setRole, loginRole } = useAuthStore();
    const navigate = useNavigate()
    

    
    useEffect(()=>{
        fetchUser()

    },[fetchUser])
  
   
    

   

    const {register,handleSubmit, formState:{errors}} = useForm()
    const onsubmit = async(data)=>{

        try{
            const res = await loginUser(data);
            

            Swal.fire({
            title: res?.data?.message,
            icon: "success",
            draggable: true
            });
            
            setUser(res?.data?.user);
            setRole(res?.data?.user?.role);
           
            
  

            navigate('/')
            


        }catch(err){
            
            Swal.fire({
            icon: "error",
            title: err?.response?.data?.message,
            text: "Something went wrong!",
            footer: "<a href=\"#\">Why do I have this issue?</a>"
            });

        }
       
        
        
    }
    return (
        <div className='min-h-screen flex container mx-auto flex-col lg:flex-row-reverse justify-center items-center bg-[#ffffff] px-4 py-8 gap-6'>
            <div className='manrope max-w-xl w-full lg:w-1/2 rounded-lg  shadow-lg p-4'>
                <h1 className='text-center text-blue-500 font-bold text-[30px]'>Sign In</h1>
                <div className=' '>
                    <form onSubmit={handleSubmit(onsubmit)} action="" className=''>
                        <div className=''>
                            <label className='email' htmlFor="email">Email</label>
                            <br />
                            <input className='bg-[#f3f4f6] w-full p-3' type="text" {...register("email")} placeholder='@Email' />
                            {errors?.email && <p className='text-red-600'>{errors.email.message}</p>}
                        </div>
                         <div>
                            <label htmlFor="password">Password</label>
                            <br />
                            <input type="text" className='bg-[#f3f4f6] w-full p-3' {...register("password",{
                                required:"Password is required"
                            })} placeholder='@Password' />
                            {
                                errors?.password && <p className='text-red-600'>{errors.password.message}</p>
                            }

                        </div>

                        <div  className='flex gap-2'>
                            <input type="checkbox" />
                            <p>Remember Me</p>
                        </div>
                       <div>
                         <button className='bg-[#636ae8] font-extrabold text-white cursor-pointer w-full p-3'>Sign in</button>
                       </div>

                    </form>
                    <div className="context-auth-text">
                        <p className='text-center'>Sign in with</p>
                        <div className='flex justify-center gap-2'>
                          <button className='bg-[#fef1f1] flex justify-center  cursor-pointer p-3 w-[90px] h-auto'>  <FaGooglePlus /></button>
                           <button className='bg-[#f3f6fb] flex justify-center cursor-pointer   p-3 w-[90px] h-auto'><FaFacebook /></button> 
                           <button className='bg-[#f3f4f6] flex justify-center cursor-pointer  p-3 w-[90px] h-auto'> <FaApple /></button>
                        </div>
                    </div>
                </div>


            </div>
            <div className="context w-full lg:w-1/2 p-5">
               <h1 className='text-[48px]'>Great to have you back!</h1>
               <p className='text-[14px]'>Consequat adipisicing ea do labore <br /> irure adipisicing occaecat cupidatat excepteur duis m</p>
            </div>
            
        </div>
    );
};

export default Login;