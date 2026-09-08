import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaApple, FaGooglePlus } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { createUser } from '../../ALlapi';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useStore';




const Register = () => {
     const {user, setUser, fetchUser} = useAuthStore();
      const [showModal, setShowModal] = useState(false);

     
   
     const navigate = useNavigate()
    
     useEffect(()=>{
        fetchUser();

     },[fetchUser])

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onsubmit = async(data)=>{
        try{
            const res = await createUser(data);
            Swal.fire({
            title: res?.data?.message,
            icon: "success",
            draggable: true
            });
            setShowModal(true)
            navigate('/form-fillup/profileForm',{
                state:{
                    showProfileMoadal:true,
                }
            })
            
            setUser(res?.data?.user)
            
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
        <div  className='min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#f2f2fd] px-4 py-8 gap-6'>

            <div className='bg-[#ffffff] w-full lg:w-1/2  max-w-xl mx-auto p-4'>
                <h1 className='manrope font-extrabold'>Begin your journey</h1>
                <div>
                    <form onSubmit={handleSubmit(onsubmit)} action="" className='manrope font-medium'>
                        <div className='flex flex-col sm:flex-row gap-2 '>
                            <div className='w-full'>
                                <label htmlFor="fname">First Name</label>
                                <br />
                                <input type="text"{...register("firstName")} className='bg-[#f3f4f6] p-2 w-full'  />
                                {errors?.firstName && <p className='text-red-600'>{errors.firstName.message}</p>}

                            </div>
                            <div className='w-full'>
                                <label htmlFor="lname">Last Name</label>
                                <br />

                                <input type="text" className='bg-[#f3f4f6] p-2 w-full ' {...register("lastName")}  />
                                {errors?.lastName && <p className='text-red-600'>{errors.lastName.message}</p>}

                            </div>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <br />
                            <input type="email" className='bg-[#f3f4f6] w-full p-2' {...register("email")}  placeholder='@Email' />
                            {errors?.email && <p className='text-red-600'>{errors.email.message}</p>}
                        </div>
                         <div>
                            <label htmlFor="email">Password</label>
                            <br />
                            <input type="password" className='bg-[#f3f4f6] w-full p-2' {...register("password")}  placeholder='@Password' />
                            {errors?.password && <p className='text-red-600'>{errors.password.message}</p>}
                        </div>
                        <div className='flex gap-2 mt-2'>
                            <input type="checkbox" />
                            <p className='font-bold manrope text-[10px]'>By signing up, I agree with the <span className='text-blue-600'>Terms of Use & Privacy Policy</span></p>
                        </div>
                        <div className='mt-2'>
                            <button type='submit' className='bg-[#6360e0] cursor-pointer font-extrabold text-white p-2 w-full'>Register</button>
                        </div>
                        <div className='flex items-center gap-2 my-2 font-medium'>
                            <hr className='border-gray-300 border-2 w-1/2' />Or <hr className='w-1/2 border-2 border-gray-300'/>

                        </div>

                    </form>
                    <div className='flex justify-center items-center gap-2'>
                        <FaGooglePlus className="cursor-pointer" size={30} />
                        <FaFacebook size={30} className='cursor-pointer' />
                        <FaApple size={30} className='cursor-pointer'/>
                    </div>
                </div>
            </div>
            <div className='w-full lg:w-1/2'>
                <h1 className='text-[30px] manrope font-bold'>Come join us</h1>
                <ul>
                    <li className='flex items-center gap-2'>
                        <img className='w-12 h-12 object-cover rounded-full' src="../../img/visily-image-1.jpg" alt="" />
                        <div>
                            <p>Explore articles, tutorials, and guides on diverse subjects</p>
                        </div>
                    </li>
                        <li className='flex my-2 items-center gap-2'>
                        <img className='w-12 h-12 object-cover rounded-full' src="../../img/visily-image-2.jpg" alt="" />
                        <div>
                            <p>Learn at your own pace and access educational resources anytime</p>
                        </div>
                    </li>
                        <li className='flex items-center gap-2'>
                        <img className="w-12 h-12 object-cover rounded-full" src="../../img/visily-image-3.jpg" alt="" />
                        <div>
                            <p>Engage with a community of learners and share insights</p>
                        </div>
                    </li>
                </ul>


            </div>
            
            
        </div>
    );
};

export default Register;