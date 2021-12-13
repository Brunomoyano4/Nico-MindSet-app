import {
  GET_PROFILES_FETCHING,
  GET_PROFILES_FULFILLED,
  GET_PROFILES_REJECTED,
  ADD_PROFILES_FETCHING,
  ADD_PROFILES_FULFILLED,
  ADD_PROFILES_REJECTED,
  DELETE_PROFILES_FETCHING,
  DELETE_PROFILES_FULFILLED,
  DELETE_PROFILES_REJECTED,
  UPDATE_PROFILES_FETCHING,
  UPDATE_PROFILES_FULFILLED,
  UPDATE_PROFILES_REJECTED,
  CLEAR_PROFILES_ERROR
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: '',
  profile: []
};

const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILES_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROFILES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_PROFILES_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case ADD_PROFILES_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_PROFILES_FULFILLED:
      state.list.push(action.payload);
      return {
        ...state,
        isLoading: false,
        list: [...state.list]
      };
    case ADD_PROFILES_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case DELETE_PROFILES_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PROFILES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((profiles) => profiles._id !== action.payload)
      };
    case DELETE_PROFILES_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case UPDATE_PROFILES_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_PROFILES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((el) => {
          return el._id === action.payload._id ? action.payload : el;
        })
      };
    case UPDATE_PROFILES_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case CLEAR_PROFILES_ERROR:
      return {
        ...state,
        error: ''
      };
    default:
      return state;
  }
};

export default profilesReducer;
