import {
  GET_POSITIONS_FETCHING,
  GET_POSITIONS_FULFILLED,
  GET_POSITIONS_REJECTED,
  ADD_POSITIONS_FETCHING,
  ADD_POSITIONS_FULFILLED,
  ADD_POSITIONS_REJECTED,
  DELETE_POSITIONS_FETCHING,
  DELETE_POSITIONS_FULFILLED,
  DELETE_POSITIONS_REJECTED,
  UPDATE_POSITIONS_FETCHING,
  UPDATE_POSITIONS_FULFILLED,
  UPDATE_POSITIONS_REJECTED
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: false,
  position: []
};

const positionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSITIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_POSITIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_POSITIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case ADD_POSITIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_POSITIONS_FULFILLED:
      return {
        ...state,
        isLoading: false
      };
    case ADD_POSITIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case DELETE_POSITIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_POSITIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((positions) => positions._id !== action.payload)
      };
    case DELETE_POSITIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case UPDATE_POSITIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_POSITIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((positions) => positions._id !== action.payload)
      };
    case UPDATE_POSITIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default positionsReducer;
