import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

export function AddVideo(){

    const [categories,setCategories]=useState([{Category_id:0,CategoryName:''}]);
    let navigate=useNavigate();
    let formik = useFormik({
        initialValues:{
            VideoId:'',
            Title:'',
            Url:'',
            Likes:0,
            Comment:''
        },
        onSubmit:(values)=>{
            axios.post('http://127.0.0.1:2200/addvideo',values);
            console.log(values);
            alert('video added');
            // navigate('/admindashboard')
        }
    })

    function loadCategories(){
        axios.get('http://127.0.0.1:2200/categories')
        .then(response=>{
            response.data.unshift({Category_id:-1,CategoryName:'select category'})
            setCategories(response.data);
        })
    }

    useEffect(()=>{
        loadCategories();
    },[])

    return (
        <div className="container d-flex justify-content-center align-items-center flex-column">
            <h3>Add Video Details</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type='text' name='VideoId' onChange={formik.handleChange}/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" name="Title" onChange={formik.handleChange}/></dd>
                    <dt>Url</dt>
                    <dd><input type="text" name="Url" onChange={formik.handleChange}/></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" name="Likes" onChange={formik.handleChange} /></dd>
                    <dt>Comments</dt>
                    <dd><input type="text" name='Comment' onChange={formik.handleChange}/></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="Category_id" onChange={formik.handleChange} >
                            {
                                categories.map(category=>
                                    <option key={category.Category_id} value={category.Category_id}>
                                        {category.CategoryName.toUpperCase()}
                                    </option>    
                                )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}