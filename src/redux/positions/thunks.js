import {
  getPositionsFetching,
  getPositionsFulfilled,
  getPositionsRejected,
  getPositionByIdFetching,
  getPositionByIdFulfilled,
  getPositionByIdRejected,
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
const token = sessionStorage.getItem('token');

export const getPositions = () => {
  return (dispatch) => {
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
      })
      .catch((error) => {
        dispatch(getPositionsRejected(error.toString()));
      });
  };
};

export const getPositionById = (id) => {
  return (dispatch) => {
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

export const addPosition = (position) => {
  return (dispatch) => {
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
      })
      .catch((error) => {
        dispatch(addPositionsRejected(error.toString()));
      });
  };
};

export const updatePosition = (positionId, position) => {
  return (dispatch) => {
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
      })
      .catch((error) => {
        dispatch(updatePositionsRejected(error.toString()));
      });
  };
};

export const deletePosition = (id) => {
  return (dispatch) => {
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
