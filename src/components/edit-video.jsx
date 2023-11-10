import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

export function EditVideos(){

    const [videos,setVideos]=useState([{}]);
    const [categories,setCategories]= useState([{Category_id:0,CategoryName:''}]);
    let navigate = useNavigate();
    let params = useParams();

    let formik = useFormik({
        initialValues:{
            VideoId:videos[0].VideoId,
            Title:videos[0].Title,
            Likes:videos[0].Likes,
            Comments:videos[0].Comments,
            Category_id:videos[0].Category_id,
            Url:videos[0].Url
        },
        enableReinitialize:true,
        onSubmit:(values)=>{
            axios.put(`http://127.0.0.1:2200/editvideo/${params.id}`,values )
            
            alert('updated')
            navigate('/admindashboard')
        }
       
    })

    function loadCategories(){
        axios.get('http://127.0.0.1:2200/categories')
        .then(response =>{
            // console.log(response.data)
            setCategories(response.data)
        })
    }
    useEffect(()=>{
        // console.log(`parameter: ${params.id}`)
        axios.get(`http://127.0.0.1:2200/video/${params.id}`)
        .then(response =>{
            setVideos(response.data)
            
        })
        loadCategories();
    },[])

    return (
        <div>
            <h3>Edit Details</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="text" name='VideoId' onChange={formik.handleChange} value={formik.values.VideoId}/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" name='Title' onChange={formik.handleChange} value={formik.values.Title} /></dd>
                    <dt>Url</dt>
                    <dd><input type="text"  name='Url' onChange={formik.handleChange} value={formik.values.Url} /></dd>
                    <dt>Likes</dt>
                    <dd><input type="text" name='Likes'  onChange={formik.handleChange} value={formik.values.Likes} /></dd>
                    <dt>Comments</dt>
                    <dd><input type="text" name="Comments" onChange={formik.handleChange} value={formik.values.Comments} /></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name='Category_id' key={videos[0].Category_id} onChange={formik.handleChange}>
                            {
                                
                                categories.map(category =>{
                                    return <option value={formik.values.Category_id}>{category.CategoryName}</option>
                            })
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-success me-2">Save</button>
                <Link to='/admindashboard' className='btn btn-danger'> Cancel</Link>
            </form>
        </div>
    )
}