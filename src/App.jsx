

import { BrowserRouter,Link,Routes,Route, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { VideosMain } from './components/videos-main';
import { UserRegister } from './components/user-register';
import { UserLogin } from './components/user-login';
import {  UserDashboard } from './components/userdashboard';
import { useCookies } from 'react-cookie';
import { AdminLogin } from './components/admin-login';
import { AdminDashboard } from './components/admin-dashboard';
import { AddVideo } from './components/addvideo';
import { EditVideos } from './components/edit-video';
import { DeleteVideo } from './components/delete-video';


function LogOutComponent(){
  const [cookies,setCookie,removeCookie]=useCookies('userName')
  let navigate=useNavigate();

  function handleLogOut(){
    removeCookie('userName');
    navigate('/userlogin')
  }
  
  return (
    <button className='btn btn-light me-2' onClick={handleLogOut}>Log Out</button>
  )
}
function App() {


  const [cookies,setCookie,removeCookie]=useCookies(['userName'])
  
  return (
   <BrowserRouter>
     <div className='container-fluid bg-dark text-light' style={{height:"100vh"}}>
      <header className='p-2 d-flex justify-content-between'>
        <div>
          <span className="h3"><Link to='/' style={{color:'white' , textDecoration:'none'}}>Video Library</Link></span>
        </div>
        <div>
          {
            (cookies['userName']===undefined)? <Link to="/userlogin" className='btn btn-light me-2'>Login</Link> : <LogOutComponent/>
          }
         
          <Link to='/adminlogin' className='btn btn-light'><span className='bi bi-person-fill'>Admin Login</span></Link>
        </div>
      </header>
      <section>

          <Routes>
            <Route path="/" element={<VideosMain/>}></Route>
            <Route path="register" element={<UserRegister/>} />
            <Route path="userlogin" element={<UserLogin/>} />
            <Route path="userdashboard" element={<UserDashboard/>} />
            <Route path='adminlogin' element={<AdminLogin/>}/>
            <Route path='admindashboard' element={<AdminDashboard/>} />
            <Route path='addvideos' element={<AddVideo/>} />
            <Route path='editvideo/:id' element={<EditVideos/>} />
            <Route path='deletevideo/:id' element={<DeleteVideo/>} />
          </Routes>

      </section>
    </div>
   </BrowserRouter>
  );
}

export default App;
