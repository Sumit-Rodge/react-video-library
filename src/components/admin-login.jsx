import axios from "axios";
import { useFormik } from "formik";
import { useEffect,useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

export function AdminLogin(){

    const [admins,setAdmins]=useState([]);
    const [cookies,setCookies,removeCookie]=useCookies(['admin'])
    const [error,setError]=useState('');
    let navigate = useNavigate();

    let formik = useFormik({
        initialValues:{
            "UserId":'',
            "Password":''
        },
        onSubmit:(values)=>{
            const admin = admins.find(item => values.UserId === item.UserId);

            (admin===undefined)?setError('invalid credentails -- try again'):setError('');
            
            if(admin.Password===values.Password){
                setCookies('admin',values.UserId);
                navigate('/admindashboard')
            }else{
                setError('Invalid Credentials -- try again')
            }
        }
    })


    useEffect(()=>{
        axios.get('http://127.0.0.1:2200/admin')
        .then(response =>{
            setAdmins(response.data);
        })
    },[])

    return(
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type='text' name="UserId" onChange={formik.handleChange}/></dd>
                    <dt>Password</dt>
                    <dd><input type='password' name="Password" onChange={formik.handleChange}/></dd>
                </dl>
                <button className="btn btn-primary">Log-In</button>
                <p className="text-danger">{error}</p>
            </form>
        </div>
    )
}