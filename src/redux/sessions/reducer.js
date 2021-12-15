import {
  GET_SESSIONS_FETCHING,
  GET_SESSIONS_FULFILLED,
  GET_SESSIONS_REJECTED,
  GET_SESSION_BY_ID_FETCHING,
  GET_SESSION_BY_ID_FULFILLED,
  GET_SESSION_BY_ID_REJECTED,
  ADD_SESSIONS_FETCHING,
  ADD_SESSIONS_FULFILLED,
  ADD_SESSIONS_REJECTED,
  DELETE_SESSIONS_FETCHING,
  DELETE_SESSIONS_FULFILLED,
  DELETE_SESSIONS_REJECTED,
  UPDATE_SESSIONS_FETCHING,
  UPDATE_SESSIONS_FULFILLED,
  UPDATE_SESSIONS_REJECTED,
  CLEAR_SESSIONS_ERROR,
  CLEAR_SELECTED_SESSION
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: '',
  session: [],
  selectedItem: {}
};

const sessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SESSIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_SESSIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case GET_SESSION_BY_ID_FETCHING:
      return {
        ...state,
        isLoading: true,
        selectedItem: initialState.selectedItem
      };
    case GET_SESSION_BY_ID_FULFILLED:
      return {
        ...state,
        isLoading: false,
        selectedItem: action.payload
      };
    case GET_SESSION_BY_ID_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case ADD_SESSIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_SESSIONS_FULFILLED:
      state.list.push(action.payload);
      return {
        ...state,
        isLoading: false,
        list: [...state.list]
      };
    case ADD_SESSIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case DELETE_SESSIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_SESSIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((el) => el._id !== action.payload)
      };
    case DELETE_SESSIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case UPDATE_SESSIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_SESSIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((el) => {
          return el._id === action.payload._id ? action.payload : el;
        })
      };
    case UPDATE_SESSIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case CLEAR_SESSIONS_ERROR:
      return {
        ...state,
        error: ''
      };
    case CLEAR_SELECTED_SESSION: {
      return {
        ...state,
        selectedItem: initialState.selectedItem
      };
    }
    default:
      return state;
  }
};

export default sessionsReducer;
