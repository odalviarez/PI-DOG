import React from "react";



const ListsTemperaments = (props) => {


  return (
    <div>
      <div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            props.onClose(props.name);
          }}
        >
          x
        </button>
        <p>{props.name}</p>
      </div>
    </div>
  );
};

export default ListsTemperaments;
