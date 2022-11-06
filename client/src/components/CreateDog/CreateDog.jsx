import React from "react";
import * as actions from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListsTemperaments from "./ListsTemperaments";
import validate from "./validate";
import Footer from "../Footer/Footer";

const CreateDog = () => {
  const dispatch = useDispatch();

  const [dog, setDog] = React.useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifeMin: "",
    lifeMax: "",
    image: "",
    temperaments: [],
  });

  const [error, setError] = React.useState({ notnull: "" });
  const temperaments = useSelector((state) => state.temperaments);

  React.useEffect(() => {
    dispatch(actions.getTemperaments());
  }, [dispatch]);

  const handleInputChange = function (e) {
    e.preventDefault();
    setDog({
      ...dog,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...dog,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectChange = function (e) {
    e.preventDefault();
    let dogAux = dog.temperaments?.find((elem) => elem === e.target.value);
    if (!dogAux) {
      setDog({
        ...dog,
        [e.target.name]: [...dog.temperaments, e.target.value],
      });
    }
    setError(
      validate({
        ...dog,
        [e.target.name]: [...dog.temperaments, e.target.value],
      })
    );
  };

  function onClose(name) {
    let dogTemperamentFilter = dog.temperaments.filter((c) => c !== name);
    setDog({
      ...dog,
      temperaments: [...dogTemperamentFilter],
    });
    setError(
      validate({
        ...dog,
        temperaments: [...dogTemperamentFilter],
      })
    );
  }

  const handleOnSubmit = function (e) {
    e.preventDefault();
    if (!Object.keys(error).length) {
      let arrTemperaments = temperaments.filter((elem) =>
        dog.temperaments.find((prop) => prop === elem.name)
      );
      let dogCreate = {
        name: dog.name,
        temperament: dog.temperaments.join(", "),
        temperaments: arrTemperaments.map((elem) => elem.id),
        height: `${dog.heightMin} - ${dog.heightMax}`,
        weight: `${dog.weightMin} - ${dog.weightMax}`,
        life_span: `${dog.lifeMin} - ${dog.lifeMax}`,
        image: dog.image,
      };
      dispatch(actions.createDog(dogCreate));
      
      //luego de creado limpio los campos
      setDog({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeMin: "",
        lifeMax: "",
        image: "",
        temperaments: [],
      });
      alert("Dog Created");
    } else {
      console.log("faltan datos");
    }
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label>Name: </label>
        <input
          placeholder="Dog name"
          name="name"
          type="text"
          value={dog.name}
          onChange={handleInputChange}
        ></input>
        {error.name && <p>{error.name}</p>}

        <label>Height: </label>
        <input
          type="number"
          min="1"
          name="heightMin"
          placeholder="Min cm"
          value={dog.heightMin}
          onChange={handleInputChange}
        ></input>
        {error.heightMin && <p>{error.heightMin}</p>}
        <input
          type="number"
          min="1"
          name="heightMax"
          placeholder="Max cm"
          value={dog.heightMax}
          onChange={handleInputChange}
        ></input>
        {error.heightMax && <p>{error.heightMax}</p>}

        <label>Weight: </label>
        <input
          type="number"
          min="1"
          name="weightMin"
          placeholder="Min Kg"
          value={dog.weightMin}
          onChange={handleInputChange}
        ></input>
        {error.weightMin && <p>{error.weightMin}</p>}
        <input
          type="number"
          min="1"
          name="weightMax"
          placeholder="Max Kg"
          value={dog.weightMax}
          onChange={handleInputChange}
        ></input>
        {error.weightMax && <p>{error.weightMax}</p>}

        <label>Life span: </label>
        <input
          type="number"
          min="1"
          name="lifeMin"
          placeholder="Min"
          value={dog.lifeMin}
          onChange={handleInputChange}
        ></input>
        {error.lifeMin && <p>{error.lifeMin}</p>}
        <input
          type="number"
          min="1"
          name="lifeMax"
          placeholder="Max"
          value={dog.lifeMax}
          onChange={handleInputChange}
        ></input>
        {error.lifeMax && <p>{error.lifeMax}</p>}

        <label>Image: </label>
        <input
          name="image"
          type="text"
          placeholder="Image URL"
          value={dog.image}
          onChange={handleInputChange}
        ></input>
        {dog.image ? (
          <img src={dog.image} alt={dog.image} width="500" height="600"/>
        ) : null}
        <div>
          <div>
            <label>temperaments: </label>
            <select
              onChange={(e) => handleSelectChange(e)}
              multiple
              required=""
              name="temperaments"
            >
              {temperaments?.map((elem) => (
                <option name="temperament" value={elem.name} key={elem.id}>
                  {elem.name}
                </option>
              ))}
            </select>
            {error.temperaments && <p>{error.temperaments}</p>}
          </div>

          {dog.temperaments
            ? dog.temperaments.map((elem) => (
                <ListsTemperaments key={elem} name={elem} onClose={onClose} />
              ))
            : ""}
        </div>

        <button type="submit" disabled={Object.keys(error).length}>
          Create Dog
        </button>
      </form>
      <Link to="/home">
        <button>back</button>
      </Link>
      <Footer/>
    </div>
  );
};

export default CreateDog;
