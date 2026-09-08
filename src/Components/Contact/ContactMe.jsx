
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import Swal from "sweetalert2";


const ContactUs = () => {
  
  const {register,handleSubmit} = useForm();

  const[timeStop, setTimestop] = useState(false);


  useEffect(()=>{
     if(timeStop){
             const timer = setTimeout(()=>{
                setTimestop(true)
             },6000)
             return ()=> clearTimeout(timer)
         }
     
         

  },[timeStop])
  


  const onsubmit = async(data) => {
    

    setTimestop(true);
    try{

        
        const res = await axios.post('https://job-portal-website-back-end.vercel.app/send-email',data);

        


         
        
         
           Swal.fire({
           position: "center",
           icon: "success",
           title: res?.data?.message,
           showConfirmButton: false,
           timer: 1500
           });

      
        setTimestop(false)
         
    
        
        return res;


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
    <section className="min-h-screen bg-[#080B10] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-blue-500">
            Get In Touch
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
            Have a question about jobs, applications, or your account?
            We're here to help. Send us a message and our team will get
            back to you.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid overflow-hidden rounded-2xl border border-gray-800 bg-[#0D1117] shadow-2xl lg:grid-cols-[0.8fr_1.2fr]">

          {/* Left Side */}
          <div className="border-b border-gray-800 p-7 sm:p-10 lg:border-b-0 lg:border-r">
            <h2 className="text-2xl font-semibold">
              Let's talk
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Whether you're a job seeker looking for your next opportunity
              or a recruiter looking for great talent, feel free to reach out.
            </p>

            {/* Contact Information */}
            <div className="mt-10 space-y-7">

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <FiMail size={20}  />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-300">
                    Email
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    support@jobportal.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <FiPhone size={20} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-300">
                    Phone
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    +880 1234 567890
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <FiMapPin size={20} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-300">
                    Office
                  </p>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Chattogram, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="mt-12 rounded-xl border border-gray-800 bg-[#10151C] p-5">
              <p className="text-sm leading-6 text-gray-400">
                Looking for a job? Explore our latest opportunities and
                find a position that matches your skills.
              </p>

              <button
                type="button"
                className="mt-4 text-sm font-medium text-blue-500 transition hover:text-blue-400"
              >
                Explore Jobs →
              </button>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-7 sm:p-10">

            <h2 className="text-2xl font-semibold">
              Send us a message
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Fill out the form below and we'll get back to you.
            </p>

            <form onSubmit={handleSubmit(onsubmit)} className="mt-8 space-y-6">

              {/* Name + Email */}
              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Full Name
                  </label>

                  <input
                    type="text"
                    {...register('fullname')}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-gray-800 bg-[#080B10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register('email')}
                    className="w-full rounded-lg border border-gray-800 bg-[#080B10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
                  />
                </div>

              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="What can we help you with?"
                  {...register('subject')}
                  className="w-full rounded-lg border border-gray-800 bg-[#080B10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Reason for Contact
                </label>

                <select {...register('category')}
                  className="w-full rounded-lg border border-gray-800 bg-[#080B10] px-4 py-3 text-sm text-gray-400 outline-none transition focus:border-blue-500"
                >
                  <option value="">Select a reason</option>
                  <option value="job-seeker">Job Seeker Support</option>
                  <option value="recruiter">Recruiter Support</option>
                  <option value="account">Account Issue</option>
                  <option value="technical">Technical Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Message
                </label>

                <textarea
                  {...register('message')}
                  rows="6"
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-lg border border-gray-800 bg-[#080B10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
                />
              </div>

              {/* Submit */}
              {
                timeStop===true ? <>

                <div>
                     <button
                
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-[0.99]"
                  >
                 
                 <CircularProgress color="orange" size="1rem" aria-label="Loading…" />
              </button>
                </div>
                 
                </> : <>
                <button
                
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-[0.99]"
              >
                <FiSend size={17} />
                Send Message
              </button>
                </>
              }

              <p className="text-center text-xs text-gray-600">
                We usually respond within 24–48 hours.
              </p>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

