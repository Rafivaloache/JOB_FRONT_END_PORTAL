import React, { useEffect, useState } from 'react';
import { filterSalaryJob, searchJob } from '../../ALlapi';
import Items from '../Item/Items';

const FindJobSearch = () => {
    
    const[search, setSearch] = useState('');

    const [store, setStore] = useState([]);
    const [showdefault, setShowDefault] = useState([]);
    const [filterSalary, setFilterSalary] = useState('');
    const [sortSalary, setSortSalary] = useState([]);
   

    // 'get-jobs'


    useEffect(()=>{
        
      fetch(`${import.meta.env.VITE_JOB_URL_REQUEST}/get-jobs`).then(res => res.json()).then(data => {
        
        setShowDefault(data?.jobs);
      });
      

    },[])
    
    const handleSearch = async () => {
    try {
        if (!search.trim()) {
            setStore([]);
            
            
            
            return;
        }

        const res = await searchJob(search);
        setStore(res?.data?.jobs ||[]);
        setSortSalary([]);
    } catch (err) {
        
    }
};


 const handleSort = async()=>{

   try{

   if(filterSalary){
     const res = await  filterSalaryJob(filterSalary);
    
    setSortSalary(res?.data?.jobs);
    
    setShowDefault([]);
   }else{
     fetch(`${import.meta.env.VITE_JOB_URL_REQUEST}/get-jobs`).then(res => res.json()).then(data => {
        
        setShowDefault(data?.jobs);
      });
      
      setSortSalary([]);
     
     
   }

   }catch(err){

    

   }

   

 }

    useEffect(()=>{

      

       

    handleSearch();
    

    },[ search])

   useEffect(()=>{
    handleSort();
   },[filterSalary])

    
     


    return (
        <div className='container mx-auto'>
           <div className='max-w-7xl mx-auto ml-3 mr-3 md:mr-0 md:ml-0 mt-9'>
              <input type="text" onChange={(e)=>setSearch(e.target.value)} placeholder='Search' className='w-full p-4 px-8 rounded-full bg-gray-500 focus:outline-none focus:placeholder:text-black focus:bg-white focus:shadow-md placeholder:text-white' />

           </div>

           <div>
             <select name="" onChange={(e)=>setFilterSalary(e.target.value)}  id="">
               <option value="htl">High to Low</option>
               <option value="lth">Low to High</option>
             </select>
           </div>

           <div>
             {/* {
               store?.map((job, index)=>{
                 return <Items key={index} job={job}/>
               })
              
             } */}

             {
                store.length === 0 ? sortSalary.length === 0 ? showdefault?.map((job, index)=>(<Items key={index} job={job}/>)) : sortSalary?.map((job, index)=>(<Items key={index} job={job}/>))  : store?.map((job, index)=>(<Items key={index} job={job}/>))
             }
             

             
             
            
             
           </div>
            
        </div>
    );
};

export default FindJobSearch;