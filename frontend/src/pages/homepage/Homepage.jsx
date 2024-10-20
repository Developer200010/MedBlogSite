import React, { useEffect, useState } from 'react'
import { Header } from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import "./homepage.css"
import axios from "axios"
const Homepage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPost = async() =>{
      const res = await axios.get("/api/post").then((data)=> console.log(data)).catch((error)=> console.log(error.message))
      console.log(res)
    }
    fetchPost()
  },[])
  return <>
    <Header/>
    <div className="home">
    <Posts/>
    <Sidebar/>
    </div>
    </>
}

export default Homepage