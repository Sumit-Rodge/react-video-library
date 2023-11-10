import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom";

export function AdminDashboard(){

    const [cookies,setCookie,removeCookie]=useCookies(['admin']);
    const [videos,setVideos]=useState([{VideoId:'',Title:'',Url:'',Likes:0,Comment:'',Category_Id:''}]);
    let navigate=useNavigate();

    function loadVideos(){
        axios.get('http://127.0.0.1:2200/videos')
        .then(response=>{
            setVideos(response.data)
        })
    }

    if(cookies['admin']===undefined){
        navigate('/adminlogin')
    }else{
        loadVideos();
    }
    return(
        <div className="container-fluid">
            <h3>{cookies['admin']} -- Admin Dashboard</h3>
            <Link to='/addvideos' className="btn btn-primary">Add Videos</Link>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Titel</th>
                        <th>Preview</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos.map(video =>{
                            return <tr key={video.VideoId}>

                                <td style={{height:'200px'}}>{video.Title}</td>

                                <td>
                                    <iframe src={video.Url} width='300' height="200"></iframe>
                                </td>

                                <td>
                                    <Link className="btn btn-warning bi bi-pen-fill me-2" to={`/editvideo/${video.VideoId}`}></Link>
                                    <Link className="btn btn-danger bi bi-trash-fill" to={`/deletevideo/${video.VideoId}`}></Link>
                                </td>
                                
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}