import {
  getProfilesFetching,
  getProfilesFulfilled,
  getProfilesRejected,
  getProfileByIdFetching,
  getProfileByIdFulfilled,
  getProfileByIdRejected,
  addProfileFetching,
  addProfileFulfilled,
  addProfileRejected,
  deleteProfileFetching,
  deleteProfileFulfilled,
  deleteProfileRejected,
  updateProfileFetching,
  updateProfileFulfilled,
  updateProfileRejected
} from './actions';

const URL = `${process.env.REACT_APP_API}/profiles`;
const token = sessionStorage.getItem('token');

export const getProfiles = () => {
  return (dispatch) => {
    dispatch(getProfilesFetching());
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
        dispatch(getProfilesFulfilled(response));
      })
      .catch((error) => {
        dispatch(getProfilesRejected(error.toString()));
      });
  };
};

export const getProfileById = (id) => {
  return (dispatch) => {
    dispatch(getProfileByIdFetching());
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
        dispatch(getProfileByIdFulfilled(response));
        return response;
      })
      .catch((error) => {
        dispatch(getProfileByIdRejected(error.toString()));
      });
  };
};

export const addProfile = (profile) => {
  return (dispatch) => {
    dispatch(addProfileFetching());
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(profile)
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
        dispatch(addProfileFulfilled(response));
      })
      .catch((error) => {
        dispatch(addProfileRejected(error.toString()));
      });
  };
};

export const updateProfile = (profileId, profile) => {
  return (dispatch) => {
    dispatch(updateProfileFetching());
    return fetch(`${URL}/${profileId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(profile)
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
        dispatch(updateProfileFulfilled(response));
      })
      .catch((error) => {
        dispatch(updateProfileRejected(error.toString()));
      });
  };
};

export const deleteProfile = (id) => {
  return (dispatch) => {
    dispatch(deleteProfileFetching());
    fetch(`${URL}/${id}`, { method: 'DELETE', headers: { token } })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deleteProfileFulfilled(id));
      })
      .catch((error) => {
        dispatch(deleteProfileRejected(error.toString()));
      });
  };
};
