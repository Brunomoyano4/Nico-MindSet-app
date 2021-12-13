import {
  getPostulantsFetching,
  getPostulantsFulfilled,
  getPostulantsRejected,
  addPostulantsFetching,
  addPostulantsFulfilled,
  addPostulantsRejected,
  deletePostulantsFetching,
  deletePostulantsFulfilled,
  deletePostulantsRejected,
  updatePostulantsFetching,
  updatePostulantsFulfilled,
  updatePostulantsRejected
} from './actions';

const URL = `${process.env.REACT_APP_API}/postulants`;

export const getPostulants = () => {
  return (dispatch) => {
    dispatch(getPostulantsFetching());
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
        dispatch(getPostulantsFulfilled(response));
      })
      .catch((error) => {
        dispatch(getPostulantsRejected(error.toString()));
      });
  };
};

export const addClient = (client) => {
  return (dispatch) => {
    dispatch(addPostulantsFetching());
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(client)
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
        dispatch(addPostulantsFulfilled(response));
      })
      .catch((error) => {
        dispatch(addPostulantsRejected(error.toString()));
      });
  };
};

export const updateClient = (clientId, client) => {
  return (dispatch) => {
    dispatch(updatePostulantsFetching());
    return fetch(`${URL}/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(client)
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
        dispatch(updatePostulantsFulfilled(response));
      })
      .catch((error) => {
        dispatch(updatePostulantsRejected(error.toString()));
      });
  };
};

export const deleteClient = (id) => {
  return (dispatch) => {
    dispatch(deletePostulantsFetching());
    fetch(`${URL}/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deletePostulantsFulfilled(id));
      })
      .catch((error) => {
        dispatch(deletePostulantsRejected(error.toString()));
      });
  };
};
