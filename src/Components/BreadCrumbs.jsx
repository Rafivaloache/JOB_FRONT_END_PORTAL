
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { BsFillSuitcaseLgFill, BsPeopleFill } from 'react-icons/bs';
import { MdWindow } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumbs = () => {

    const location = useLocation();
    
      const navigation_data = [
        {
            name:"Overview",
            icon:<MdWindow/>,
            path:"overview"
    
    
        },
        {
            name:"Jobs",
            icon:<BsFillSuitcaseLgFill/>,
            path:"jobs"
    
        },
        {
            name:"User",
            icon:<BsPeopleFill/>,
            path:"user"
    
    
        },
        
    ]

    const currentPath = location.pathname;
    const currentNavigation = navigation_data.find(item => item.path === currentPath);
    return (
       <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
      <Link to="/" className="hover:text-white transition">
        Admin
      </Link>

      <ChevronRight size={14} className="text-gray-600" />

      <span className="text-white font-medium">
        {currentNavigation}
      </span>
    </nav>
    );
};

export default BreadCrumbs;