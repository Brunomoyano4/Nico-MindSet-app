import {
  GET_INTERVIEWS_FETCHING,
  GET_INTERVIEWS_FULFILLED,
  GET_INTERVIEWS_REJECTED,
  ADD_INTERVIEWS_FETCHING,
  ADD_INTERVIEWS_FULFILLED,
  ADD_INTERVIEWS_REJECTED,
  DELETE_INTERVIEWS_FETCHING,
  DELETE_INTERVIEWS_FULFILLED,
  DELETE_INTERVIEWS_REJECTED,
  UPDATE_INTERVIEWS_FETCHING,
  UPDATE_INTERVIEWS_FULFILLED,
  UPDATE_INTERVIEWS_REJECTED
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: false,
  interview: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INTERVIEWS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_INTERVIEWS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_INTERVIEWS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case ADD_INTERVIEWS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_INTERVIEWS_FULFILLED:
      return {
        ...state,
        isLoading: false
      };
    case ADD_INTERVIEWS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case DELETE_INTERVIEWS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_INTERVIEWS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((interview) => interview._id !== action.payload)
      };
    case DELETE_INTERVIEWS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case UPDATE_INTERVIEWS_FETCHING:
      return {
        ...state,
        isLoading: true,
        selectInterview: initialState.selectInterview
      };
    case UPDATE_INTERVIEWS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        selectInterview: action.payload
      };
    case UPDATE_INTERVIEWS_REJECTED:
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
