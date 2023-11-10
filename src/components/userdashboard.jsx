import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router";

export function UserDashboard(){

    const [cookies,setCookie,removeCookie]=useCookies('userName');
    const [videos,setVideos]=useState([{
        VideoId:"",
        Url:"",
        Title:'',
        Likes:0,
        Comment:'',
        Category_Id:''
    }]);

    let navigate=useNavigate();

    function loadVideos(){
        axios.get('http://127.0.0.1:2200/videos')
        .then(response =>{
            setVideos(response.data)
            console.log(videos);
        })
    }
    useEffect(()=>{
        if(cookies['userName']===undefined){
            navigate('/userlogin');
        }else{
            loadVideos();
        }
    },[])

    return (
        <div className="container-fluid">
           
            <h3>{cookies['userName']}- Dashboard </h3>

            <section className='d-flex flex-wrap bg-dark'>
                {
                    videos.map( video =>{
                        return <div key={video.VideoId} className="card p-2 m-2 bg-dark" style={{width:'500px'}}>
                           
                            <div className='card-body'>
                                <iframe src={video.Url} width="100%" height="500"></iframe>
                            </div>
                            <div className="card-header">
                                <h1 className='text-white' style={{height:'150px'}}>{video.Title}</h1>
                            </div>
                            <div className="card-footer">
                                <p className="bi bi-hand-thumbs-up text-white">{video.Likes}</p>
                                <div className="form-label fw-bold">
                                    <p className="text-white">{video.Comment}</p>
                                </div>
                            </div>
                        </div>
                    })
                }
            </section>
             
        </div>
    )
}