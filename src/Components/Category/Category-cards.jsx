import React, { useEffect } from 'react';
import { findJobCategory } from '../../ALlapi';
import { useNavigate } from 'react-router-dom';

const Category = ({item}) => {


    const navigate = useNavigate();

   const handleCategory = async(data)=>{
      const get_data = await findJobCategory(data);
      navigate('/job/jobcategory',{state:get_data?.data})
    
   }
 
    return (
        <div className='text-white relative ml-3 my-2'>
            <img className='text-white w-full md:w-[300px] rounded-lg h-full md:h-[300px]' src={item?.image} alt="this image" />

            <div className="context absolute bottom-0 left-1">
                <h1 onClick={()=>handleCategory(item?.name)} className='works font-bold'>{item?.name}</h1>
                <p>{item?.totalNumbers}</p>
            </div>


           
            
        </div>
    );
};

export default Category;