import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
export default function SinglePost({ data }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const handleDelete = async () => {
    try {
      await axios.delete("/api/post/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  // creating sharable link
  const shareableLink = `${window.location.origin}/post/${path}`;
  const copyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    alert("link copied to clipboard");
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/api/post/" + path);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleEdit = async () => {
    await axios.put(`/api/post/${data._id}`, {
      username: user.username,
      title,
      desc,
    });
    // window.location.reload();
    setUpdateMode(false);
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {data.photo === "" ? (
          <img
            className="singlePostImg"
            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
        ) : (
          <img className="singlePostImg" src={PF + data.photo} alt="" />
        )}
        {updateMode ? (
          <input
            value={title}
            className="singlePostTitleInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {data.title}

            {data.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={(e) => setUpdateMode(true)}
                >
                  edit
                </i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                >
                  delete
                </i>
              </div>
            )}
            <div className="singlePostEdit">
              <i className="singlePostIcon far fa-trash-alt" onClick={copyLink}>
                share
              </i>
            </div>
          </h1>
        )}

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
        {updateMode ? (
          <>
            <textarea
              className="singlePostDescInput"
              onChange={(e) => setDesc(e.target.value)}
            >
              {desc}
            </textarea>
            <button className="updateBtn" onClick={handleEdit}>
              update
            </button>
          </>
        ) : (
          <p className="singlePostDesc">{data.desc}</p>
        )}
      </div>
    </div>
  );
}
