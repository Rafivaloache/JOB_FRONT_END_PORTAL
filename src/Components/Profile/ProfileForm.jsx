import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateCoverPic, useCreateProfile, useProfilePic } from '../../../Hook';
import { showImgurl } from '../../ALlapi';

import { useLocation, useNavigate } from 'react-router-dom';
import MuiModal from '../Modal/Modal';





const ProfileForm = () => {



    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const isTrue = location.state.showProfileMoadal || false
    
      

    
    
    const createProfilePic = useProfilePic();
    const createProfile = useCreateProfile();
    const createProfile_Cover_Pic = useCreateCoverPic();
    const [showModal, setShowModal] = useState(isTrue);
    const[showImageProfile, setshowImageProfile] = useState(null);
    const[showImageCover, setshowImageCover] = useState(null);
    const[showImageProfilefullInfo, setshowImageProfilefullInfo] = useState(null);
    const [showImageCoverfullInfo, setshowImageCoverfullInfo] = useState(null);
    const[skill, setSkill] = useState('');
    const[skills, setSkills] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    
    const imageshow = async()=>{
    const res = await showImgurl();
    

}

  useEffect(()=>{
    imageshow()

  },[])

   const handleRemoveSkill = (skill)=>{
     const updatedSkills = skills.filter((s) => s !== skill);
     setSkills(updatedSkills);

   }

   const imgProfiletoFormdata = async(profile_pic)=>{
    

    const formdata = new FormData();

    
    formdata.append("profile_picture", profile_pic[0]);

     try{
           const res = await createProfilePic.mutateAsync(formdata);
           
           return res

         }catch(err){
            

         }
    
   }

   const imgCoverProfiletoFormdata = async(cover_pic)=>{

    const formdata = new FormData();
    formdata.append("cover_picture", cover_pic[0]);

     try{
           const res = await createProfile_Cover_Pic.mutateAsync(formdata);
           
           return res

         }catch(err){
            
         }
   }
     

    const onsubmit = async(data) => {

        
         const profile_picture = showImageProfile
         const cover_picture = showImageCover

         const finalData = {
            ...data,
            profile_picture,
            cover_picture,
            skills:skills
         }

        // store profile picture in db
        
       
       

        //  store profile data in db
        try{
            
            const res = await createProfile.mutateAsync(finalData);
            
            navigate('/')
            return res
            
         }catch(err){
            
         }

         



        
         }





         const handleProfilePic = async(e) => {
            const file = e.target.files[0];
            const formdata = new FormData();
            formdata.append("profile_picture", file);
            const res = await createProfilePic.mutateAsync(formdata);
            
            
            const data = `https://job-portal-website-back-end.vercel.app/${res?.imageUrl}`
           
            setshowImageProfile(data);
            setshowImageProfilefullInfo(res);

            

            
            
            
         }

         

         const handleProfilePic_Cover_photo = async(e) => {
            const file = e.target.files[0];
            const formdata = new FormData();
            formdata.append("cover_picture", file);
            const res = await createProfile_Cover_Pic.mutateAsync(formdata);
            
            const data = `https://job-portal-website-back-end.vercel.app/${res?.imageUrl}`
            setshowImageCover(data);
            setshowImageCoverfullInfo(res);
            
            
         }
         
        
    const handleAddSkills = (e)=>{
        
        e.preventDefault();
        
        if (skill === '') return;
        if(!skill.trim()) return;
        const cleanedSkill = skill.replace(/\s+/g, ' ').trim();
        if(skills.includes(cleanedSkill)) return alert('You already added this skill');
        setSkills([...skills, skill]);
        setSkill('');
        
    }
    
    
    
       
     
   



    return (
        <div className="w-full  mx-auto bg-white shadow-lg  p-6">
    <h1 className="text-3xl font-bold mb-6">Profile Information</h1>

    <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">

        {/* Phone */}
        <div>
            <label className="block mb-2 font-medium">Phone Number</label>
            <input
                type="text"
                {...register("phone", { required: true })}
                placeholder="Enter your phone number"
                className="w-full border rounded-lg p-3 focus:outline-none"
            />
            {
                errors.phone && <span className="text-red-500">Phone number is required</span>
            }
        </div>

        {/* About */}
        <div>
            <label className="block mb-2 font-medium">About Me</label>
            <textarea
                {...register("about_me", { required: true })}
                rows={5}
                placeholder="Tell us about yourself..."
                className="w-full border rounded-lg p-3 resize-none focus:outline-none"
            />
            {
               errors.about && <span className="text-red-500">About is required</span>
                
            }
        </div>

        {/* Address */}
        <div>
            <label className="block mb-2 font-medium">Address</label>
            <input
                type="text"
                {...register("address", { required: true })}
                placeholder="Street address"
                className="w-full border rounded-lg p-3 focus:outline-none"
            />
            {
                errors.address && <span className="text-red-500">Address is required</span>
            }
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label className="block mb-2 font-medium">City</label>
                <input
                  {...register("city", { required: true })}
                    type="text"
                    placeholder="City"
                    className="w-full border rounded-lg p-3 focus:outline-none"
                />
                {
                    errors.city && <span className="text-red-500">City is required</span>
                }
            </div>

            <div>
                <label className="block mb-2 font-medium">State</label>
                <input
                    type="text"
                    {...register("state", { required: true })}
                    placeholder="State"
                    className="w-full border rounded-lg p-3 focus:outline-none"
                />
                {
                    errors.state && <span className="text-red-500">State is required</span>
                }
            </div>

            <div>
                <label className="block mb-2 font-medium">Country</label>
                <input
                    type="text"
                    {...register("country", { required: true })}
                    placeholder="Country"
                    className="w-full border rounded-lg p-3 focus:outline-none"
                />
                {
                    errors.country && <span className="text-red-500">Country is required</span>
                }
            </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block mb-2 font-medium">Profile Picture</label>
                <input
                    
                    type="file"
                    
                    onChange={handleProfilePic}
                    className="w-full border rounded-lg p-2"
                />
                {
                    errors.profile_picture && <span className="text-red-500">File is required</span>
                }
                <div className=''>
                    {
                        showImageProfile && <div className='shadow-lg p-3 flex items-center gap-2 rounded-lg'>
                            <div className='w-[10%]'><img className='w-7 h-7 object-cover rounded-full shadow-lg' src={showImageProfile} alt="profile" /></div>
                            <div className='w-[90%]'>
                                <p className='font-bold jetbrains text-[15px] '>{showImageProfilefullInfo?.orginialName}</p>
                                <p>{showImageProfilefullInfo?.size}</p>
                               
                            </div>
                        </div>
                    }
                </div>

            </div>

            <div>
                <label className="block mb-2 font-medium">Cover Picture</label>
                <input
                    type="file"
                    
                    onChange={handleProfilePic_Cover_photo}
                    className="w-full border rounded-lg p-2"
                />
                <div className=''>
                    {
                        showImageCover && <div className='shadow-lg p-3 flex items-center gap-2 rounded-lg'>
                            <div className='w-[10%]'><img className='w-7 h-7 object-cover rounded-full shadow-lg' src={showImageCover} alt="profile" /></div>
                            <div className='w-[90%]'>
                                <p className='font-bold jetbrains text-[15px]'>{showImageCoverfullInfo?.orginialName}</p>
                                <p>{showImageCoverfullInfo?.size}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>

        {/* Resume */}
        <div>
            <label className="block mb-2 font-medium">Resume</label>
            <input
                type="file"
                className="w-full border rounded-lg p-2"
            />
        </div>
        {/* skills */}
         <div className='relative'>
            <label className="block mb-2 font-medium">Skills</label>
            <div className='flex gap-2'>
                <input className='flex-1 min-w-0 border rounded-lg p-3 focus:outline-none' type="text" value={skill} onChange={(e) => setSkill(e.target.value)} />
                <button onClick={handleAddSkills} className='bg-blue-400 shrink-0 px-4 h-auto rounded-lg text-white font-bold p-3'>Add</button>
            </div>
            
        </div>
        <div className='flex gap-2 flex-wrap'>
            {
                skills && skills.map((skill, index) => (
                    <div key={index} className='flex items-center gap-2'>
                        <span className='inline-block p-3 bg-green-500 rounded-lg'>{skill}</span>
                        <button onClick={() => handleRemoveSkill(skill)} className='bg-red-400 w-50 h-auto rounded-lg text-white font-bold p-3'>Remove</button>
                    </div>
                ))
            }
        </div>


        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
                <label className="block mb-2 font-medium">GitHub</label>
                <input
                    {...register("github", { required: true })}
                    type="url"
                    placeholder="https://github.com/username"
                    className="w-full border rounded-lg p-3"
                />
                {errors?.github && <span className="text-red-500">Github is required</span>}
            </div>

            <div>
                <label className="block mb-2 font-medium">LinkedIn</label>
                <input
                    {...register("linkedin", { required: true })}
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    className="w-full border rounded-lg p-3"
                />
                 {errors?.linkedin && <span className="text-red-500">LinkedIn is required</span>}
            </div>

            <div>
                <label className="block mb-2 font-medium">Twitter</label>
                <input
                    {...register("twitter", { required: true })}
                    type="url"
                    placeholder="https://twitter.com/username"
                    className="w-full border rounded-lg p-3"
                />
                 {errors?.twitter && <span className="text-red-500">Twitter is required</span>}
            </div>

            <div>
                <label className="block mb-2 font-medium">Instagram</label>
                <input
                     {...register("instagram", { required: true })}
                    type="url"
                    placeholder="https://instagram.com/username"
                    className="w-full border rounded-lg p-3"
                />
                 {errors?.instagram && <span className="text-red-500">Instagram is required</span>}
            </div>

            <div>
                <label className="block mb-2 font-medium">Facebook</label>
                <input
                    type="url"
                    {...register("facebook", { required: true })}
                    placeholder="https://facebook.com/username"
                    className="w-full border rounded-lg p-3"
                />
                 {errors?.instagram && <span className="text-red-500">Facebook is required</span>}
            </div>

            <div>
                <label className="block mb-2 font-medium">Website</label>
                <input
                    type="url"
                    {...register("website", )}
                    placeholder="https://yourwebsite.com"
                    className="w-full border rounded-lg p-3"
                />
                 
                
            </div>

        </div>

        <div className="flex justify-end">
            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
                Save Profile
            </button>
        </div>

    </form>
    {
        showModal && <MuiModal open={open} handleOpen={handleOpen}   handleClose={handleClose} />
    }
</div>
    );
};

export default ProfileForm;
