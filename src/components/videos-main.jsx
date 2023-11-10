
import { BrowserRouter,Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';


export function VideosMain(){

    const [userEmail,setUserEmail]=useState('');
    const [users,setUsers]=useState([]);
    const [userError,setUserError]=useState('');
  
    useEffect(()=>{
      axios.get('http://127.0.0.1:2200/users')
      .then(response=>{
        setUsers(response.data)
      })
    },[])
  
    function Register(){
      return (
        <div className='btn btn-light mt-3'>
          <Link to="/register" className='text-danger'>Account not found -- please register</Link>
        </div>
      )
    }
  
    function handleEmailChange(e){
      setUserEmail(e.target.value);
    }
  
    function handleGetStartedClick(){
      let user = users.find( item => item.Email == userEmail);
      console.log(user);
      if(user==undefined){
          setUserError(<Register/>)
      }else{
        setUserError('')
      }
    }

    return (
        <div className='bg-dark'>
            <main className='mt-4 d-flex justify-content-center '>
                <div>
                <h1 className='text-center'>Watch videos anywhere</h1>
                <p className="text-center">please register for more technology videos</p>
                <div className='input-group'>
                    <input onChange={handleEmailChange} type="text" className="form-control" placeholder='your email id' />
                    <Button onClick={handleGetStartedClick} variant='contained' size='large'  color="error" >Get Started</Button>
                </div>
                <p >{userError}</p>
                </div>
            </main>
        </div>
    )
}