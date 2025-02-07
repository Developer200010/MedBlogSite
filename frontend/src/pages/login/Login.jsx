import { useContext, useRef, useState } from "react";
import "./login.css";
import { Context } from "../../context/Context";
import axios from "axios"
export default function Login() {
  const userEmailRef = useRef();
  const passwordRef = useRef()
  // using context 
  const {dispatch, isFetching} = useContext(Context);
  const [error, setError] = useState(false)
  const handelSubmit = async (e) =>{
    e.preventDefault();
    dispatch({type:"login_start"});
    try {
      const res = await axios.post("/api/auth/login",{
        email : userEmailRef.current.value,
        password : passwordRef.current.value
      });
      dispatch({type:"login_success", payload : res.data});

    } catch (error) {
      dispatch({type:"login_failure"});
      setError(true)
    }
  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handelSubmit}>
        <label>Email</label>
        <input className="loginInput" type="text" placeholder="Enter your email..."
        ref={userEmailRef}
        />
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..."
        ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
        {error && <span style={{color:"red", marginTop:"8px"}}>check you email and password.</span>}
      </form>
        <button className="loginRegisterButton">Register</button>
    </div>
  );
}
