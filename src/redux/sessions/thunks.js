import {
  getSessionsFetching,
  getSessionsFulfilled,
  getSessionsRejected,
  getSessionByIdFetching,
  getSessionByIdFulfilled,
  getSessionByIdRejected,
  getSessionsOptionsFulfilled,
  getSessionsOptionsRejected,
  getSessionsOptionsFetching,
  addSessionsFetching,
  addSessionsFulfilled,
  addSessionsRejected,
  deleteSessionsFetching,
  deleteSessionsFulfilled,
  deleteSessionsRejected,
  updateSessionsFetching,
  updateSessionsFulfilled,
  updateSessionsRejected
} from './actions';

const URL = `${process.env.REACT_APP_API}/sessions`;

export const getSessions = () => {
  return (dispatch) => {
    dispatch(getSessionsFetching());
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
        dispatch(getSessionsFulfilled(response));
      })
      .catch((error) => {
        dispatch(getSessionsRejected(error.toString()));
      });
  };
};

export const getSessionById = (id) => {
  return (dispatch) => {
    dispatch(getSessionByIdFetching());
    return fetch(`${URL}/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getSessionByIdFulfilled(response));
        return response;
      })
      .catch((error) => {
        dispatch(getSessionByIdRejected(error.toString()));
      });
  };
};

export const getSessionsOptions = (resource) => {
  return (dispatch) => {
    dispatch(getSessionsOptionsFetching());
    fetch(`${process.env.REACT_APP_API}/${resource}`)
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(getSessionsOptionsFulfilled(resource, data));
        }
        const data = await res.json();
        dispatch(getSessionsOptionsRejected(data));
      })
      .catch((error) => {
        dispatch(getSessionsOptionsRejected(error.toString()));
      });
  };
};

export const addSession = (session) => {
  return (dispatch) => {
    dispatch(addSessionsFetching());
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(session)
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
        dispatch(addSessionsFulfilled(response));
      })
      .catch((error) => {
        dispatch(addSessionsRejected(error.toString()));
      });
  };
};

export const updateSession = (sessionId, session) => {
  return (dispatch) => {
    dispatch(updateSessionsFetching());
    return fetch(`${URL}/${sessionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(session)
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
        dispatch(updateSessionsFulfilled(response));
      })
      .catch((error) => {
        dispatch(updateSessionsRejected(error.toString()));
      });
  };
};

export const deleteSession = (id) => {
  return (dispatch) => {
    dispatch(deleteSessionsFetching());
    fetch(`${URL}/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deleteSessionsFulfilled(id));
      })
      .catch((error) => {
        dispatch(deleteSessionsRejected(error.toString()));
      });
  };
};
