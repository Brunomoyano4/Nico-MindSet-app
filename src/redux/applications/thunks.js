import {
  getApplicationsFetching,
  getApplicationsFulfilled,
  getApplicationsRejected,
  addApplicationsFetching,
  addApplicationsFulfilled,
  addApplicationsRejected,
  deleteApplicationsFetching,
  deleteApplicationsFulfilled,
  deleteApplicationsRejected,
  updateApplicationsFetching,
  updateApplicationsFulfilled,
  updateApplicationsRejected
} from './actions';

export const getApplications = () => {
  return (dispatch) => {
    dispatch(getApplicationsFetching());
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((data) => data.json())
      .then((response) => {
        dispatch(getApplicationsFulfilled(response));
      })
      .catch((error) => {
        dispatch(getApplicationsRejected(error));
      });
  };
};

export const addApplications = (application) => {
  return (dispatch) => {
    dispatch(addApplicationsFetching());
    fetch(`${process.env.REACT_APP_API}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(application)
    })
      .then((data) => data.json())
      .then((response) => {
        dispatch(addApplicationsFulfilled(response));
      })
      .catch((error) => {
        dispatch(addApplicationsRejected(error));
      });
  };
};

export const deleteApplications = (id) => {
  return (dispatch) => {
    dispatch(deleteApplicationsFetching());
    fetch(`${process.env.REACT_APP_API}/applications/${id}`, { method: 'DELETE' })
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

export const updateApplications = (applicationId, application) => {
  return (dispatch) => {
    dispatch(updateApplicationsFetching());
    (fetch(`${process.env.REACT_APP_API}/applications/${applicationId}`),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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
        dispatch(updateApplicationsFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(updateApplicationsRejected(error.toString()));
      });
  };
};
