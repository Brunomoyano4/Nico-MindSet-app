import {
  GET_PSYCHOLOGISTS_FETCHING,
  GET_PSYCHOLOGISTS_FULFILLED,
  GET_PSYCHOLOGISTS_REJECTED,
  ADD_PSYCHOLOGIST_FETCHING,
  ADD_PSYCHOLOGIST_FULFILLED,
  ADD_PSYCHOLOGIST_REJECTED,
  DELETE_PSYCHOLOGIST_FETCHING,
  DELETE_PSYCHOLOGIST_FULFILLED,
  DELETE_PSYCHOLOGIST_REJECTED,
  UPDATE_PSYCHOLOGIST_FETCHING,
  UPDATE_PSYCHOLOGIST_FULFILLED,
  UPDATE_PSYCHOLOGIST_REJECTED,
  CLEAR_PSYCHOLOGIST_ERROR
} from './constants';

export const getPsychologistsFetching = () => {
  return {
    type: GET_PSYCHOLOGISTS_FETCHING
  };
};

export const getPsychologistsFulfilled = (data) => {
  return {
    type: GET_PSYCHOLOGISTS_FULFILLED,
    payload: data
  };
};

export const getPsychologistsRejected = (error) => {
  return {
    type: GET_PSYCHOLOGISTS_REJECTED,
    payload: error
  };
};

export const addPsychologistFetching = () => {
  return {
    type: ADD_PSYCHOLOGIST_FETCHING
  };
};

export const addPsychologistsFulfilled = (data) => {
  return {
    type: ADD_PSYCHOLOGIST_FULFILLED,
    payload: data
  };
};

export const addProfileRejected = (error) => {
  return {
    type: ADD_PSYCHOLOGIST_REJECTED,
    payload: error
  };
};

export const deleteProfileFetching = () => {
  return {
    type: DELETE_PSYCHOLOGIST_FETCHING
  };
};

export const deleteProfileFulfilled = (data) => {
  return {
    type: DELETE_PSYCHOLOGIST_FULFILLED,
    payload: data
  };
};

export const deleteProfileRejected = (error) => {
  return {
    type: DELETE_PSYCHOLOGIST_REJECTED,
    payload: error
  };
};

export const updateProfileFetching = () => {
  return {
    type: UPDATE_PSYCHOLOGIST_FETCHING
  };
};

export const updateProfileFulfilled = (id) => {
  return {
    type: UPDATE_PSYCHOLOGIST_FULFILLED,
    payload: id
  };
};

export const updateProfileRejected = (error) => {
  return {
    type: UPDATE_PSYCHOLOGIST_REJECTED,
    payload: error
  };
};

export const clearProfilesError = () => {
  return {
    type: CLEAR_PSYCHOLOGIST_ERROR
  };
};
