import { Link } from "react-router-dom";
import "./singlePost.css";

export default function SinglePost({data}) {
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {data.photo === "" ? <img
          className="singlePostImg"
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        /> : <img
        className="singlePostImg"
        src={data.photo}
        alt=""
      /> }
        
        <h1 className="singlePostTitle">
          {data.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to="/posts?username=Safak">
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
