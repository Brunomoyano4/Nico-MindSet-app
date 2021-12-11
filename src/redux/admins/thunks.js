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
  updateAdminsRejected,
  getAdminFetching,
  getAdminFulfilled,
  getAdminRejected
} from './actions';

const URL = 'http://localhost:4000/api/admins';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsFetching());
    fetch(URL)
      .then((data) => data.json())
      .then((response) => {
        dispatch(getAdminsFulfilled(response));
      })
      .catch((error) => {
        dispatch(getAdminsRejected(error));
      });
  };
};

export const addAdmin = (admin) => {
  return (dispatch) => {
    dispatch(addAdminsFetching());
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(admin)
    });
  };
};

export const deleteAdmin = (id) => {
  return (dispatch) => {
    dispatch(deleteAdminsFetching());
    fetch(`${URL}/${id}`, { method: 'DELETE' })
      .then((data) => data.json())
      .then(() => {
        dispatch(deleteAdminsFulfilled(id));
      })
      .catch((error) => {
        dispatch(deleteAdminsRejected(error));
      });
  };
};

export const updateAdmin = (adminId, admin) => {
  return (dispatch) => {
    dispatch(updateAdminsFetching());
    fetch(`${URL}/${adminId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(admin)
    })
      .then((data) => data.json())
      .then(() => {
        dispatch(updateAdminsFulfilled(adminId));
      })
      .catch((error) => {
        dispatch(updateAdminsRejected(error));
      });
  };
};

export const getAdmin = (id) => {
  return (dispatch) => {
    dispatch(getAdminFetching());
    fetch(`${URL}/${id}`)
      .then((data) => data.json())
      .then((response) => {
        dispatch(getAdminFulfilled(response));
      })
      .catch((error) => {
        dispatch(getAdminRejected(error));
      });
  };
};
