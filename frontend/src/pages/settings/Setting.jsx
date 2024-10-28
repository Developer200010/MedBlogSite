import "./setting.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Settings() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  const {user} = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.photo = filename;
      try {
        await axios.post("/api/upload", data);
      } catch (error) {
        console.log(error.message)
        // setError(true)
      }
    }
    try {
      await axios.put("/api/users/" + user._id, updatedUser);
      window.location.reload();
    } catch (error) {
      console.log(error.message)
      setError(true)
    }}
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {
              file === null ?    <img
              src={user.profilePic}
              alt=""
            /> :
            <img
            src={URL.createObjectURL(file)}
            alt=""
          />
            }
         
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={(e)=> setFile(e.target.files[0])}
              className="settingsPPInput"
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder="Enter you name" name="username"  onChange={(e)=> setUserName(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder="Enter you email..." name="email"  onChange={(e)=> setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange={(e)=> setPassword(e.target.value)} />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {
            error && <span style={{color:"red", marginTop:"8px"}}>Check you fields</span>
          }
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
