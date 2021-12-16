import {
  GET_PROFILES_FETCHING,
  GET_PROFILES_FULFILLED,
  GET_PROFILES_REJECTED,
  ADD_PROFILE_FETCHING,
  ADD_PROFILE_FULFILLED,
  ADD_PROFILE_REJECTED,
  DELETE_PROFILE_FETCHING,
  DELETE_PROFILE_FULFILLED,
  DELETE_PROFILE_REJECTED,
  UPDATE_PROFILE_FETCHING,
  UPDATE_PROFILE_FULFILLED,
  UPDATE_PROFILE_REJECTED,
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
    case ADD_PROFILE_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_PROFILE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    case ADD_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case DELETE_PROFILE_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PROFILE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((profiles) => profiles._id !== action.payload)
      };
    case DELETE_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case UPDATE_PROFILE_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_PROFILE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((profile) => {
          return profile._id === action.payload._id ? action.payload : profile;
        })
      };
    case UPDATE_PROFILE_REJECTED:
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
