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

export const getAdminsFetching = () => ({
  type: GET_ADMINS_FETCHING
});

export const getAdminsFulfilled = (payload) => ({
  type: GET_ADMINS_FULFILLED,
  payload
});

export const getAdminsRejected = (error) => ({
  type: GET_ADMINS_REJECTED,
  error
});

export const addAdminsFetching = () => ({
  type: ADD_ADMINS_FETCHING
});

export const addAdminsFulfilled = (payload) => ({
  type: ADD_ADMINS_FULFILLED,
  payload
});

export const addAdminsRejected = (error) => ({
  type: ADD_ADMINS_REJECTED,
  error
});

export const deleteAdminsFetching = () => ({
  type: DELETE_ADMINS_FETCHING
});

export const deleteAdminsFulfilled = (payload) => ({
  type: DELETE_ADMINS_FULFILLED,
  payload
});

export const deleteAdminsRejected = (error) => ({
  type: DELETE_ADMINS_REJECTED,
  error
});

export const updateAdminsFetching = () => ({
  type: UPDATE_ADMINS_FETCHING
});

export const updateAdminsFulfilled = (payload) => ({
  type: UPDATE_ADMINS_FULFILLED,
  payload
});

export const updateAdminsRejected = (error) => ({
  type: UPDATE_ADMINS_REJECTED,
  error
});
