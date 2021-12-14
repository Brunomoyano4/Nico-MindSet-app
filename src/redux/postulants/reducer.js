import {
  GET_POSTULANTS_FETCHING,
  GET_POSTULANTS_FULFILLED,
  GET_POSTULANTS_REJECTED,
  GET_POSTULANTS_BY_ID_FETCHING,
  GET_POSTULANTS_BY_ID_FULFILLED,
  GET_POSTULANTS_BY_ID_REJECTED,
  ADD_POSTULANTS_FETCHING,
  ADD_POSTULANTS_FULFILLED,
  ADD_POSTULANTS_REJECTED,
  DELETE_POSTULANTS_FETCHING,
  DELETE_POSTULANTS_FULFILLED,
  DELETE_POSTULANTS_REJECTED,
  UPDATE_POSTULANTS_FETCHING,
  UPDATE_POSTULANTS_FULFILLED,
  UPDATE_POSTULANTS_REJECTED,
  CLEAR_POSTULANTS_ERROR
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: '',
  selectedPostulant: {}
};

const postulantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_POSTULANTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_POSTULANTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case GET_POSTULANTS_BY_ID_FETCHING:
      return {
        ...state,
        isLoading: true,
        selectedPostulant: initialState.selectedPostulant
      };
    case GET_POSTULANTS_BY_ID_FULFILLED:
      return {
        ...state,
        isLoading: false,
        selectedPostulant: action.payload
      };
    case GET_POSTULANTS_BY_ID_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case ADD_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_POSTULANTS_FULFILLED:
      state.list.push(action.payload);
      return {
        ...state,
        isLoading: false,
        list: [...state.list]
      };
    case ADD_POSTULANTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case DELETE_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_POSTULANTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((el) => el._id !== action.payload)
      };
    case DELETE_POSTULANTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case UPDATE_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_POSTULANTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((el) => {
          return el._id === action.payload._id ? action.payload : el;
        })
      };
    case UPDATE_POSTULANTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case CLEAR_POSTULANTS_ERROR:
      return {
        ...state,
        error: ''
      };
    default:
      return state;
  }
};

export default postulantsReducer;