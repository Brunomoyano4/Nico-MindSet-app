import {
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED,
  ADD_APPLICATIONS_FETCHING,
  ADD_APPLICATIONS_FULFILLED,
  ADD_APPLICATIONS_REJECTED,
  DELETE_APPLICATIONS_FETCHING,
  DELETE_APPLICATIONS_FULFILLED,
  DELETE_APPLICATIONS_REJECTED,
  UPDATE_APPLICATIONS_FETCHING,
  UPDATE_APPLICATIONS_FULFILLED,
  UPDATE_APPLICATIONS_REJECTED
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: false,
  selectApplication: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPLICATIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_APPLICATIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_APPLICATIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case ADD_APPLICATIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_APPLICATIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    case ADD_APPLICATIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case DELETE_APPLICATIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_APPLICATIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((application) => application._id !== action.payload)
      };
    case DELETE_APPLICATIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case UPDATE_APPLICATIONS_FETCHING:
      return {
        ...state,
        isLoading: true,
        selectApplication: initialState.selectApplication
      };
    case UPDATE_APPLICATIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        selectApplication: action.payload
      };
    case UPDATE_APPLICATIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
