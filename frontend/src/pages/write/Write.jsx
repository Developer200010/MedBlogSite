import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [error, setError] = useState(false);


  const handleSubmit = async (e) => {
      e.preventDefault();
      const newPost = {
        username: user.username,
        title,
        desc,
      };
      if (file) {
        const data =new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPost.photo = filename;
        try {
          await axios.post("/api/upload", data);
        } catch (error) {
          console.log(error.message)
        }
      }
      try {
        const res = await axios.post("/api/post", newPost);
        window.location.replace("/post/" + res.data._id);
      } catch (err) {
        setError(true)
      }}

  return (
    <div className="write">
        {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label className="img" htmlFor="fileInput">
            <h5>select Image</h5>
          </label>
          <input
            id="fileInput"
            className="file1"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
            name="file"
          />
          <input
            className="writeInput title"
            placeholder="Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            autoFocus={true}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
        <hr />
        {error && (
          <span
            style={{
              color: "red",
              marginRight: "8px",
              position: "relative",
              bottom: "30px",
              left: "500px",
            }}
          >
            please check the fields
          </span>
        )}
      </form>
    </div>
  );
}
