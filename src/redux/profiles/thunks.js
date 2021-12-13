import {
  getProfilesFetching,
  getProfilesFulfilled,
  getProfilesRejected,
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

export const getProfiles = () => {
  return (dispatch) => {
    dispatch(getProfilesFetching());
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
        dispatch(getProfilesFulfilled(response));
      })
      .catch((error) => {
        dispatch(getProfilesRejected(error.toString()));
      });
  };
};

export const addProfile = (profile) => {
  return (dispatch) => {
    dispatch(addProfileFetching());
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
    dispatch(deleteProfileFetching());
    return fetch(`${URL}/${profileId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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
        dispatch(deleteProfileFulfilled(response));
      })
      .catch((error) => {
        dispatch(deleteProfileRejected(error.toString()));
      });
  };
};

export const deleteProfile = (id) => {
  return (dispatch) => {
    dispatch(updateProfileFetching());
    fetch(`${URL}/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(updateProfileFulfilled(id));
      })
      .catch((error) => {
        dispatch(updateProfileRejected(error.toString()));
      });
  };
};
