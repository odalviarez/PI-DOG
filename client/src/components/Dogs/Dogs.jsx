import "./Dogs.css";
import * as actions from "../../redux/actions/index";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import DogCard from "../DogCard/DogCard";
import { Link } from "react-router-dom";

const Dogs = () => {
  var dogsFiltering = [];
  const dispatch = useDispatch();

const temperaments = useSelector((state) => state.temperaments);

  React.useEffect(() => {
    dispatch(actions.getAllDogs());
    dispatch(actions.getTemperaments());

  }, [dispatch]);


  const [searchDogs, setSearchDogs] = React.useState({
    name: "",
    temperament: "",
  });
  const dogs = useSelector((state) => state.dogs);

  if (!searchDogs.name && !searchDogs.temperament) {
    dogsFiltering = dogs;
  } else if (searchDogs.name && !searchDogs.temperament) {
    dogs?.map((e) =>
      e.name.toLowerCase().includes(searchDogs.name.toLowerCase())
        ? dogsFiltering.push(e)
        : null
    );
  } else if (!searchDogs.name && searchDogs.temperament) {
    dogs?.map((e) =>
      e.temperament?.toLowerCase().includes(searchDogs.temperament.toLowerCase())
        ? dogsFiltering.push(e)
        : null
    );
  } else if(searchDogs.name && searchDogs.temperament){
    dogs?.map((e) =>
      e.temperament?.toLowerCase().includes(searchDogs.temperament.toLowerCase()) && e.name.toLowerCase().includes(searchDogs.name.toLowerCase()) ?
      dogsFiltering.push(e):
      null
    );
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchDogs({
      ...searchDogs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelecChange = (e) => {
    //console.log(e.target.value);
    setSearchDogs({
      ...searchDogs,
      temperament: e.target.value,
    });
  };
  return (
    <div>
      <div>
        <select onChange={handleSelecChange}>
          <option value="">Temperaments</option>
          {temperaments?.map((elem) => (
            <option name="temperament" value={elem.name} key={elem.id}>
              {elem.name}
            </option>
          ))}
        </select>
        <input
          name="name"
          type="text"
          value={searchDogs.name}
          onChange={handleInputChange}
        ></input>
        <Link to="/create">
          <button>Create dog</button>
        </Link>
      </div>

      <div className="cards">
        {dogsFiltering?.map((elem) => (
          
          <DogCard
            key={elem.id}
            id={elem.id}
            img={
              elem.image?.hasOwnProperty("url") ? elem.image.url : elem.image
            }
            name={elem.name}
            temperament={elem.temperament}
            weight={
              elem.weight?.hasOwnProperty("metric")
                ? elem.weight.metric
                : elem.weight
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Dogs;
