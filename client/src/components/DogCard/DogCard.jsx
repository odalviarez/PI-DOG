import React from "react";
import { Link } from "react-router-dom";
import style from "./DogCard.css";

const DogCard = (props) => {
  return (
    <Link to={`/details/${props.id}`}>
      <div className={style.card}>
        <h1 className={style.ciudad}>{props.name}</h1>
        <div className={style.divTemp}>
          <img className={style.imgTemp} src={props.img} alt={props.img} />
          <p>Temperaments: {props.temperament}</p>
          <p>{props.weight} kg</p>
        </div>
      </div>
    </Link>
  );
};

export default DogCard;
