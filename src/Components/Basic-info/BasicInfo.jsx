import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import About from '../About/About';
import Skills from '../Skills/Skills';
import ContactMe from '../Contact/ContactMe';
import Recent from '../Recent/Recent';
import { useGetProfile, useGetProfileInfo } from '../../../Hook';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';





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

const BasicInfo = () => {
    const {data, isLoading} = useGetProfile();
    
    const profile = data?.data?.createProfile;
     const [open, setOpen] = React.useState(false);
     const updatedProfile = useGetProfileInfo();
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const {register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async(data) =>{
        const profileId = profile?._id;
        data = {...data, profileId};
        const res = await updatedProfile.mutateAsync(data);
        
        handleClose();
    }


    
    return (
        <div className=' '>
            {/* profile */}
            <div className='flex flex-col md:flex-row w-full  justify-between md:items-center gap-4 p-3 shadow-lg rounded-lg'>
                <div className='flex w-full md:w-auto  gap-3'>
                    <div>
                        <img className='w-20 h-20 md:w-30 md:h-30 object-cover rounded-full ' src={profile?.profile_picture} alt="" />
                    </div>
                    <div>
                        <h1 className='inter text-[22px] md:text-[32px] font-bold'>{profile?.user_id?.firstName} {profile?.user_id?.lastName}</h1>
                        <p className='inter'>Senior Full stack developer</p>
                        <p className='flex flex-wrap items-center inter w-full gap-2 '><FaLocationDot  /> {profile?.address}(Open to Remote)  <span className='inline-block bg-gre ml-2'>Full time</span>,<span className='inline-block '>Contract</span></p>

                    </div>
                </div>
                {/* edit profile */}

                {/* share profile */}
                <div className='flex flex-wrap w-full md:w-auto justify-start md:justify-end  gap-3 items-center'>

                    <button className='bg-[#0C9488] flex-1 md:flex-none md:w-[150px] h-auto p-3 inter font-bold text-white cursor-pointer rounded-lg'>Share Profile</button>
                    <button onClick={()=>handleOpen()}  className='bg-[#f6f7f9] flex-1 md:flex-none md:w-[150px] h-auto p-3 rounded-lg flex gap-1 justify-center items-center cursor-pointer'><FaPencilAlt />Edit Profile</button>

                </div>
            </div>
            <About about={profile?.about_me}/>
            <Skills skills={profile?.skills}/>
           
            <h1 className='text-[#0C9488] text-[30px] text-center inter font-bold'>Applied Jobs</h1>
            <Recent/>
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
           
            <div>
                <form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-4">

                  <div className='flex gap-3'>
                    <div className='w-full'>


                     <label htmlFor="">First Name</label>
                     <br />

                    <input className='w-full p-3 focus:bg-white bg-white' type="text" {...register('firstName')} placeholder='FirstName' />
                    </div>

                     <div className='w-full'>


                     <label htmlFor="">Last Name</label>
                     <br />

                    <input className='w-full p-3 focus:bg-white bg-white' type="text" {...register('lastName')} placeholder='FirstName' />
                    </div>
                  </div>

                    <div>
                         <label htmlFor="">Email</label>
                         <br />
                         <input className='w-full p-3 focus:bg-white bg-white' type="text" {...register('email')} placeholder='Email' />
                    </div>
                     <div>
                         <label htmlFor="">Phone</label>
                         <input className='w-full p-3 focus:bg-white bg-white' type="text" {...register('phone')} placeholder='Phone' />
                    </div>
                     <div>
                         <label htmlFor="">About me</label>
                         <textarea {...register('about_me')}  className='resize-none p-1 w-full h-37.5 focus:outline-none overflow-y-scroll bg-white focus:bg-white' id="">

  
                       </textarea>
                    </div>
                     <div>
                         <label htmlFor="">Address</label>
                         <input className='w-full p-3 focus:bg-white bg-white' type="text" {...register('address')} placeholder='Email' />
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

                    
                    
                </form>
            </div>
          </Box>
        </Fade>
      </Modal>
        </div>
    );
};

export default BasicInfo;