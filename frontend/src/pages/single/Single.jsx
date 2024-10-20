import React, { useEffect, useState } from 'react'
import SinglePost from "../../components/singlePost/SinglePost"
import Sidebar from '../../components/sidebar/Sidebar'
import "./single.css"
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Single() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [singlePostData,setSinglePostData] = useState({})
  useEffect(()=>{
    const getPost = async () =>{
      const res = await axios.get("/api/post/" + path);
      setSinglePostData(res.data)
    }
    getPost()
  },[path])
  return (
    <div className="single">
      <SinglePost data = {singlePostData} />
      <Sidebar />
    </div>
  );
}
