import "./Dogs.css";
import * as actions from "../../redux/actions/index";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import DogCard from "../DogCard/DogCard";
import Paginado from "./Paginado";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Footer from "../Footer/Footer";

const Dogs = () => {
  const [searchDogs, setSearchDogs] = React.useState({
    name: "",
    temperament: "",
    sort: "",
    created: "all",
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  //const [dogsPerPage, setDogsPerPage] = React.useState(8);
  const dogsPerPage = 8;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (searchDogs.created === "created") dispatch(actions.getDogsBDD());
    else if (searchDogs.created === "api") dispatch(actions.getDogsAPI());
    else dispatch(actions.getAllDogs());
    dispatch(actions.getTemperaments());
    dispatch(actions.clearDetails());
  }, [dispatch, searchDogs.created]);

  const temperaments = useSelector((state) => state.temperaments);
  const dogs = useSelector((state) => state.dogs);

  const indexLastDog = currentPage * dogsPerPage;
  const indexFirstDog = indexLastDog - dogsPerPage;

  var dogsFiltering = [];

  // funcion que envio por props al componente Paginado
  const paginate = (props) => {
    setCurrentPage(props);
  };

  //Filtros para busqueda por nombre tiempo real y temperamento.
  if (!searchDogs.name && !searchDogs.temperament && Array.isArray(dogs)) {
    dogsFiltering = [...dogs];
  }

  //ordena solo por nombre
  if (searchDogs.name && !searchDogs.temperament && Array.isArray(dogs)) {
    dogs?.map((e) =>
      e.name.toLowerCase().includes(searchDogs.name.toLowerCase())
        ? dogsFiltering.push(e)
        : null
    );
  }
  //ordena solo por temperamento
  else if (!searchDogs.name && searchDogs.temperament && Array.isArray(dogs)) {
    dogs?.map((e) =>
      e.temperament
        ?.toLowerCase()
        .includes(searchDogs.temperament.toLowerCase())
        ? dogsFiltering.push(e)
        : null
    );
  }
  //ordena por temperamento y nombre
  else if (searchDogs.name && searchDogs.temperament && Array.isArray(dogs)) {
    dogs?.map((e) =>
      e.temperament
        ?.toLowerCase()
        .includes(searchDogs.temperament.toLowerCase()) &&
      e.name.toLowerCase().includes(searchDogs.name.toLowerCase())
        ? dogsFiltering.push(e)
        : null
    );
  }
  //ordena por peso o alfabetico, si se habian aplicado filtros previos se organizan.
  if (searchDogs.sort && Array.isArray(dogs)) {
    console.log(searchDogs.sort);
    if (searchDogs.sort === "asc") {
      dogsFiltering.sort((elem1, elem2) => {
        if (elem1.name.toLowerCase() < elem2.name.toLowerCase()) return -1;
        if (elem1.name.toLowerCase() > elem2.name.toLowerCase()) return 1;
        return 0;
      });
    } else if (searchDogs.sort === "des") {
      dogsFiltering.sort((elem1, elem2) => {
        if (elem1.name.toLowerCase() < elem2.name.toLowerCase()) return 1;
        if (elem1.name.toLowerCase() > elem2.name.toLowerCase()) return -1;
        return 0;
      });
    } else if (searchDogs.sort === "menor" || searchDogs.sort === "mayor") {
      dogsFiltering.sort((elem1, elem2) => {
        let elem1Aux = elem1.weight?.hasOwnProperty("metric")
          ? elem1.weight.metric
          : elem1.weight;
        let elem2Aux = elem2.weight?.hasOwnProperty("metric")
          ? elem2.weight.metric
          : elem2.weight;

        elem1Aux = elem1Aux.split("-");
        let weight1prom = elem1Aux.filter((n) => !isNaN(n));
        const initialValue = 0;

        let sum1 = weight1prom.reduce(
          (previousValue, currentValue) =>
            Number(previousValue) + Number(currentValue),
          initialValue
        );
        sum1 = sum1 / (!weight1prom.length ? 1 : weight1prom.length);

        elem2Aux = elem2Aux.split("-");

        let weight2prom = elem2Aux.filter((n) => !isNaN(n));

        let sum2 = weight2prom.reduce(
          (previousValue, currentValue) =>
            Number(previousValue) + Number(currentValue),
          initialValue
        );
        sum2 = sum2 / (!weight2prom.length ? 1 : weight2prom.length);
        if (isNaN(sum1)) console.log(sum1, weight1prom);
        if (sum1 < sum2) return -1;
        if (sum1 > sum2) return 1;
        return 0;
      });
      if (searchDogs.sort === "mayor") dogsFiltering.reverse();
    } else if (searchDogs.sort === "menorLS" || searchDogs.sort === "mayorLS") {
      dogsFiltering.sort((elem1, elem2) => {
        let elem1Aux = elem1.life_span
        let elem2Aux = elem2.life_span
        elem1Aux = elem1Aux.split(" - ");
        elem2Aux = elem2Aux.split(" - ");
        elem1Aux = elem1Aux[0].slice(0,2)
        elem2Aux = elem2Aux[0].slice(0,2);
        console.log(elem1Aux , elem2Aux);
        if (Number(elem1Aux) < Number(elem2Aux)) return -1;
        if (Number(elem1Aux) > Number(elem2Aux)) return 1;
        return 0;
      });
      if (searchDogs.sort === "mayorLS") dogsFiltering.reverse();

    }
  }
  const currentDogs = dogsFiltering.slice(indexFirstDog, indexLastDog);
  /**************************************************************************/
  // funciones de ejecucion de eventos
  const handleInputChange = (e) => {
    setCurrentPage(1);
    e.preventDefault();
    setSearchDogs({
      ...searchDogs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelecChange = (e) => {
    setCurrentPage(1);
    setSearchDogs({
      ...searchDogs,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
  };

  //**************************************/
  return (
    <div>
      <div className="filtros">
        <select
          className="selectStyle"
          onChange={handleSelecChange}
          name="temperament"
        >
          <option value="">All temperaments</option>
          {temperaments?.map((elem) => (
            <option name="temperament" value={elem.name} key={elem.id}>
              {elem.name}
            </option>
          ))}
        </select>
        <select
          className="selectStyle"
          onChange={handleSelecChange}
          name="created"
        >
          <option value="all">All dogs</option>
          <option value="created">Created</option>
          <option value="api">API</option>
        </select>

        <select
          className="selectStyle"
          onChange={handleSelecChange}
          name="sort"
        >
          <option value="">Select sort...</option>
          <option value="asc">Name (A-Z)</option>
          <option value="des">Name (Z-A)</option>
          <option value="menor">Weight (asc)</option>
          <option value="mayor">Weight (desc)</option>
          <option value="menorLS">Life Span (asc)</option>
          <option value="mayorLS">Life Span (desc)</option>
        </select>
        <input
          className="input"
          name="name"
          type="text"
          value={searchDogs.name}
          onChange={handleInputChange}
          placeholder="Search dog"
        ></input>
      </div>
      <div>
        <Paginado
          dogsPerPage={dogsPerPage}
          dogs={dogsFiltering.length}
          paginate={paginate}
          currentPage={currentPage}
          handlePrev={handlePrev}
          handleNext={handleNext}
          currentDogs={currentDogs}
        />
      </div>
      <div className="cards">
        {dogs.hasOwnProperty("error") ? (
          <Error />
        ) : currentDogs.length ? (
          currentDogs.map((elem) => {
            return (
              <DogCard
                key={elem.id}
                id={elem.id}
                img={
                  elem.image?.hasOwnProperty("url")
                    ? elem.image.url
                    : elem.image
                }
                name={elem.name}
                temperament={elem.temperament}
                weight={
                  elem.weight?.hasOwnProperty("metric")
                    ? elem.weight.metric
                    : elem.weight
                }
              />
            );
          })
        ) : searchDogs.name || searchDogs.temperament ? (
          <Error />
        ) : (
          <Loader />
        )}
      </div>
      <div>
        <Paginado
          dogsPerPage={dogsPerPage}
          dogs={dogsFiltering.length}
          paginate={paginate}
          currentPage={currentPage}
          handlePrev={handlePrev}
          handleNext={handleNext}
          currentDogs={currentDogs}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Dogs;
