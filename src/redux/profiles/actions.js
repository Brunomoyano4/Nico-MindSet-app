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

export const getProfilesFetching = () => {
  return {
    type: GET_PROFILES_FETCHING
  };
};

export const getProfilesFulfilled = (data) => {
  return {
    type: GET_PROFILES_FULFILLED,
    payload: data
  };
};

export const getProfilesRejected = (error) => {
  return {
    type: GET_PROFILES_REJECTED,
    payload: error
  };
};

export const createProfileFetching = () => {
  return {
    type: ADD_PROFILES_FETCHING
  };
};

export const createProfileFulfilled = (data) => {
  return {
    type: ADD_PROFILES_FULFILLED,
    payload: data
  };
};

export const createProfileRejected = (error) => {
  return {
    type: ADD_PROFILES_REJECTED,
    payload: error
  };
};

export const updateProfileFetching = () => {
  return {
    type: DELETE_PROFILES_FETCHING
  };
};

export const updateProfileFulfilled = (data) => {
  return {
    type: DELETE_PROFILES_FULFILLED,
    payload: data
  };
};

export const updateProfileRejected = (error) => {
  return {
    type: DELETE_PROFILES_REJECTED,
    payload: error
  };
};

export const deleteProfileFetching = () => {
  return {
    type: UPDATE_PROFILES_FETCHING
  };
};

export const deleteProfileFulfilled = (id) => {
  return {
    type: UPDATE_PROFILES_FULFILLED,
    payload: id
  };
};

export const deleteProfileRejected = (error) => {
  return {
    type: UPDATE_PROFILES_REJECTED,
    payload: error
  };
};

export const cleanError = () => {
  return {
    type: CLEAR_PROFILES_ERROR
  };
};
