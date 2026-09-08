import React, { useEffect, useState } from 'react';
import { PiBagFill } from "react-icons/pi";
import { MdAttachMoney } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaCirclePlus, FaCircleXmark } from 'react-icons/fa6';
import { set, useForm } from 'react-hook-form';
import { useCreateJob } from '../../../Hook';
import Swal from 'sweetalert2';
import axios from 'axios';
import {  DotLottieReact } from '@lottiefiles/dotlottie-react';


const CreateJobForm = () => {

    const {register,handleSubmit, watch, formState:{errors}, setValue} = useForm();

    const [skills, setSkills] = useState([]);
    const [skill, setSkill] = useState('');
    const [overView, setOverView] = useState('');
    const [coreResponsibility, setCoreResponsibility] = useState('');
    const [loading, setLoading] = useState(false);
    const [generateKeyResponse, setgenerateKeyResponse] = useState('');
    const [loadingGenerateKey, setLoadingGenerateKey] = useState(false);

    const[generating, setGenerating] = useState(false);
    const createJobPost = useCreateJob();
    const[error, setError] = useState('');

    const generateCoreResponsibilities = async () => {

        setLoading(true);
        ("Hi i am generating core responsibilities");
        setCoreResponsibility('')
        try{
            const jobInfo = {
            title: watch("title"),
            company_name: watch("company_name"),
            job_category: watch("job_category"),
            type: watch("type"),
            location: watch("location"),
            level: watch("level"),
           
            skills: skills
        };  
        const response = await axios.post('https://job-portal-website-back-end.vercel.app/api/generate-AI-text/generate-core-responsibilities', jobInfo);
        setValue('core_responsibility', response.data.core_responsibility, {
            shouldDirty: true,
            shouldValidate: true
            
        });
        console.log(response?.data);
        setCoreResponsibility(response.data.core_responsibilities);
        if(response){
            setLoading(false);
        }

        
       

        

       

        }catch(err){
            console.log(err);
            setLoading(false);
            setError(err?.response?.data?.message);
            
        }
    }


    useEffect(()=>{





        

    },[coreResponsibility, overView])

    

    const handleAddSkills = (e) => {
        e.preventDefault();
        if (skill === '') return;
        if(skills.includes(skill)) return alert('You already added this skill`');
        setSkills([...skills, skill]);
        setSkill('');
    }


  


    // const generateCoreResponsibilities = async () => {
    //     ("Hi i am generating core responsibilities");
    //     setCoreResponsibility('')
    //     try{
    //         const jobInfo = {
    //         title: watch("title"),
    //         company_name: watch("company_name"),
    //         job_category: watch("job_category"),
    //         type: watch("type"),
    //         location: watch("location"),
    //         level: watch("level"),
           
    //         skills: skills
    //     };  
    //     const response = await axios.post('https://job-portal-website-back-end.vercel.app/api/generate-AI-text/generate-core-responsibilities', jobInfo);
    //     setValue('core_responsibility', response.data.core_responsibility, {
    //         shouldDirty: true,
    //         shouldValidate: true
            
    //     });

        
    //     setCoreResponsibility(response.data.core_responsibilities);   

        

       

    //     }catch(err){
            
    //     }
    // }


   

    const generateKeyResponsibilities = async () => {

        const jobInfo = {
            title: watch("title"),
            company_name: watch("company_name"),
            job_category: watch("job_category"),
            type: watch("type"),
            location: watch("location"),
            level: watch("level"),
           
            skills: skills
        };

        setLoadingGenerateKey(true);
        try{
             const res = await axios.post('https://job-portal-website-back-end.vercel.app/api/generate-AI-text/generate-key-responsibilities', jobInfo);
             setValue('key_responsibility', res.data.key_responsibilities, {
                shouldDirty: true,
                shouldValidate: true
             })
             console.log(res)
        if(res){
            
            
            setgenerateKeyResponse(res.data?.key_responsibilities);
            setLoadingGenerateKey(false);
        }
        }catch(err){
            console.log(err);
            console.log(err);
            setLoading(false);
            setError(err?.response?.data?.message);

        }

        
    }


    const generateTEXTwithAI = async () => {
        setGenerating(true);
        try{
            const jobInfo = {
            title: watch("title"),
            company_name: watch("company_name"),
            job_category: watch("job_category"),
            type: watch("type"),
            location: watch("location"),
            level: watch("level"),
           
            skills: skills
        };

        const response = await axios.post('https://job-portal-website-back-end.vercel.app/api/generate-AI-text/generate-text-job-overView', jobInfo);
        (response);
        setValue('job_overview', response.data.overview, {
                shouldDirty: true,
                shouldValidate: true
            }); 
        
        if(response){
            setGenerating(false);
        }
         

        setOverView(response.data.overview);    

        }catch(err){
            console.log(err);
            setLoading(false);
            setError(err?.response?.data?.message);
           
        }
    }

    const handleRemoveSkill =(skill)=>{
        if(skill === '') return;
        const updatedSkills = skills.filter((s) => s !== skill);
        setSkills(updatedSkills);
    }

    const onsubmit = async(data)=>{


       

         const {key_responsibility, core_responsibility} = data;
         

         const dota = key_responsibility.split('\n');
         

         const lento = core_responsibility.split('\n');
         

        const jobData = {
            ...data,
            skills,
            key_responsibility:dota,
            core_responsibility:lento
        }

        
        try{
             const res = await  createJobPost.mutateAsync(jobData);
             

        }catch(err){
            
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "<a href=\"#\">Why do I have this issue?</a>"
});
        }

        
       

        
        
    }



    
    return (
        <form action=""className='container mx-auto' onSubmit={handleSubmit(onsubmit)}>
        <div className='rounded-lg bg-white inter'>
            <div className='flex gap-4 w-full  items-center shadow-lg p-3'>
                <div className='w-[10%] flex justify-center'>
                    <PiBagFill size={43} />
                </div>
                <div className=' w-[70%]'>
                    <h1 className='text-2xl font-bold'>Basic Information</h1>
                    <p>Standard job identity details that will appear at the top of the listing.</p>
                    
                    <div className='flex flex-wrap  gap-5'>
                     <div className='w-1/2'>
                        <label htmlFor="">Job title</label>
                        <br />

                        <input type="text" {...register("title")} className='w-full p-3 border-gray-300 border-2' placeholder="company name"  />
                    </div>
                    <div className='w-1/2'>
                        <label htmlFor="">Company Name</label>
                        <br />
                        <input type="text" {...register("company_name")} placeholder="" className='w-full p-3 border-gray-300 border-2' />

                    </div>
                     <div className='w-1/2'>
                        <label htmlFor="">Company location</label>
                        <br />
                        <input type="text" {...register("company_location")} placeholder="" className='w-full p-3 border-gray-300 border-2' />

                    </div>
                     <div className='w-1/2'>
                        <label htmlFor="">Company logo</label>
                        <br />
                        <input type="text" {...register("company_logo")} placeholder="" className='w-full p-3 border-gray-300 border-2' />

                    </div>
                     <div className='w-1/2'>
                        <label htmlFor="">Job Category</label>
                        
                        <br />

                        <select {...register("job_category")} className='w-full p-3 border-2 border-gray-500' id="">
                            <option value="healthcare">Healthcare</option>
                            <option value="technology">Technology</option>
                            <option value="buissness&Management">Business & Management</option>
                            <option value="marketing">Marketing & Sales</option>
                            <option value="retail">Retail & Customer Service</option>
                            <option value="design">Design</option>
                            
                        </select>
                        

                    </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='w-[33%]'>
                            <label htmlFor="type">Employee type</label>
                            <br />
                            <select {...register("type")} id='type' className='w-full p-3 border-gray-300 border-2'>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                                <option value="freelance">Freelance</option>
                            </select>
                        </div>
                         <div className='w-[33%]'>
                            <label htmlFor="location">Location/Remote Status</label>
                            <br />
                           <select className='w-full p-3 border-2 border-gray-200' id="location" {...register("location")}>
                             <option value="hybride">Hybride</option>
                             <option value="onsite">Onsite</option>
                             <option value="remote">Remote</option>
                           </select>
                        </div>
                         <div className='w-[33%]'>
                            <label htmlFor="">Experience level</label>
                            <br />
                            <select {...register("level")} className='w-full p-3 border-2 border-gray-500' name="" id="">
                                <option value="intermediate">Intermediate</option>
                                <option value="fresher">Fresher</option>
                                <option value="intermediate">Advanced</option>
                            </select>
                            
                            
                        </div>

                    </div>
{/* compensation & timeline */}
                  
              
                </div>
               
            </div>
              <div className='flex  gap-5 bg-white'>
                       <div className='w-[10%] flex justify-center'>
                        <MdAttachMoney size={43} />
                       </div>
                       <div className='w-[70%]'>
                         <h1>Compensation & Timeline</h1>
                         <p>Salary ranges and application deadlines help candidates filter effectively</p>
                         <div className='flex gap-2'>
                         <div className='w-1/2'>
                        <label htmlFor="">Salary Range (Annual USD)</label>
                        <br />
                        <div className='flex gap-2 items-center'>
                         <input  type="text" {...register("min_salary")} placeholder='$Min' className='w-[50%] p-3 border-gray-300 border-2' /> - 
                        <input type="text" {...register("max_salary")} placeholder='$Max' className='w-[50%] p-3 border-gray-300 border-2' />
                        </div>
                       </div>
                       <div className='w-1/2'>
                        <label htmlFor="">Application Deadline</label>
                        <br />
                        <input type="datetime-local"{...register("deadline")} className='w-full p-3 border-gray-300 border-2' />
                       </div>
                         </div>
                       </div>

                       


                    </div>

              <div className='flex gap-5'>
                <div className='w-[10%] flex justify-center'>
                    <IoMdTime size={43}/>
                </div>
                <div className='w-[70%]'>
                    <h1>Role Description</h1>
                    <p>Define the day-to-day impact and the skills needed to succeed.</p>

                    <div className='relative'>
                        <label htmlFor="overview">Job Overview</label>
                        <br />
                        <textarea value={overView} {...register("job_overview")} className='border-2 p-3 w-full h-[300px] resize-none rounded-lg'  id="overview"></textarea>
                        <button
                        type="button"
                        onClick={generateTEXTwithAI}
                        disabled={generating}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                        >

                        {
                            generating && <div className='absolute left-23 top-0'>
                                   <DotLottieReact src='/loading.lottie'
                                    autoplay
                                    loop
                                    style={{ width: '250px', height: '250px' }}
                                    
                                    />
                                   
                                </div>
                        } 

                        {
                            error && <div className='absolute left-23 top-0'>
                                   <DotLottieReact src='/Stressed Woman at work.lottie'
                                    autoplay
                                    loop
                                    style={{ width: '250px', height: '250px' }}
                                    
                                    />
                                    <p className='text-red-600 font-bold'>Sorry for your loss</p>
                                   
                                </div>
                        }
                            
                          {generating
                                ? "✨ Generating..."
                                : "✨ Generate with AI"
                            }
                        </button>
                    </div>
                    <div className='flex gap-2'>
                        <div className='w-1/2 '>
                            <label htmlFor="">Core Responsibilities</label>
                            <br />
                             <div className='relative'>
                                 <textarea value={coreResponsibility} {...register("core_responsibility")} className='border-2 resize-none w-full rounded-lg p-3 h-[300px]' id="">
                               
                                </textarea>
                                {
                                    loading && <div className='absolute left-23 top-0'>
                                   <DotLottieReact src='/loading.lottie'
                                    autoplay
                                    loop
                                    style={{ width: '250px', height: '250px' }}
                                    
                                    />
                                   
                                </div>
                                }
                                 {
                            error && <div className='absolute left-23 top-0'>
                                   <DotLottieReact src='/Stressed Woman at work.lottie'
                                    autoplay
                                    loop
                                    style={{ width: '250px', height: '250px' }}
                                    
                                    />
                                     <p className='text-red-600 font-bold'>Sorry for your loss</p>
                                   
                                </div>
                        }
                                
                             </div>
                             
                            <button
                            type="button"
                            onClick={generateCoreResponsibilities}
                            disabled={generating}
                            className="bg-red-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                            >
                            
                          {generating
                                ? "✨ Generating..."
                                : "✨ Generate with AI"
                            }
                        </button>
                        </div>
                           <div className='w-1/2  '>

                             <label htmlFor="keyResponsible">Key Responsibilities</label>
                             <br />

                            <div className='relative'>
                                <textarea {...register("key_responsibility")} className='border-2 resize-none rounded-lg p-3 w-full h-[300px]'  id="keyResponsible" ></textarea>


                              {
                                loadingGenerateKey && <div className='absolute left-23 top-0'>
                                   <DotLottieReact src='/loading.lottie'
                                    autoplay
                                    loop
                                    style={{ width: '250px', height: '250px' }}
                                    
                                    />
                                   
                                </div>
                              }  
                               {
                                   error && <div className='absolute left-23 top-0'>
                                   <DotLottieReact src='/Stressed Woman at work.lottie'
                                    autoplay
                                    loop
                                    style={{ width: '250px', height: '250px' }}
                                    
                                    />
                                     <p className='text-red-600 font-bold'>Sorry for your loss</p>
                                   
                                </div>
                        } 
                             
                            <button
                            type="button"
                            onClick={generateKeyResponsibilities}
                            disabled={generating}
                            className="bg-red-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                            >Generate with AI
                            </button>                           

                            </div>


                        </div>

                             
                        
                    </div>
                    <div className='my-12 relative'>
                        <h1 className=''>Tags & Required Skills</h1>
                        <p>Add up to 10 keywords to help candidates find this job.</p>
                        <input type="text" value={skill} onChange={(e)=>setSkill(e.target.value)}  className='w-full p-3 border-gray-500 border-2 ' />
                        <div className='absolute top-[65px] right-[11px] '>
                            <FaCirclePlus onClick={handleAddSkills} />
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap'>
                        {
                        skills?.map(skill => (<div className='flex gap-2 items-center'>
                            <p className='inline-block p-3 bg-green-500'>{skill}</p>
                            <FaCircleXmark onClick={() => handleRemoveSkill(skill)} />
                        </div>))
                    }
                    </div>
                     <button type='submit' className='w-[170px] h-auto bg-purple-600 text-white p-3'>Submit</button>
                </div>
                



                  
             </div> 
                  


             
        </div>

       
        </form>
    );
};

export default CreateJobForm;