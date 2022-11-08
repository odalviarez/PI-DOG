import React from "react";
import "./Loader.css";
import loading from "../../img/loading-dog.gif"

const Loader = () => {
  return (
    <div>
      <img src={loading} alt={loading} />

      {/* <div class="leap-frog">
        <div class="leap-frog__dot"></div>
        <div class="leap-frog__dot"></div>
        <div class="leap-frog__dot"></div>
      </div> */}
    </div>
  );
};

export default Loader;
