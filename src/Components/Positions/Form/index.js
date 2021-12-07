import { useState } from 'react';
import styles from './form.module.css';

function Form(params) {
  const initialState = params.position._id
    ? params.position
    : {
        clientId: '',
        job: '',
        description: ''
      };

  const [position, setPosition] = useState(initialState);
  const [created, setCreated] = useState(false);
  const [error, setError] = useState();

  function savePositions(e) {
    e.stopPropagation();
    fetch(`${process.env.REACT_APP_API}/positions`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(position)
    })
      .then((response) => {
        if (response.status === 201) setCreated(true);
        else
          return response.json().then((error) => {
            throw new Error(error);
          });
      })
      .catch((error) => error);
  }
  function updatePosition(e) {
    e.stopPropagation();
    fetch(`${process.env.REACT_APP_API}/positions/${position._id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(position)
    })
      .then((response) => response.json())
      .catch((error) => {
        setError(error.message);
      });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setPosition({ ...position, [name]: value });
  }

  return (
    <div>
      {error}
      {created ? (
        <div>position created</div>
      ) : (
        <form className={styles.positionsForm}>
          <label>Id</label>
          <input
            type="text"
            id="id"
            name="clientId"
            value={position.clientId}
            onChange={handleInputChange}
            required
          />
          <label>Job</label>
          <input
            type="text"
            id="job"
            name="job"
            value={position.job}
            onChange={handleInputChange}
            required
          />
          <label>Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={position.description}
            onChange={handleInputChange}
            required
          />
          <button
            onClick={(e) => {
              params.position._id ? updatePosition(e) : savePositions(e);
            }}
          >
            {params.position._id ? 'Update Position' : 'Create position'}
          </button>
        </form>
      )}
    </div>
  );
}

export default Form;
