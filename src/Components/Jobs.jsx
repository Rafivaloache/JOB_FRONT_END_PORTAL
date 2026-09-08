import React, { use, useEffect, useState } from 'react';
import { useDeletejobsByQuery, useGetJobsQuery, useGetListJobDashboard, useSearchJobFromDashboard, useUpdateJobdetails } from '../../Hook';
import { jobaxiosInstace } from '../../client';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

const Jobs = () => {
    const { data, isLoading } = useGetListJobDashboard();
    
    const listjohdashboard = data?.data?.jobs;
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const deleteJobs = useDeletejobsByQuery();
    
    const totalLength = data?.data?.jobs?.length;
    const updateJobInfo = useUpdateJobdetails();
    const [selectedJob, setSelectedjob] = useState(null);
    const [open, setOpen] = useState(false);

    const [search, setSearch] = useState('');

    const [category, setCategory] = useState('active');

    const { data: categoryData } = useGetJobsQuery(category);

    
    

    const totalCategoryJOb = categoryData?.data?.jobs


    const { data: searchData } = useSearchJobFromDashboard(search);

    

    const totalSearchLength = searchData?.data?.jobs?.length;
    const totalSearchData = searchData?.data?.jobs;
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

    useEffect(() => {
        if (selectedJob) {
            reset({
                title: selectedJob?.title,
                max_salary: selectedJob?.max_salary,
                min_salary: selectedJob?.min_salary,
                location: selectedJob?.location,
                id: selectedJob?._id,
                status: selectedJob?.status,
                company_logo: selectedJob?.company_logo,



            });
        }

    }, [selectedJob, reset])

    

    const handleOpen = (job) => {
        
        
      

        setSelectedjob(job);
        setOpen(true);
    };
    const handleEditJob = (id) => {
        

    }

    const handleClose = () => {
        setOpen(false);
    }

    const onsubmit = async (data) => {
        
       

        

        
        
        try{
            const res = await updateJobInfo.mutateAsync(data);
            
            handleClose();
            return res

        }catch(err){

            


        }


    }


    const handleDeleteJobData = async (id) => {
        
        try {
            const res = await deleteJobs.mutateAsync(id);
            
        } catch (err) {
            
        }
    }







    return (
        <div>
            {/* Search Jobs */}
            <div className='flex gap-1'>
                <div className='w-[70%]'>
                    <input onChange={(e) => setSearch(e.target.value)} className='bg-gray-500 w-full p-3 focus:bg-white rounded-lg' type="text" placeholder='Search Jobs' />
                </div>
                <div className='flex gap-2'>
                    <button onClick={() => setCategory('all')} className='bg-orange-400 w-25 p-3 rounded-lg'>All</button>
                    <button onClick={() => setCategory('active')} className='bg-orange-400 w-25 p-3 rounded-lg'>Active</button>
                    <button onClick={() => setCategory('closed')} className='bg-orange-400 w-25 p-3 rounded-lg'>Closed</button>
                    <button onClick={() => setCategory('draft')} className='bg-orange-400 w-25 p-3 rounded-lg'>Draft</button>

                </div>
            </div>

            {/*  */}
            <table className='w-full shadow-lg'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th className='text-left'>Position</th>
                        <th className='text-left'>Type</th>
                        <th className='text-left'>Salary</th>
                        <th className='text-center'>Applicants</th>
                        <th className='text-left'>Status</th>
                        <th className='text-left'>Posted</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        search.length === 0 ? totalCategoryJOb?.map((item, index) => (<tr key={index} className='  hover:bg-gray-300'>
                            <td className='w-[10%] text-center'>{index + 1}</td>
                            <td className='w-[20%] '>
                                <h1 className='inter font-bold'>{item?.title}</h1>
                                <p className='inter text-sm'>{item?.company_name}</p>
                            </td>
                            <td className=''>{item?.location}</td>
                            <td className=''>{item?.min_salary}k- {item?.max_salary}k</td>
                            <td className='text-center'>{item?.applications}</td>
                            <td className='w-[10%]'>
                                <button className='bg-red-500 px-2.5 py-1 cursor-pointer'>{item?.status}</button>
                            </td>
                            <td className=''>{item?.createdAt.split("T")[0]}</td>
                            <td><FaRegEdit onClick={() => handleOpen(item, item?._id)} /></td>
                            <td><FaRegTrashAlt onClick={()=>handleDeleteJobData(item?._id)} /></td>

                        </tr>)) : totalSearchData?.map((item, index) => (<tr key={index} className='  hover:bg-gray-300'>
                            <td className='w-[10%] text-center'>{index + 1}</td>
                            <td className='w-[20%] '>
                                <h1 className='inter font-bold'>{item?.title}</h1>
                                <p className='inter text-sm'>{item?.company_name}</p>
                            </td>
                            <td className=''>{item?.location}</td>
                            <td className=''>{item?.min_salary}k- {item?.max_salary}k</td>
                            <td className='text-center'>{item?.applications}</td>
                            <td className='w-[10%]'>
                                <button className='bg-red-500 px-2.5 py-1 cursor-pointer'>{item?.status}</button>
                            </td>
                            <td className=''>{item?.createdAt.split("T")[0]}</td>
                            <td onClick={() => handleOpen(item)}><FaRegEdit /></td>
                            <td><FaRegTrashAlt onClick={()=>handleDeleteJobData(item?._id)} /></td>

                        </tr>))
                    }
                </tbody>

            </table>
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
                                <img className='w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-lg shrink-0' src={selectedJob?.company_logo} alt="" />
                                <h1 className='text-lg sm:text-2xl font-bold text-white break-words'>{selectedJob?.title}</h1>
                            </div>
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>

                        </Typography>
                        <form action="" onSubmit={handleSubmit(onsubmit)}>

                            <div>
                                <label htmlFor="">Job Title</label>
                                <br />
                                <input {...register("title")} className='p-2 bg-[#0C0F14]  text-gray-400 w-full rounded-lg' type="text"  />

                            </div>
                            <div>

                                <div>
                                    <label htmlFor="">Status</label>
                                    <select {...register("status")}  className='w-full bg-[#0C0F14] text-gray-400 p-2 rounded-lg'  id="">
                                        <option value="active">active</option>
                                        <option value="closed">Closed</option>
                                        <option value="draft">Draft</option>

                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="">Type</label>
                                    <br />
                                    <select {...register("location")}  className='w-full bg-[#0C0F14] text-gray-400 p-2 rounded-lg'  id="">
                                        <option value="hybride">hybride</option>
                                        <option value="onsite">Onsite</option>
                                        <option value="remote">Remote</option>

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

export default Jobs;