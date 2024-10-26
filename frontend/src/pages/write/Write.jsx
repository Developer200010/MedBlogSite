import { useContext, useState } from "react";
import "./write.css";
import axios from "axios"
import {Context} from "../../context/Context"

export default function Write() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const {user} = useContext(Context)
  const [error, setError] = useState(false)
  console.log(user.username)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/post",{
        username: user.username,
        title : title,
        desc : desc
      })
      res.data && window.location.replace("/post/" + res.data._id);
      console.log(res.data)
    } catch (error) {
      console.log(error.message)
      setError(true)
    }
  
  }
  return (
    <div className="write">
          <img
          className="writeImg"
          // src={URL.createObjectURL(file)}
          src="https://images.pexels.com/photos/27971523/pexels-photo-27971523/free-photo-of-a-mountain-hut-overlooks-a-spectacular-valley-in-the-swiss-alps.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        
   
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label className="img" htmlFor="fileInput">
            <h5>select Image</h5>
          </label>
          <input id="fileInput" className="file1" type="file" style={{ display: "none" }} onChange={e=> setFile(e.target.files[0])} />
          <input
            className="writeInput title"
            placeholder="Title"
            type="text"
            onChange={e => setTitle(e.target.value)}
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            onChange={e => setDesc(e.target.value)}
            autoFocus={true}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
        <hr/>
        {
          error && <span style={{color:"red", marginRight:"8px", position:"relative", bottom:"30px",left:"500px"}}>please check the fields</span>
        }
      </form>
    </div>
  );
}
