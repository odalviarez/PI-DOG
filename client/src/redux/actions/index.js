import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const CREATE_DOG = "CREATE_DOG";
export const DELETE_DOG = "DELETE_DOG";
export const SEARCH_DOGS = "SEARCH_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const CLEAR_DETAILS = "CLEAR_DETAILS";

export const getAllDogs = (name) => (dispatch) => {
  try {
    return fetch(
      name ? `http://localhost:3001/dogs/${name}` : "http://localhost:3001/dogs"
    )
      .then((json) => json.json())
      .then((json) =>
        dispatch({
          type: GET_ALL_DOGS,
          payload: json,
        })
      );
  } catch (error) {
    return dispatch({
      type: GET_ALL_DOGS,
      payload: error,
    });
  }
};

export const getDogsBDD = () => (dispatch) => {
  try {
    return fetch("http://localhost:3001/dogsbdd")
      .then((json) => json.json())
      .then((json) =>
        dispatch({
          type: GET_ALL_DOGS,
          payload: json,
        })
      );
  } catch (error) {
    return dispatch({
      type: GET_ALL_DOGS,
      payload: error,
    });
  }
};

export const getDogsAPI = () => (dispatch) => {
  try {
    return fetch("http://localhost:3001/dogsapi")
      .then((json) => json.json())
      .then((json) =>
        dispatch({
          type: GET_ALL_DOGS,
          payload: json,
        })
      );
  } catch (error) {
    return dispatch({
      type: GET_ALL_DOGS,
      payload: error,
    });
  }
};

export const getAllDogsHome = () => (dispatch) => {
  try {
    return fetch("http://localhost:3001/home")
      .then((json) => json.json())
      .then((json) =>
        dispatch({
          type: GET_ALL_DOGS,
          payload: json,
        })
      );
  } catch (error) {
    return dispatch({
      type: GET_ALL_DOGS,
      payload: error,
    });
  }
};

export const getDogDetail = (id) => (dispatch) => {
  try {
    return fetch(`http://localhost:3001/dogs/${id}`)
      .then((json) => json.json())
      .then((json) =>
        dispatch({
          type: GET_DOG_DETAILS,
          payload: json,
        })
      );
  } catch (error) {
    return dispatch({
      type: GET_DOG_DETAILS,
      payload: error,
    });
  }
};

export const getTemperaments = () => (dispatch) => {
  try {
    return fetch(`http://localhost:3001/dogs/temperaments`)
      .then((json) => json.json())
      .then((json) =>
        dispatch({
          type: GET_TEMPERAMENTS,
          payload: json,
        })
      );
  } catch (error) {
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: error,
    });
  }
};

export const searchDogs = (value) => (dispatch) => {
  try {
    return fetch("http://localhost:3001/dogs?name=" + value)
      .then((json) => json.json())
      .then((json) =>
        dispatch({
          type: SEARCH_DOGS,
          payload: json,
        })
      );
  } catch (error) {
    return dispatch({
      type: SEARCH_DOGS,
      payload: error,
    });
  }
};

export const createDog = (values) => (dispatch) => {
  try {
    var config = {
      method: "post",
      url: "http://localhost:3001/dogs",
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    };
  
    let response = axios(config)
      .then((response) => JSON.stringify(response.data))
      .catch((error) => error);

      console.log(response)
    return {
      type: CREATE_DOG,
      payload: response,
    };
  } catch (error) {
    return dispatch({
      type: CREATE_DOG,
      payload: error,
    });
  }
};
export const clearDetails = () => {
  return {
    type: CLEAR_DETAILS,
    payload: {},
  };
};
export const deleteDog = (id) => {
  return {
    type: DELETE_DOG,
    payload: id,
  };
};
