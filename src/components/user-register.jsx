
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router";
import { UserLogin } from "./user-login";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react"

export function UserRegister(){

    const [users,setUsers] = useState('');
    const [userError,setUserError]=useState('');
    const [emailError,setEmailError]=useState('');

    useEffect(()=>{
        axios.get('http://127.0.0.1:2200/users')
        .then( user=>{
            setUsers(user.data);
        })
    },[])

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            UserId:'',
            UserName:'',
            Password:'',
            Email:'',
            Mobile:''
        },
        onSubmit:(user)=>{
      
        axios.post('http://127.0.0.1:2200/adduser', user);
        alert("Registed Successfully");
        navigate('/userlogin');
    }
    })

    function VerifyUser(e){
        for(var user of users){
            if(user.UserId==e.target.value){
                setUserError('User Id already taken -- try another.');
                break;
            }else{
                setUserError('User Id available')
            }
        }
    }

    function VerifyEmail(e){
        for(var user of users){
            if(user.Email == e.target.value){
                
                setEmailError('Email already registed - try loggin in.');
                break;
            }else{
                setEmailError('');
            }
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <h3>Register to continue</h3>
            <form onSubmit={formik.handleSubmit} >
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onKeyUp={VerifyUser} name="UserId" onChange={formik.handleChange}/></dd>
                    <p>{userError}</p>

                    <dt>User Name</dt>
                    <dd><input type="text" name="UserName" onChange={formik.handleChange}/></dd>

                    <dt>Passoword</dt>
                    <dd>
                        <input type="password" name="Password" onChange={formik.handleChange}/>
                    </dd>

                    <dt>Email</dt>
                    <dd><input onKeyUp={VerifyEmail} type="text" name="Email" onChange={formik.handleChange}/></dd>
                    <p  className="text-danger">{emailError}</p>

                    <dt>Mobile</dt>
                    <dd><input type="text" name="Mobile" onChange={formik.handleChange}/></dd>
                </dl>
                <button className="btn btn-primary">Register</button>
                <Link to='/userlogin' className="btn btn-success ms-4">Login</Link>
            </form>
        </div>
    )
}