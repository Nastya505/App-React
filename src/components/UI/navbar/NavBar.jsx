import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyButton from "../button/MyButton";
import { AuthContext } from "../../../context";


const NavBar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const logOut = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  }

  return(
      <div className="navbar">
        <MyButton onClick={logOut}>Log out</MyButton>
        <div className="navbar__links">
          <Link to="/about">About</Link>
          <Link to="/post">Posts</Link>
        </div>
      </div>
  )
}

export default NavBar;