import React from "react";
import "./Loader.css";
import loading from "../../img/loading-dog.gif"

const Loader = () => {
  return (
    <div>
      <img src={loading} alt={loading} />
    </div>
  );
};

export default Loader;
