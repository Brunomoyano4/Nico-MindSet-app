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

export const getApplicationsFetching = () => ({
  type: GET_APPLICATIONS_FETCHING
});

export const getApplicationsFulfilled = (payload) => ({
  type: GET_APPLICATIONS_FULFILLED,
  payload
});

export const getApplicationsRejected = (error) => ({
  type: GET_APPLICATIONS_REJECTED,
  error
});

export const addApplicationsFetching = () => ({
  type: ADD_APPLICATIONS_FETCHING
});

export const addApplicationsFulfilled = (payload) => ({
  type: ADD_APPLICATIONS_FULFILLED,
  payload
});

export const addApplicationsRejected = (error) => ({
  type: ADD_APPLICATIONS_REJECTED,
  error
});

export const deleteApplicationsFetching = () => ({
  type: DELETE_APPLICATIONS_FETCHING
});

export const deleteApplicationsFulfilled = (id) => ({
  type: DELETE_APPLICATIONS_FULFILLED,
  payload: id
});

export const deleteApplicationsRejected = (error) => ({
  type: DELETE_APPLICATIONS_REJECTED,
  error
});

export const updateApplicationsFetching = () => ({
  type: UPDATE_APPLICATIONS_FETCHING
});

export const updateApplicationsFulfilled = (payload) => ({
  type: UPDATE_APPLICATIONS_FULFILLED,
  payload
});

export const updateApplicationsRejected = (error) => ({
  type: UPDATE_APPLICATIONS_REJECTED,
  error
});
