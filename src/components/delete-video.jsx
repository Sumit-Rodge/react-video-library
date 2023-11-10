import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";


export function DeleteVideo(){

    const [videos,setVideos]=useState([{VideoId:0,Title:'',Url:'',Likes:0,Comment:''}]);
    let params = useParams();
    let navigate = useNavigate()

    function deleteVideo(){
        axios.delete(`http://127.0.0.1:2200/deletevideo/${params.id}`);
        alert('video deleted');
        navigate('/admindashboard');
    }
    useEffect(()=>{
        axios.get(`http://127.0.0.1:2200/video/${params.id}`)
        .then(response =>{
            setVideos(response.data);
        })
    },[])
    return (
        <div className="contaier-fluid">
            <h3>Delete Video</h3>
            <div>
                <h4>{videos[0].Title}</h4>
                <iframe src={videos[0].Url} width='300' height='300'></iframe>
            </div>
            <p className="text-danger">Are you sure ?</p>
            <button onClick={deleteVideo} className="btn btn-danger me-2">Delete</button>
            <Link to='/admindashboard' className="btn btn-success" >Cancel</Link>
        </div>
    )
}