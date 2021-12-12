import {
  GET_CLIENTS_FETCHING,
  GET_CLIENTS_FULFILLED,
  GET_CLIENTS_REJECTED,
  ADD_CLIENTS_FETCHING,
  ADD_CLIENTS_FULFILLED,
  ADD_CLIENTS_REJECTED,
  DELETE_CLIENTS_FETCHING,
  DELETE_CLIENTS_FULFILLED,
  DELETE_CLIENTS_REJECTED,
  UPDATE_CLIENTS_FETCHING,
  UPDATE_CLIENTS_FULFILLED,
  UPDATE_CLIENTS_REJECTED
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: false,
  position: []
};

const clientsReducer = (state = initialState, action) => {};

export default clientsReducer;
