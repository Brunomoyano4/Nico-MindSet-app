import {
  getClientsFetching,
  getClientsFulfilled,
  getClientsRejected,
  addClientsFetching,
  addClientsFulfilled,
  addClientsRejected,
  deleteClientsFetching,
  deleteClientsFulfilled,
  deleteClientsRejected,
  updateClientsFetching,
  updateClientsFulfilled,
  updateClientsRejected
} from './actions';

const URL = `${process.env.REACT_APP_API}/clients`;

export const getClients = () => {
  return (dispatch) => {
    dispatch(getClientsFetching());
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
        dispatch(getClientsFulfilled(response));
      })
      .catch((error) => {
        dispatch(getClientsRejected(error.toString()));
      });
  };
};

export const addClient = (client) => {
  return (dispatch) => {
    dispatch(addClientsFetching());
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
        dispatch(addClientsFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(addClientsRejected(error.toString()));
      });
  };
};

export const updateClient = (clientId, client) => {
  return (dispatch) => {
    dispatch(updateClientsFetching());
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
        dispatch(updateClientsFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(updateClientsRejected(error.toString()));
      });
  };
};

export const deleteClient = (id) => {
  return (dispatch) => {
    dispatch(deleteClientsFetching());
    fetch(`${URL}/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deleteClientsFulfilled(id));
      })
      .catch((error) => {
        dispatch(deleteClientsRejected(error.toString()));
      });
  };
};
