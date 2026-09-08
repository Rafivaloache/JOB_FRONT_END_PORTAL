import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApplyJob, useGetJob } from '../../../Hook';
import { IoBag, IoLocation, IoTimeSharp } from 'react-icons/io5';
import { MdAttachMoney } from 'react-icons/md';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FaCheck } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { set, useForm } from 'react-hook-form';






const btn = {
  backgroundColor: '#0c9488',
  color: 'white',
  border: '1px solid black',
  width: '150px',
  height: 'auto',
  padding: '10px',
  fontFamily: 'inter',
  textTransform: 'capitalize',

}




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '92%',
  maxWidth: 700,
  maxHeight: '90vh',
  overflowY: 'auto',
  backgroundColor: 'black',
  color: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const styleforApply = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '92%',
  maxWidth: 600,
  maxHeight: '90vh',
  overflowY: 'auto',
  backgroundColor: 'black',
  color: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
}

const styleFordeatails ={
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '92%',
  maxWidth: 600,
  maxHeight: '90vh',
  overflowY: 'auto',
  backgroundColor: 'black',
  color: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
}


const JobInfo = () => {
  const { id } = useParams();

  const {register, handleSubmit, watch} = useForm();
 
  const { data, isLoading } = useGetJob(id);
  const [open, setOpen] = useState(false);
  let [count, setCount] = useState(1);
  const [openApply, setOpenApply] = useState(false);
  const [personalbar, setPersonal] = useState('');
  const [documentbar, setDocument] = useState('');
  const [details, setDetails] = useState('');
  const [opendoc, setOpenDoc] = useState(false);
  const [opendetails, setOpenDetails] = useState(false);
  const applyjobs = useApplyJob(id);


  if(isLoading){
     return <div>Loading...</div>
  }

 
  const values = watch();

  let disable = !values.name || !values.email || !values.linkedin || !values.phone || !values.portfolio

  

 

  const handleClose = () => setOpen(false);
  const handleOpen = async() => {
    
    setOpen(true);
    

  };

 
  


  const handleOpendoc = () => setOpenDoc(true);       
 

  




  const handleBack = ()=>{
    handleCloseDoc();
    handleOpenApply();
  }

   const handleCloseApply = () => {

  

    setOpenApply(false);

  };

  const handleOpendetails = () => {
    handleCloseApply();
    setOpenDetails(true);
  }
  

  const onsubmit = (data)=>{
    
    
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const linkedin = data.linkedin;
    const portfolio = data.portfolio;
   

    if(name && email && phone && linkedin && portfolio){
      
      const next = count + 1;
      
       setCount(next);
       if(count === 1){
         setPersonal('personal')
         handleCloseApply();
         handleOpendoc()
       }


      

      if(count ===2){
       
        
        setDocument('document')
        handleCloseDoc();
        handleOpendetails()
      }

     
      
      
     
    


    }


      //  if(count ===2){
      //   disable= !values.resume || !values.coverletter
        
      //   setDocument('document')
      //   handleCloseDoc();
      //   handleOpendetails()
      // }
      
   
    

    

  }







  const handleOpenApply = () => {
    handleClose();
    setOpenApply(true);
  };
 








  const handleCloseDoc = () => {
    setOpenDoc(false);

  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const next = count + 1;
  //   setCount(next);
  //   setCount(next);
  //   if (count === 1) {
  //     setPersonal('personal')

  //   }
  //   if (count === 2) {
  //     setDocument('document')
  //   }
  //   if (count === 3) {
  //     setDetails('details')
  //   }
  //   handleCloseApply();
  //   setOpenDoc(true)

  // }




  // const handleContinuetoSubmit = ()=>{
  //   handleCloseApply();
  //   const next = count + 1;
  //   setCount(next);
  //   setCount(next);
  //   if(count===1){
  //     setPersonal('personal')

  //   }
  //   if(count===2){
  //     setDocument('document')
  //   }
  //   if(count===3){
  //     setDetails('details')
  //   }

  //   handleCloseDoc();



  // }

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    
    handleCloseApply();
    const next = count + 1;
    setCount(next);
    setCount(next);
   
    if (count === 2) {
      setDocument('document')
    }
    

    handleCloseDoc();

    setOpenDetails(true)
    







  }

  


  const handleSubmitALL = async(e)=>{
    e.preventDefault()

    if(count === 3){
       setDetails('details')
       setCount(1)
    }

    try{
      const res = await applyjobs.mutateAsync({
        job_id:data?.data?.job?._id
      })
     
      

    }catch(err){
      

    }
    handleCloseDetails()
    

  }


  const handleCloseDetails =()=>{
     setOpenDetails(false)
  }

  const handleApply = async()=>{
    await  applyjobs.mutateAsync({
      job_id:data?.data?.job?._id
      
    })

  }





  return (
    <div className='container mx-auto  bg-[#24262a] p-3'>
      <div className='shadow-lg flex flex-col sm:flex-row  gap-3'>
        <div>
          <img className='w-13 h-13 rounded-full shadow-lg' src={data?.data?.job?.company_logo} alt="" />
        </div>
        <div className='flex flex-col md:flex-row w-full justify-between md:items-center gap-3'>
          <div className='w-full md:w-[50%] '>
            <h1 className='works text-[24px] md:text-[32px] font-bold text-white'>{data?.data?.job?.title}</h1>
            <div className='flex flex-wrap gap-2'>
              <p className='font-bold text-white'>{data?.data?.job?.job_category}</p>
              <p className='flex items-center text-white gap-2'><IoLocation /> {data?.data?.job?.company_location}</p>

            </div>
            <div>
              <p className='font-extralight text-[#108a7f]'>{data?.data?.job?.type}</p>
            </div>
          </div>
          <div className='flex flex-wrap justify-start md:justify-end gap-2 w-full md:w-1/2 '>
            <button className='bg-[#1d1f23] p-3  w-[150px] h-auto shadow-lg rounded-lg text-white'>Save Job</button>
            <Button sx={btn} onClick={()=>handleApply(data?.data?.job?._id)}>Apply </Button>
          </div>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row gap-3 text-white my-3'>
        {/* salary table */}
        <div className='flex rounded-lg w-full sm:w-1/3  items-center gap-3 bg-[#2b2d31] p-4'>
          <div>
            <MdAttachMoney size={40} />
          </div>

          <div className=''>
            <p className='font-bold jetbrains text-[12px]'>Salary</p>
            <p className='inter font-bold text-white text-[16px]'>{data?.data?.job?.min_salary}</p>
            <p className='inter font-bold text-white text-[16px]'>-</p>
            <p className='inter font-bold text-white text-[16px]'>{data?.data?.job?.max_salary}</p>
          </div>
        </div>
        {/* level table */}
        <div className='flex w-full sm:w-1/3  items-center rounded-lg gap-3  bg-[#2b2d31] p-4'>
          <div>
            <IoBag size={40} />
          </div>
          <div>
            <h1 className='font-bold jetbrains text-[12px]'>Level</h1>
            <p>{data?.data?.job?.level}</p>
          </div>
        </div>
        {/* experience table */}
        <div className='flex w-full sm:w-1/3 items-center gap-3 rounded-lg bg-[#2b2d31] p-4'>
          <div>
            <IoTimeSharp size={40} />

          </div>
          <div>
            <h1 className='font-bold jetbrains text-[12px]'>Experience</h1>
            <p>{data?.data?.job?.level}</p>
          </div>
        </div>

      </div>
      {/* job overview  */}
      <div className='bg-white p-3 rounded-lg'>

        <h1 className='works font-bold '>Job Overview</h1>
        <p className='text-justify'>{data?.data?.job?.job_overview}</p>




      </div>

      {/* adding skills */}
      <div className='my-3'>
        <h1><span className='works font-bold text-[20px] text-white '>Skills:</span>{data?.data?.job?.skills.map((item, index) => <span className='text-[14px] text-white inter font-extralight inline-block ml-4 p-3 rounded-full border-white border' key={index}>{item}</span>)}</h1>
      </div>

      {/* core responsibilites */}
      <div className=' my-3'>

        <h1 className='works font-bold ml-3 text-[20px] text-white'>Core Responsibilities:</h1>
        <ul className='ml-3 space-y-5'>
          {data?.data?.job?.core_responsibility?.map((item, index) => <li className='text-[14px] text-white inter font-extralight ' key={index}>{item}</li>)}
        </ul>



      </div>

      {/* key responsibilities */}
      <div>
        <h1 className='works font-bold ml-3 text-[20px] text-white'>Key Responsibilities:</h1>
        <ul className='ml-3 space-y-5'>
          {data?.data?.job?.key_responsibility?.map((item, index) => <li className='text-[14px] text-white inter font-extralight ' key={index}>{item}</li>)}
        </ul>

      </div>







    </div>
  );
};

export default JobInfo;