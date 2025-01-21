import React, { useEffect, useState } from 'react'
import { Header } from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import "./homepage.css"
import axios from "axios"
import { useLocation } from 'react-router-dom'
const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  useEffect(()=>{
    const fetchPost = async() =>{
      const res = await axios.get("/api/post" + search)
      setPosts(res.data);
      console.log(res.data)
    }
    fetchPost()
  },[search])
  return <>
    <Header/>
    <div className="home">
    <Posts post = {posts}/>
    <Sidebar/>
    </div>
    </>
}

export default Homepage