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
      await axios.get("/api/post").then((data)=> setPosts(data.data)).catch((error)=> console.log(error.message))
      // setPosts(res.data)
    }
    fetchPost()
  },[])
  return <>
    <Header/>
    <div className="home">
    <Posts posts = {posts}/>
    <Sidebar/>
    </div>
    </>
}

export default Homepage