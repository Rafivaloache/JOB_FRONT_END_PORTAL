import React, { useEffect, useState } from 'react';
import { useGetDeleteUser, useGetUserByQuery, useGetUsers, useUpdateInfo_Profile } from '../../../Hook';
import { useAuthStore } from '../store/useStore';
import { socket } from '../soket/soket';
import { useQueryClient } from '@tanstack/react-query';
import { allUser, getProfileSearch } from '../../ALlapi';
import { PiDotsThree } from "react-icons/pi";
import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FaEdit, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";


const Users = () => {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [userProfile, setUserProfile] = useState([]);
    const [open, setOpen] = useState(false);
    const deleteUsers = useGetDeleteUser()
    const [selectedUser, setSelectedUser] = useState(null);
    const updateUserInfo = useUpdateInfo_Profile();

   

   
   



    const { register, handleSubmit, reset, formState: { errors } } = useForm()










    useEffect(() => {

        socket.on("newApplication", (data) => {

            

            queryClient.invalidateQueries({
                queryKey: ["users"]
            });

        });



        return () => {
            socket.off("newApplication");
        };

    }, [queryClient]);

    useEffect(() => {
        socket.on("loginng", (data) => {

            

            queryClient.invalidateQueries({
                queryKey: ["users"]
            });

        });

    })

    const { data, isLoading, isError } = useGetUsers();
    const { user } = useAuthStore();
    
    

    const users = data?.data?.totalUsers;
    

    const [all, setRole] = useState('all');

    
    
    

     const {data:total} = useGetUserByQuery(all);
    
    const totalUsers = total?.data?.users;
    const [allUsers, setAllUsers] = useState(totalUsers);
    
    






   

    

    const handleSearch = async () => {
        try {

            const res = await getProfileSearch(search);
            
            setUserProfile(res?.data?.searchUsers);





        } catch (err) {
            
        }

    }
    useEffect(() => {
        if (selectedUser) {
            reset({
                email: selectedUser.email,
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                role: selectedUser.role,
                isSuspend: selectedUser.isSuspend
            });
        }
    }, [selectedUser, reset]);



    useEffect(() => {
        if (!search.trim()) {
            setUserProfile([]);
            return
        }
        handleSearch();
    }, [search]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: '92%',
            sm: 500,
        },
        maxHeight: '90vh',
        overflowY: 'auto',
        bgcolor: 'grey',
        border: '2px solid #000',
        boxShadow: 24,
        p: {
            xs: 2,
            sm: 4,
        },
        borderRadius: '10px',
    };



    const handleOpen = (user) => {

        

        setSelectedUser(user);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const onsubmit = async (data) => {
        
        try {
            const res = await updateUserInfo.mutateAsync(data);
            


        } catch (err) {
            
        }

    }

    const handleDelete = async (userId) => {
        

        try {
            const res = await deleteUsers.mutateAsync({ _id: userId });
            
        } catch (err) {
            
        }



    }
    



    return (
        <div className='relative w-full px-2 sm:px-4 lg:px-6'>
            <h1 className="text-3xl sm:text-4xl lg:text-[50px] inter font-bold">
                User Profiles
            </h1>

            <h2 className="text-sm sm:text-base mt-2">
                8 registered users 6
            </h2>
            {/* content */}
            <div className='flex items-center gap-3 justify-between'>
                {/* serarch bar */}
                <div className="w-full lg:w-[60%]">
                    <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-white w-full rounded-lg focus:outline-none px-3 py-2 border-gray-300 border-2"
                        placeholder="Search"
                    />
                </div>
                <div className="w-full lg:w-[40%]">
                    <div className="flex flex-wrap lg:justify-end gap-2">
                        <button onClick={() => setRole('all') } className="bg-orange-500 px-3 py-2 rounded">
                            ALL
                        </button>

                        <button onClick={() => setRole('recruiter')}  className="bg-orange-500 px-3 py-2 rounded">
                            Admin Recruiter
                        </button>

                        <button className="bg-orange-500 px-3 py-2 rounded">
                            Candidate
                        </button>
                    </div>
                </div>
            </div>

            <div className='w-full overflow-x-auto mt-6'>
                <table className=' w-full min-w-[800px]'>
                    <thead>
                        <tr>
                            <th className='border-2 p-3 whitespace-nowrap'>Users</th>
                            <th className='border-2 p-3 whitespace-nowrap'>Role</th>
                            <th className='border-2 p-3 whitespace-nowrap'>Status</th>
                            <th className='border-2 p-3 whitespace-nowrap'>Applications</th>
                            <th className='border-2 p-3 whitespace-nowrap'>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            search.length > 0 ? userProfile?.map((user1, index) => <tr key={index} className='border '>
                                <td className='  '>
                                    <div className='flex gap-3 p-3 items-center min-w-[200px'>
                                        <img className='w-8 h-8 rounded-full object-cover shrink-0' src={user1?.profile} alt="" />
                                        <p className='whitespace-nowrap'>{user1?.firstName + " " + user1?.lastName}  </p>
                                    </div>
                                </td>
                                <td className='p-3 text-center'>{user1?.role}</td>
                                <td className='text-center'>{user1?.status}</td>
                                <td className='text-center'>{user1?.appliedJobs}</td>
                                <td className='text-center'>{new Date(user1?.createdAt).toDateString()}</td>
                                <td><FaRegEdit onClick={() => handleOpen(user1)} size={20} /></td>
                                <td><FaRegTrashAlt onClick={() => handleDelete(user1?._id)} /></td>

                            </tr>
                            ) : totalUsers?.map((user2, index) => <tr key={index} className='border '>
                                <td className='  '>
                                    <div className='flex gap-3 p-3 items-center'>
                                        <img className='w-8 h-8 rounded-full object-cover' src={user2?.profile_picture} alt="" />
                                        <p>{user2?.firstName + " " + user2?.lastName}  </p>
                                    </div>
                                </td>
                                <td className='p-3 text-center'>{user2?.role}</td>
                                <td className='text-center'>{user2?.status}</td>
                              
                                <td className='text-center'>{user2?.appliedJobs}</td>
                                <td className='text-center'>{new Date(user2?.createdAt).toDateString()}</td>
                                <td><FaRegEdit onClick={() => handleOpen(user2)} size={20} /></td>
                                <td><FaRegTrashAlt onClick={() => handleDelete(user2?._id)} /></td>

                            </tr>
                            )

                        }


                    </tbody>
                </table>

            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <div className='flex gap-2'>
                                <img className='w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-lg shrink-0' src={selectedUser?.profile || selectedUser?.profile_picture} alt="" />
                                <h1 className='text-lg sm:text-2xl font-bold text-white break-words'>{selectedUser?.firstName + " " + selectedUser?.lastName}</h1>
                            </div>
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>

                        </Typography>
                        <form action="" onSubmit={handleSubmit(onsubmit)}>
                            <div>
                                <label htmlFor="">Email:</label>
                                <br />
                                <input name="email"{...register("email")} className='p-2 bg-[#0C0F14]  text-gray-400 w-full rounded-lg' type="text" defaultValue={selectedUser?.email} />
                            </div>
                            <div className='flex flex-col sm:flex-row gap-3'>
                                <div className='w-full sm:w-1/2'>
                                    <label htmlFor="">First Name:</label>
                                    <br />
                                    <input className='p-2 bg-[#0C0F14] text-gray-400 w-full rounded-lg' {...register("firstName")} type="text" defaultValue={selectedUser?.firstName} />
                                </div>
                                <div>
                                    <label htmlFor="">Last Name:</label>
                                    <br />
                                    <input className='p-2 bg-[#0C0F14] text-gray-400 w-full rounded-lg' {...register("lastName")} type="text" defaultValue={selectedUser?.lastName} />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="">Role:</label>
                                    <br />
                                    <select {...register("role")} defaultValue={selectedUser?.role} className='w-full bg-[#0C0F14] text-gray-400 p-2 rounded-lg' name="role" id="">

                                        <option value="recruiter">Admin Recruiter</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>


                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="">Suspend</label>
                                    <select {...register("isSuspend")} defaultValue={selectedUser?.isSuspend === false ? "false" : "true"} className='w-full bg-[#0C0F14] text-gray-400 p-2 rounded-lg' name="" id="">
                                        <option value="true">Suspend</option>
                                        <option value="false">Not Suspend</option>
                                    </select>
                                </div>

                                <div className='flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-5'>
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="w-full sm:w-25 bg-red-500 p-3 text-white rounded-lg"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="w-full sm:w-25 bg-blue-500 text-white p-3 rounded-lg"
                                    >
                                        Update
                                    </button>
                                </div>




                            </div>
                        </form>
                    </Box>
                </Fade>
            </Modal>




        </div>
    );
};

export default Users;