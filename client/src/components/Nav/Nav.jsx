import React from "react";
import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";

const NavBar = (props) => {



  return (
    <div className="topnav">
      <div>
        <h1>Henry Dogs</h1>
      </div>

    </div>
  );
};

export default NavBar;
