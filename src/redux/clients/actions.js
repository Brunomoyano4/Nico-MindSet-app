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

export const getClientsFetching = () => ({
  type: GET_CLIENTS_FETCHING
});

export const getClientsFulfilled = (payload) => ({
  type: GET_CLIENTS_FULFILLED,
  payload
});

export const getClientsRejected = (error) => ({
  type: GET_CLIENTS_REJECTED,
  error
});

export const addClientsFetching = () => ({
  type: ADD_CLIENTS_FETCHING
});

export const addClientsFulfilled = (payload) => ({
  type: ADD_CLIENTS_FULFILLED,
  payload
});

export const addClientsRejected = (error) => ({
  type: ADD_CLIENTS_REJECTED,
  error
});

export const deleteClientsFetching = () => ({
  type: DELETE_CLIENTS_FETCHING
});

export const deleteClientsFulfilled = (payload) => ({
  type: DELETE_CLIENTS_FULFILLED,
  payload
});

export const deleteClientsRejected = (error) => ({
  type: DELETE_CLIENTS_REJECTED,
  error
});

export const updateClientsFetching = () => ({
  type: UPDATE_CLIENTS_FETCHING
});

export const updateClientsFulfilled = (payload) => ({
  type: UPDATE_CLIENTS_FULFILLED,
  payload
});

export const updateClientsRejected = (error) => ({
  type: UPDATE_CLIENTS_REJECTED,
  error
});
