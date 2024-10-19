import React, { useEffect, useState } from 'react'
import { Header } from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import "./homepage.css"
const Homepage = () => {
  const [posts, setPosts] = useState([]);

 
  return <>
    <Header/>
    <div className="home">
    <Posts/>
    <Sidebar/>
    </div>
    </>
}

export default Homepage