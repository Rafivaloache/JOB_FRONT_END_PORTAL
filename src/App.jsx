import { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayOut from './LayOut/AuthLayOut'
import Register from './Components/Register-type/Register'
import Login from './Components/Login/Login'
import HomeLayOut from './HomeLayOut/HomeLayOut'
import Home from './Components/Home'
import CreateJobLayout from './LayOut/CreateJobLayout'
import CreateJob from './Components/Create-Job/CreateJob'
import JobInfo from './Components/Create-Job/JobInfo'
import ProtectRouter from './Components/ProtectedRoute/ProtectRouter'
import FindCategory from './Components/Category/FindCategory'
import DashBoardLayOut from './LayOut/DashBoardLayOut'
import BasicInfo from './Components/Basic-info/BasicInfo'
import Apply_jobs from './Components/Applied-jobs/Apply_jobs'
import FindJobSearch from './Components/Search_bar/findJobSearch'
import ProfileForm from './Components/Profile/ProfileForm'
import AdminLayOut from './LayOut/AdminLayOut'
import Overview from './Components/OverView/Overview'
import BreadCrumbs from './Components/BreadCrumbs'

import Jobs from './Components/Jobs'
import Users from './Components/User/Users'
import SuspendLayOut from './LayOut/SuspendLayOut'
import Suspend from './Components/Suspend/Suspend'
import NotFound from './Components/NotFound/NotFound'
import ContactMe from './Components/Contact/ContactMe'
import ContactLayOut from './LayOut/ContactLayOut'




function App() {
 

  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeLayOut/>} >
      <Route path="/" element={<Home/>} />
        
      </Route>
      <Route path='/auth'element={<AuthLayOut/>}>
      <Route path="/auth/register" element={<Register/>} />
      <Route path="/auth/login" element={<Login/>} />
      </Route>
      <Route path='/job' element={<CreateJobLayout/>}>
       <Route path='/job/create-job' element={<ProtectRouter><CreateJob/></ProtectRouter>}/>
       <Route path='/job/jobinfo/:id' element={<JobInfo/>}/>
       <Route path='/job/jobcategory'  element={<FindCategory/>}/>
       <Route path='/job/findjob' element={<FindJobSearch/>}/>
       <Route/>
      </Route>
      <Route path='/dashboard' element={<DashBoardLayOut/>}>

      <Route path="profile" element={<ProtectRouter><BasicInfo/></ProtectRouter>}/>
      <Route path="applied-jobs" element={<ProtectRouter><Apply_jobs/></ProtectRouter>}/>

     
       
     



      </Route>
      {/* normal layout */}
      <Route path='/form-fillup' element={<ProfileForm/>}>
      <Route path="/form-fillup/profileForm" element={<ProtectRouter><ProfileForm/></ProtectRouter>}/>
      </Route>
      <Route path='/admin' element={<ProtectRouter><AdminLayOut/></ProtectRouter>}>
      
      <Route path="overview" element={<ProtectRouter><Overview/></ProtectRouter>}/>
      <Route path="user" element={<ProtectRouter><Users/></ProtectRouter>}/>
      <Route path="jobs" element={<ProtectRouter><Jobs/></ProtectRouter>}/>
    


      </Route>
      {/* contact layout */}
      <Route path='/contact' element={<ContactLayOut/>}>
      <Route path="contact-me" element={<ContactMe/>}/>
      </Route>
       <Route path='/suspendletter' element={<SuspendLayOut/>}>
      <Route path="suspend" element={<ProtectRouter><Suspend/></ProtectRouter>}/>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
