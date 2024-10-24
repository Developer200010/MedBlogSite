import { useState } from "react";
import "./register.css";
import axios from "axios"
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register",{
        username,
        email,
        password
      });
      res.data && window.location.replace("/login")
    } catch (error) {
      setError(true)
    }

    
  }
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e)=> setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e)=> setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e)=> setPassword(e.target.value)}
        />
        <button type="submit" className="registerButton">Register</button>
        {
          error && <span style={{color: "red", marginTop:"4px"}}>check you email or password</span>
        }
      </form>
      <button className="registerLoginButton">Login</button>
    </div>
  );
}
