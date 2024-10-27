import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ img, data }) {
  const PF = "http://localhost:5000/images/"
  return (
    <div className="post">
      {data.photo === "" ? (
        <img className="postImg" src={img} alt="" />
      ) : (
        <img className="postImg" src={PF + data.photo} alt="" />
      )}
      <div className="postInfo">
        <div className="postCats">
          {data.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${data._id}`} className="links">
            {data.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(data.updatedAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{data.desc}</p>
    </div>
  );
}
