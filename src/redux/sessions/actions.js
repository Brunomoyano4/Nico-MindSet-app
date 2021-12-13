import {
  GET_SESSIONS_FETCHING,
  GET_SESSIONS_FULFILLED,
  GET_SESSIONS_REJECTED,
  ADD_SESSIONS_FETCHING,
  ADD_SESSIONS_FULFILLED,
  ADD_SESSIONS_REJECTED,
  DELETE_SESSIONS_FETCHING,
  DELETE_SESSIONS_FULFILLED,
  DELETE_SESSIONS_REJECTED,
  UPDATE_SESSIONS_FETCHING,
  UPDATE_SESSIONS_FULFILLED,
  UPDATE_SESSIONS_REJECTED,
  CLEAR_SESSIONS_ERROR
} from './constants';

export const getSessionsFetching = () => ({
  type: GET_SESSIONS_FETCHING
});

export const getSessionsFulfilled = (payload) => ({
  type: GET_SESSIONS_FULFILLED,
  payload
});

export const getSessionsRejected = (error) => ({
  type: GET_SESSIONS_REJECTED,
  error
});

export const addSessionsFetching = () => ({
  type: ADD_SESSIONS_FETCHING
});

export const addSessionsFulfilled = (payload) => ({
  type: ADD_SESSIONS_FULFILLED,
  payload
});

export const addSessionsRejected = (error) => ({
  type: ADD_SESSIONS_REJECTED,
  error
});

export const deleteSessionsFetching = () => ({
  type: DELETE_SESSIONS_FETCHING
});

export const deleteSessionsFulfilled = (payload) => ({
  type: DELETE_SESSIONS_FULFILLED,
  payload
});

export const deleteSessionsRejected = (error) => ({
  type: DELETE_SESSIONS_REJECTED,
  error
});

export const updateSessionsFetching = () => ({
  type: UPDATE_SESSIONS_FETCHING
});

export const updateSessionsFulfilled = (payload) => ({
  type: UPDATE_SESSIONS_FULFILLED,
  payload
});

export const updateSessionsRejected = (error) => ({
  type: UPDATE_SESSIONS_REJECTED,
  error
});

export const clearSessionsError = () => ({
  type: CLEAR_SESSIONS_ERROR
});
