import {
  getAdminsFetching,
  getAdminsFulfilled,
  getAdminsRejected,
  addAdminsFetching,
  addAdminsFulfilled,
  addAdminsRejected,
  deleteAdminsFetching,
  deleteAdminsFulfilled,
  deleteAdminsRejected,
  updateAdminsFetching,
  updateAdminsFulfilled,
  updateAdminsRejected
} from './actions';

const URL = `${process.env.REACT_APP_API}/admins`;

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsFetching());
    return fetch(URL)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getAdminsFulfilled(response));
      })
      .catch((error) => {
        dispatch(getAdminsRejected(error.toString()));
      });
  };
};

export const addAdmin = (admin) => {
  return (dispatch) => {
    dispatch(addAdminsFetching());
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(admin)
    })
      .then((response) => {
        if (response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        dispatch(addAdminsFulfilled());
      })
      .catch((error) => {
        dispatch(addAdminsRejected(error.toString()));
      });
  };
};

export const updateAdmin = (adminId, admin) => {
  return (dispatch) => {
    dispatch(updateAdminsFetching());
    return fetch(`${URL}/${adminId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(admin)
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
        dispatch(updateAdminsFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(updateAdminsRejected(error.toString()));
      });
  };
};

export const deleteAdmin = (id) => {
  return (dispatch) => {
    dispatch(deleteAdminsFetching());
    fetch(`${URL}/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deleteAdminsFulfilled(id));
      })
      .catch((error) => {
        dispatch(deleteAdminsRejected(error.toString()));
      });
  };
};
