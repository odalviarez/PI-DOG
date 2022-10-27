import "./Dogs.css";
import * as actions from "../../redux/actions/index";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import DogCard from "../DogCard/DogCard";

const Dogs = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getAllDogs());
  }, [dispatch]);

  const [searchDogs, setSearchDogs] = React.useState({
    name: "",
  });
  const dogs = useSelector((state) => state.dogs);


      const handleInputChange = function (e) {
        e.preventDefault();
        setSearchDogs({
          ...searchDogs,
          [e.target.name]: e.target.value,
        });
      };



  return (
    <div className="card">
      <div>
        <input
          name="search"
          type="text"
          value={searchDogs.name}
          onChange={handleInputChange}
        ></input>
      </div>
      {dogs?.map((elem) => (
        <DogCard
          id={elem.id}
          img={elem.image.url}
          name={elem.name}
          temperament={elem.temperament}
          weight={elem.weight.metric}
          key={elem.id}
        />
      ))}
    </div>
  );
};

export default Dogs;
