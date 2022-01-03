import {
  getApplicationsFetching,
  getApplicationsFulfilled,
  getApplicationsRejected,
  getApplicationsByIdFetching,
  getApplicationsByIdFulfilled,
  getApplicationsByIdRejected,
  addApplicationsFetching,
  addApplicationsFulfilled,
  addApplicationsRejected,
  updateApplicationsFetching,
  updateApplicationsFulfilled,
  updateApplicationsRejected,
  deleteApplicationsFetching,
  deleteApplicationsFulfilled,
  deleteApplicationsRejected,
  getApplicationsOptionsFetching,
  getApplicationsOptionsFulfilled,
  getApplicationsOptionsRejected
} from './actions';

const URL = `${process.env.REACT_APP_API}/applications`;
const token = sessionStorage.getItem('token');

export const getApplications = () => {
  return (dispatch) => {
    dispatch(getApplicationsFetching());
    return fetch(URL, { headers: { token } })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getApplicationsFulfilled(response));
      })
      .catch((error) => {
        dispatch(getApplicationsRejected(error.toString()));
      });
  };
};

export const getApplicationsById = (id) => {
  return (dispatch) => {
    dispatch(getApplicationsByIdFetching());
    return fetch(`${URL}/${id}`, { headers: { token } })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getApplicationsByIdFulfilled(response));
        return response;
      })
      .catch((error) => {
        dispatch(getApplicationsByIdRejected(error.toString()));
      });
  };
};

export const addApplications = (application) => {
  return (dispatch) => {
    dispatch(addApplicationsFetching());
    return fetch(`${process.env.REACT_APP_API}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(application)
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
        dispatch(addApplicationsFulfilled(response));
      })
      .catch((error) => {
        dispatch(addApplicationsRejected(error.toString()));
      });
  };
};

export const updateApplications = (applicationId, application) => {
  return (dispatch) => {
    dispatch(updateApplicationsFetching());
    return fetch(`${URL}/${applicationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(application)
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
        dispatch(updateApplicationsFulfilled(response));
      })
      .catch((error) => {
        dispatch(updateApplicationsRejected(error.toString()));
      });
  };
};

export const deleteApplications = (id) => {
  return (dispatch) => {
    dispatch(deleteApplicationsFetching());
    fetch(`${URL}/${id}`, { method: 'DELETE', headers: { token } })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deleteApplicationsFulfilled(id));
      })
      .catch((error) => {
        dispatch(deleteApplicationsRejected(error.toString()));
      });
  };
};

export const getApplicationsOptions = (resource) => {
  return (dispatch) => {
    dispatch(getApplicationsOptionsFetching());
    fetch(`${process.env.REACT_APP_API}/${resource}`, { headers: { token } })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(getApplicationsOptionsFulfilled(resource, data));
        }
        const data = await res.json();
        dispatch(getApplicationsOptionsRejected(data));
      })
      .catch((error) => {
        dispatch(getApplicationsOptionsRejected(error.toString()));
      });
  };
};
