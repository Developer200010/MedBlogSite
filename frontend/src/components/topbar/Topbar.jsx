import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Topbar() {
  const {user, dispatch} = useContext(Context);
  const handleLogout = () =>{
    dispatch({type:"logout"})
    window.location.replace("/login")
  }
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square">CV</i>
        <i className="topIcon fab fa-instagram-square">BlogSite</i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="linked" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem linked">ABOUT</li>
          <li className="topListItem linked">CONTACT</li>
          <li className="topListItem linked">
            <Link className="linked" to="/write">
              WRITE
            </Link>
          </li>
          {user && <li className="topListItem" onClick={handleLogout}>LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            {
              user.profilePic !== "" ? 
              <img
              className="topImg"
              src={user.profilePic}
              alt=""/> :
              <img
              className="topImg"
              src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
              alt=""/>
            }
             
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" id="login"  to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" id="register" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
