import React from "react";
import * as actions from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListsTemperaments from "./ListsTemperaments";
import validate from "./validate";

const CreateDog = () => {
  const dispatch = useDispatch();

  const [dog, setDog] = React.useState({
    name: "",
    heightMin: 0,
    heightMax: 0,
    weightMin: 0,
    weightMax: 0,
    lifeMin: 0,
    lifeMax: 0,
    image: "",
    temperaments: [],
  });

  const [error, setError] = React.useState({notnull: ''});
  console.log(error);
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
      [name.target.name]: [...dogTemperamentFilter],
    });
    setError(
      validate({
        ...dog,
        [name.target.name]: [...dogTemperamentFilter],
      })
    );
  }

  const handleOnSubmit = function (e) {
    e.preventDefault();
    if(!Object.keys(error).length){
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
      let test = dispatch(actions.createDog(dogCreate));
      console.log(test);
    }
    else{
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
          value={dog.heightMin ? dog.heightMin : null}
          onChange={handleInputChange}
        ></input>
        {error.heightMin && <p>{error.heightMin}</p>}
        <input
          type="number"
          min="1"
          name="heightMax"
          placeholder="Max cm"
          value={dog.heightMax ? dog.heightMax : null}
          onChange={handleInputChange}
        ></input>
        {error.heightMax && <p>{error.heightMax}</p>}

        <label>Weight: </label>
        <input
          type="number"
          min="1"
          name="weightMin"
          placeholder="Min Kg"
          value={dog.weightMin ? dog.weightMin : null}
          onChange={handleInputChange}
        ></input>
        {error.weightMin && <p>{error.weightMin}</p>}
        <input
          type="number"
          min="1"
          name="weightMax"
          placeholder="Max Kg"
          value={dog.weightMax ? dog.weightMax : null}
          onChange={handleInputChange}
        ></input>
        {error.weightMax && <p>{error.weightMax}</p>}

        <label>Life span: </label>
        <input
          type="number"
          min="1"
          name="lifeMin"
          placeholder="Min"
          value={dog.lifeMin ? dog.lifeMin : null}
          onChange={handleInputChange}
        ></input>
        {error.lifeMin && <p>{error.lifeMin}</p>}
        <input
          type="number"
          min="1"
          name="lifeMax"
          placeholder="Max"
          value={dog.lifeMax ? dog.lifeMax : null}
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
    </div>
  );
};

export default CreateDog;
