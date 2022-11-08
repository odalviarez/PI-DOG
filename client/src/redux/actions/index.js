import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const CREATE_DOG = "CREATE_DOG";
export const DELETE_DOG = "DELETE_DOG";
export const SEARCH_DOGS = "SEARCH_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const CLEAR_DETAILS = "CLEAR_DETAILS";

export const getAllDogs = (name) => async (dispatch) => {
  try {
    const json = await axios.get(name ? `/dogs/${name}` : "/dogs");
    return dispatch({
      type: GET_ALL_DOGS,
      payload: json.data,
    });
  } catch (error) {
    return dispatch({
      type: GET_ALL_DOGS,
      payload: error,
    });
  }
};

export const getDogsBDD = () => async (dispatch) => {
  try {
    const json = await axios.get("/dogsbdd");
    return dispatch({
      type: GET_ALL_DOGS,
      payload: json.data,
    });
  } catch (error) {
    return dispatch({
      type: GET_ALL_DOGS,
      payload: error,
    });
  }
};

export const getDogsAPI = () => async (dispatch) => {
  try {
    const json = await axios.get("/dogsapi");
    return dispatch({
      type: GET_ALL_DOGS,
      payload: json.data,
    });
  } catch (error) {
    return dispatch({
      type: GET_ALL_DOGS,
      payload: error,
    });
  }
};

export const getAllDogsHome = () => async (dispatch) => {
  try {
    const json = await axios.get("/home");
    return dispatch({
      type: GET_ALL_DOGS,
      payload: json.data,
    });
  } catch (error) {
    return dispatch({
      type: GET_ALL_DOGS,
      payload: error,
    });
  }
};

export const getDogDetail = (id) => async (dispatch) => {
  try {
    const json = await axios.get(`/dogs/${id}`);
    return dispatch({
      type: GET_DOG_DETAILS,
      payload: json.data,
    });
  } catch (error) {
    return dispatch({
      type: GET_DOG_DETAILS,
      payload: error,
    });
  }
};

export const getTemperaments = () => async (dispatch) => {
  try {
    const json = await axios.get(`/dogs/temperaments`);
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: json.data,
    });
  } catch (error) {
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: error,
    });
  }
};
export const searchDogs = (value) => async (dispatch) => {
  try {
    const json = await axios.get("/dogs?name=" + value);
    return dispatch({
      type: SEARCH_DOGS,
      payload: json.data,
    });
  } catch (error) {
    return dispatch({
      type: SEARCH_DOGS,
      payload: error,
    });
  }
};

export const createDog = (values) => async (dispatch) => {
  try {
    const json = await axios.post("/dogs", values);
    return {
      type: CREATE_DOG,
      payload: json,
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
