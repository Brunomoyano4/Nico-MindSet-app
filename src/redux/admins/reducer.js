import {
  GET_ADMINS_FETCHING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED,
  ADD_ADMINS_FETCHING,
  ADD_ADMINS_FULFILLED,
  ADD_ADMINS_REJECTED,
  DELETE_ADMINS_FETCHING,
  DELETE_ADMINS_FULFILLED,
  DELETE_ADMINS_REJECTED,
  UPDATE_ADMINS_FETCHING,
  UPDATE_ADMINS_FULFILLED,
  UPDATE_ADMINS_REJECTED
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: false,
  admin: []
};

const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ADMINS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_ADMINS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case ADD_ADMINS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_ADMINS_FULFILLED:
      return {
        ...state,
        isLoading: false
      };
    case ADD_ADMINS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case DELETE_ADMINS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ADMINS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((admins) => admins._id !== action.payload)
      };
    case DELETE_ADMINS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case UPDATE_ADMINS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_ADMINS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((admins) => admins._id !== action.payload)
      };
    case UPDATE_ADMINS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default adminsReducer;
