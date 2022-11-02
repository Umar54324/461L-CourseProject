import { Link } from "react-router-dom";
import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div>
        <Link to="/login" className="nav">
          Login
        </Link>
      </div>
      <div>
        <Link to="/hardware" className="nav">
          Hardware
        </Link>
      </div>
      <div>
        <Link to="/peripherals" className="nav">
          Peripherals
        </Link>
      </div>
      <div>
        <Link to="/decoration" className="nav">
          Decoration
        </Link>
      </div>
      <div>
        <Link to="/projects" className="nav">
          My Projects
        </Link>
      </div>
      <div>
        <Link to="/createproject" className="nav">
          Create Project
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
