//import "./home.css";
import React from "react";
import * as actions from "../../redux/actions/index";
import { useDispatch } from "react-redux";
//import DogCard from "../DogCard/DogCard";
import image from "../../img/dog_run.jpg";

import { Link } from "react-router-dom";


const Home = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
      dispatch(actions.getAllDogsHome());
    }, [dispatch]);

  return (
    <div>
      <h1>Bienvenidos a henry DOGS PI</h1>
      <img
        src= {image}
        alt="henry-dogs-logo"
      />
      <Link to="/home">Entrar</Link>
    </div>
  );
};

export default Home;