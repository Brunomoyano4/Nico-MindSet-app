import {
  getPositionsFetching,
  getPositionsFulfilled,
  getPositionsRejected,
  getPositionByIdFetching,
  getPositionByIdFulfilled,
  getPositionByIdRejected,
  getPositionOptionsFulfilled,
  getPositionOptionsRejected,
  getPositionOptionsFetching,
  addPositionsFetching,
  addPositionsFulfilled,
  addPositionsRejected,
  deletePositionsFetching,
  deletePositionsFulfilled,
  deletePositionsRejected,
  updatePositionsFetching,
  updatePositionsFulfilled,
  updatePositionsRejected
} from './actions';

const URL = `${process.env.REACT_APP_API}/positions`;
let token;

export const getPositions = () => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(getPositionsFetching());
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
        dispatch(getPositionsFulfilled(response));
        return response;
      })
      .catch((error) => {
        dispatch(getPositionsRejected(error.toString()));
      });
  };
};

export const getPositionById = (id) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(getPositionByIdFetching());
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
        dispatch(getPositionByIdFulfilled(response));
        return response;
      })
      .catch((error) => {
        dispatch(getPositionByIdRejected(error.toString()));
      });
  };
};

export const getPositionsOptions = (resource) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(getPositionOptionsFetching());
    fetch(`${process.env.REACT_APP_API}/${resource}`, { headers: { token } })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(getPositionOptionsFulfilled(resource, data));
        }
        const data = await res.json();
        dispatch(getPositionOptionsRejected(data));
      })
      .catch((error) => {
        dispatch(getPositionOptionsRejected(error.toString()));
      });
  };
};

export const addPosition = (position) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(addPositionsFetching());
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(position)
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
        dispatch(addPositionsFulfilled(response));
        return response;
      })
      .catch((error) => {
        dispatch(addPositionsRejected(error.toString()));
      });
  };
};

export const updatePosition = (positionId, position) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(updatePositionsFetching());
    return fetch(`${URL}/${positionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(position)
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
        dispatch(updatePositionsFulfilled(response));
        return response;
      })
      .catch((error) => {
        dispatch(updatePositionsRejected(error.toString()));
      });
  };
};

export const deletePosition = (id) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(deletePositionsFetching());
    fetch(`${URL}/${id}`, { method: 'DELETE', headers: { token } })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deletePositionsFulfilled(id));
      })
      .catch((error) => {
        dispatch(deletePositionsRejected(error.toString()));
      });
  };
};
