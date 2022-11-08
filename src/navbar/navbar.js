import { Link } from "react-router-dom";
import React from "react";
import "./navbar.css";
import { Button } from "@mui/material";
import { createStore } from 'state-pool';
import { activeUser } from '../pages/login/login';


function handleLogOut(){
    
}
function LogButton(){
    return <button onClick={handleLogOut()}></button>
}
function Navbar() {
    return (
        <div className="navbar">
            <div>
                <Link to="/login" className="nav">Login</Link>
                
            </div>
            <div>
                {/* <button></button> */}
            </div>
            <div>
                <Link to="/projects" className="nav">My Projects</Link>
            </div>
            <div>
                <Link to="/create-project" className="nav">Create Project</Link>
            </div>
            <div>
                Current User Logged In: {activeUser.getValue()}
            </div>
        </div>
    );
}

export default Navbar;
