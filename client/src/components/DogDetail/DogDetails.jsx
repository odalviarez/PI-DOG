/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import * as actions from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Footer from "../Footer/Footer";
import axios from "axios";
import "./DogDetails.css";

const DogDetails = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getDogDetail(id));
  }, [id, dispatch]);

  const deleteDog = async () => await axios.delete("/dogs/" + id);

  const dogDetail = useSelector((state) => state.dogDetail);

  //Mientras espera la info de useSelector muestra el Loader

  return (
    <div>
      {!Object.keys(dogDetail).length ? (
        <div className="contLoader">
          <div>
            <Loader />
          </div>
          <Footer />
        </div>
      ) : dogDetail.hasOwnProperty("error") ? (
        <div>
          <Link to="/home">
            <button className="btnBackDetails">back</button>
          </Link>
          <Error />
        </div>
      ) : (
        <div>
          <div>
            <Link to="/home">
              <button className="btnBackDetails">back</button>
            </Link>

            <div className="cardContent">
              <div className="title">
                <h1 className="texto">{dogDetail.name}</h1>
                {dogDetail.bdd ? (
                  <a className="buttonDelete" href="#popup1">
                    Delete
                  </a>
                ) : null}
              </div>
              <div className="contentDetails">
                <div className="contIzqDetails">
                  <img
                    className="imgContainer"
                    src={
                      dogDetail.image?.hasOwnProperty("url")
                        ? dogDetail.image.url
                        : dogDetail.image
                    }
                    alt={
                      dogDetail.image?.hasOwnProperty("url")
                        ? dogDetail.image.url
                        : dogDetail.image
                    }
                  />
                </div>
                <div className="contDerDetails">
                  <p className="pDetails">
                    {dogDetail.temperament
                      ? `Temperament: ${dogDetail.temperament}`
                      : ""}
                  </p>
                  <p className="pDetails">
                    {dogDetail.origin ? `Origin: ${dogDetail.origin}` : ""}
                  </p>
                  <p className="pDetails">
                    {dogDetail.weight?.hasOwnProperty("metric")
                      ? `Weight: ${dogDetail.weight.metric}`
                      : `Weight: ${dogDetail.weight}`}
                    cm
                  </p>
                  <p className="pDetails">
                    {dogDetail.height?.hasOwnProperty("metric")
                      ? `Height: ${dogDetail.height.metric}`
                      : `Height: ${dogDetail.height}`}
                    kg
                  </p>
                  <p className="pDetails">
                    {dogDetail.life_span
                      ? `Life span: ${dogDetail.life_span}`
                      : ""}
                  </p>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )}
      <div id="popup1" className="overlay">
        <div className="popup">
          <h2>Are you sure you want to remove {dogDetail.name}</h2>
          <a className="close" href={"#"}>
            &times;
          </a>
          <div className="contentPop">
            <Link to="/home">
              <button onClick={deleteDog}>Accept</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogDetails;
