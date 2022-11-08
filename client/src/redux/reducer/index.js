
import {
  GET_ALL_DOGS,
  GET_DOG_DETAILS,
  CREATE_DOG,
  DELETE_DOG,
  SEARCH_DOGS,
  GET_TEMPERAMENTS,
  CLEAR_DETAILS,
} from "../actions/index";

const initialState = {
  dogs: [],
  dogDetail: {},
  dogsSearch: [],
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };

    case GET_DOG_DETAILS:
      return {
        ...state,
        dogDetail: action.payload,
      };

    case CLEAR_DETAILS:
      return {
        ...state,
        dogDetail: action.payload,
      };

    case CREATE_DOG:
      return {
        ...state,
        dogs: [...state.dogs, action.payload],
      };

    case DELETE_DOG:
      return {
        ...state,
        dogs: state.dogs.filter((e) => e.id !== action.payload),
      };

    case SEARCH_DOGS:
      return {
        ...state,
        dogsSearch: action.payload,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
