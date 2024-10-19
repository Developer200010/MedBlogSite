import { Link } from "react-router-dom";
import "./topbar.css";

export default function Topbar() {
  const user = false;
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
          {user && <li className="topListItem">LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
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
