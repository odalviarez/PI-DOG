import React from "react";
import "./Nav.css";
import dogProfileImg from "./dogprofile.png"
import apoloPortada from "./apoloPortada.png"
import { Link } from "react-router-dom";

const NavBar = (props) => {



  return (
    <div className="navBar">
      <div className="content">
        <img className="imgNav" src={apoloPortada} alt={apoloPortada} />
      </div>
      <div className="texto">
        <h1>Henry Dogs</h1>
      </div>
      <div>
        <Link to="/create">
          <button className="btn-create">Create dog</button>
        </Link>
      </div>
    </div>
  );
};


export default NavBar;
