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

export const addProfileFetching = () => {
  return {
    type: ADD_PROFILE_FETCHING
  };
};

export const addProfileFulfilled = (data) => {
  return {
    type: ADD_PROFILE_FULFILLED,
    payload: data
  };
};

export const addProfileRejected = (error) => {
  return {
    type: ADD_PROFILE_REJECTED,
    payload: error
  };
};

export const deleteProfileFetching = () => {
  return {
    type: DELETE_PROFILE_FETCHING
  };
};

export const deleteProfileFulfilled = (data) => {
  return {
    type: DELETE_PROFILE_FULFILLED,
    payload: data
  };
};

export const deleteProfileRejected = (error) => {
  return {
    type: DELETE_PROFILE_REJECTED,
    payload: error
  };
};

export const updateProfileFetching = () => {
  return {
    type: UPDATE_PROFILE_FETCHING
  };
};

export const updateProfileFulfilled = (id) => {
  return {
    type: UPDATE_PROFILE_FULFILLED,
    payload: id
  };
};

export const updateProfileRejected = (error) => {
  return {
    type: UPDATE_PROFILE_REJECTED,
    payload: error
  };
};

export const clearProfilesError = () => {
  return {
    type: CLEAR_PROFILES_ERROR
  };
};
