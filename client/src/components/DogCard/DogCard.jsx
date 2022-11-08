import React from "react";
import { Link } from "react-router-dom";
import "./DogCard.css";

const DogCard = (props) => {
  return (
    <div className="card">
      <Link to={`/details/${props.id}`} className="link">
        <div className="dogCard">
          <img src={props.img} alt={props.img} className="dogImg" />{" "}
        </div>
        <div className="card-details">
          <p className="text-title">{props.name}</p>

          <p className="text-body">Temperaments: {props.temperament}</p>
          <p className="text-body">{props.weight} kg</p>
        </div>

        <button className="card-button">More info</button>
      </Link>
    </div>
  );
};

export default DogCard;
