import React from "react";
import * as actions from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Footer from "../Footer/Footer";
import "./DogDetails.css";

const DogDetails = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getDogDetail(id));
  }, [id, dispatch]);

  const dogDetail = useSelector((state) => state.dogDetail);

  //Mientras espera la info de useSelector muestra el Loader

  return !Object.keys(dogDetail).length ? (
    <div className="content">
      <div className="contentLoader">
        <Loader />
      </div>
    </div>
  ) : dogDetail.hasOwnProperty("error") ? (
    <div>
      <Link to="/home">
        <button>back</button>
      </Link>
      <Error />
    </div>
  ) : (
    <div>
      <Link to="/home">
        <button>back</button>
      </Link>
      <div className="cardContent">
        <div className="title">
          <h1 className="texto">Dog Details</h1>
        </div>

        <ul className="list">
          <li>
            <div>
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
          </li>
          <li>
            <div>
              <h1>{dogDetail.name}</h1>
            </div>

            <p>{dogDetail.temperament}</p>
            <p>{dogDetail.origin}</p>
            <p>{dogDetail.life_span}</p>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default DogDetails;
