import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
export default function SinglePost({data}) {
  const PF = "http://localhost:5000/images/"
  const {user} = useContext(Context)
  const location = useLocation()
  const path = location.pathname.split("/")[2]
  console.log(path)
  const handleDelete = async() =>{
    try {
      await axios.delete("/api/post/" + path, {
        data:{username: user.username}} );
      window.location.replace("/");

    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {data.photo === "" ? <img
          className="singlePostImg"
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        /> : <img
        className="singlePostImg"
        src={PF + data.photo}
        alt=""
      /> }
        
        <h1 className="singlePostTitle">
          {data.title}

            {data.username === user?.username &&
              <div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit">edit</i>
              <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}>delete</i>
            </div>
            }
          
        
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${data.username}`}>
                {data.username}
              </Link>
            </b>
          </span>
          <span>{new Date(data.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
         {data.desc}
        </p>
      </div>
    </div>
  );
}
