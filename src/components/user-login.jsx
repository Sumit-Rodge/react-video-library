import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useCookies } from "react-cookie";

export function UserLogin(){

    const [users,setUsers]=useState([]);
    const [error,setError]=useState('');
    const [cookise,setCookie,removeCookie]=useCookies('userName');
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://127.0.0.1:2200/users')
        .then(response=>{
            setUsers(response.data);
        })
    },[])

    const formik = useFormik({
        initialValues:{
            Email:'',
            Password:''
        },
        onSubmit:(values)=>{
            var user = users.find( item => item.Email == values.Email);

            if(user.Password == values.Password){
                setCookie('userName',user.UserName)
                navigate('/userdashboard');
            }else{
                setError('Invalid Credentials')
            }
        }
    })

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <h3>User Login</h3>
            <form onSubmit={formik.handleSubmit}>

                <dl>
                    <dt>Email</dt>
                    <dd><input type="text" name="Email" onChange={formik.handleChange}/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange}/></dd>
                </dl>

                <button className="btn btn-primary">Login</button>
                <Link to="/register" className="btn btn-warning ms-3">New user?</Link>
               
            </form>
            <p className="text-danger">{error}</p>
        </div>
    )
}