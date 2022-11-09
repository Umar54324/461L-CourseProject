import { Link } from "react-router-dom";
import React from "react";
import "./navbar.css";
import { Button } from "@mui/material";
import { createStore } from "state-pool";
import { activeUser } from "../pages/login/login";

function handleLogOut() {
  console.log("clicked");
  // localStorage.setItem("CurrentUser", null);
  localStorage.clear();
  window.location.assign("/login");
}
function LogButton() {
  return <Link to="/login" className="logout" onClick={handleLogOut}>
        Log Out
      </Link>;
}
function renderMan(){
  
    return( <div className="navbar">    
    <div>
      <Link to="/projects" className="nav">
        My Projects
      </Link>
    </div>
    <div>
      <Link to="/create-project" className="nav">
        Create Project
      </Link>
    </div>
    <div>
      <LogButton />
    </div>
    <div>Current User Logged In: {localStorage.getItem("CurrentUser")}</div>
  </div>);
  
}
function Navbar(props) {
  if(localStorage.getItem("CurrentUser") != null){
    return renderMan();
  }
  else{
   return (null);
  }
  // return (
  //   <div className="navbar">
  //     <div>
  //       <Link to="/login" className="nav">
  //         Login
  //       </Link>
  //     </div>
      
  //     <div>
  //       <Link to="/projects" className="nav">
  //         My Projects
  //       </Link>
  //     </div>
  //     <div>
  //       <Link to="/create-project" className="nav">
  //         Create Project
  //       </Link>
  //     </div>
  //     <div>
  //       <Link to="/login" className="logout">
  //         Log Out
  //       </Link>
  //     </div>
  //     <div>Current User Logged In: {localStorage.getItem("CurrentUser")}</div>
  //   </div>
  // );
}

export default Navbar;
