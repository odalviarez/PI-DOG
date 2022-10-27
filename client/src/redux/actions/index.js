//import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const CREATE_DOG = "CREATE_DOG";
export const DELETE_DOG = "DELETE_DOG";
export const SEARCH_DOGS = "SEARCH_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";


export const getAllDogs = () => (dispatch) => { 
      return fetch("http://localhost:3001/dogs")
        .then((json) => json.json())
        .then((json) =>
          dispatch({
            type: GET_ALL_DOGS,
            payload: json,
          })
        );
};

export const getDogDetail = (id) => (dispatch) => {
  return fetch(`http://localhost:3001/dogs/${id}`)
    .then((json) => json.json())
    .then((json) =>
      dispatch({
        type: GET_DOG_DETAILS,
        payload: json,
      })
    );
};

export const getTemperaments = () => (dispatch) => {
  return fetch(`http://localhost:3001/dogs/temperaments`)
    .then((json) => json.json())
    .then((json) =>
      dispatch({
        type: GET_TEMPERAMENTS,
        payload: json,
      })
    );
};

export const searchDogs = (value) => (dispatch) => {
  return fetch("http://localhost:3001/dogs?name=" + value)
    .then((json) => json.json())
    .then((json) =>
      dispatch({
        type: SEARCH_DOGS,
        payload: json,
      })
    );
};


export const createDog = (values) => { 
    return {
      type: CREATE_DOG,
      payload: {...values}
    };
};

export const deleteDog = (id) => { 
    return {
      type: DELETE_DOG,
      payload: id
    };
};


