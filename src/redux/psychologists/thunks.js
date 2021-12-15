import {
  getPsychologistsFetching,
  getPsychologistsFulfilled,
  getPsychologistsRejected,
  addPsychologistFetching,
  addPsychologistFulfilled,
  addPsychologistRejected,
  deletePsychologistFetching,
  deletePsychologistFulfilled,
  deletePsychologistRejected,
  updatePsychologistFetching,
  updatePsychologistFulfilled,
  updatePsychologistRejected
} from './actions';

const URL = `${process.env.REACT_APP_API}/psychologists`;

export const getPsychologists = () => {
  return (dispatch) => {
    dispatch(getPsychologistsFetching());
    return fetch(URL)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getPsychologistsFulfilled(response));
      })
      .catch((error) => {
        dispatch(getPsychologistsRejected(error.toString()));
      });
  };
};

export const addPsychologist = (psychologist) => {
  return (dispatch) => {
    dispatch(addPsychologistFetching());
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(psychologist)
    })
      .then((response) => {
        if (response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(addPsychologistFulfilled(response));
      })
      .catch((error) => {
        dispatch(addPsychologistRejected(error.toString()));
      });
  };
};

export const updatePsychologist = (psychologistId, psychologist) => {
  return (dispatch) => {
    dispatch(updatePsychologistFetching());
    return fetch(`${URL}/${psychologistId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(psychologist)
    })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(updatePsychologistFulfilled(response));
      })
      .catch((error) => {
        dispatch(updatePsychologistRejected(error.toString()));
      });
  };
};

export const deletePsychologist = (id) => {
  return (dispatch) => {
    dispatch(deletePsychologistFetching());
    fetch(`${URL}/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deletePsychologistFulfilled(id));
      })
      .catch((error) => {
        dispatch(deletePsychologistRejected(error.toString()));
      });
  };
};
