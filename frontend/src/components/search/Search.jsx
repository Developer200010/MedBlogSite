import React, { useEffect, useRef, useState } from "react";
import "./Search.css";
import axios from "axios"
import Posts from '../../components/posts/Posts'

const Search = () => {
    const [search, setSearch] = useState([]);
    const inputRef = useRef(null)
    // console.log(inputRef)
    const handleSearch = (e) =>{
        e.preventDefault();
        setSearch(inputRef.current.value)
    }
    
      const getUser = async () => {
        try {
          const res = await axios.get(`/api/post?user=${search}`);
          setSearch(res.data)
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    console.log(search)
    
  return (
    <>
      <div className="container" >
        <form action="">
          <input type="text" placeholder="search post by name" ref={inputRef} />
          <button className="btn" type="submit" onClick={handleSearch}>search</button>
        </form>
      </div>
      {/* <Posts data = {search}/> */}
    </>
  );
};

export default Search;
