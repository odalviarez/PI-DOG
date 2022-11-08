import React from "react";
import "./CreateDog.css"


const ListsTemperaments = (props) => {


  return (
    <li>
      <button
        className="btnSelecTemp"
        type="button"
        value={props.name}
        onClick={(e) => {
          e.preventDefault();
          props.onClose(props.name);
        }}
      >
        {props.name}
      </button>
    </li>
  );
};

export default ListsTemperaments;
