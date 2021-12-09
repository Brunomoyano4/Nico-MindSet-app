import { useState } from 'react';
import styles from './form.module.css';
import Modal from '../../Shared/Modal';
import Input from '../../Shared/Input';

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
  const [disableButton, setDisableButton] = useState(false);

  function savePositions(e) {
    e.stopPropagation();
    setDisableButton(true);
    fetch(`${process.env.REACT_APP_API}/positions`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(position)
    })
      .then((response) => {
        if (response.status === 201) {
          setCreated(true);
        } else
          return response.json().then((error) => {
            throw new Error(error);
          });
      })
      .catch((error) => setError(error.toString()));
  }
  function updatePosition(e) {
    e.stopPropagation();
    setDisableButton(true);
    fetch(`${process.env.REACT_APP_API}/positions/${position._id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(position)
    })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .catch((error) => setError(error.toString()));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setPosition({ ...position, [name]: value });
  }

  return (
    <div>
      {created ? (
        <div>position created</div>
      ) : (
        <form className={styles.positionsForm}>
          <Input
            label="Id"
            name="clientId"
            id="id"
            type="text"
            value={position.clientId}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Job"
            name="job"
            id="job"
            type="text"
            value={position.job}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Description"
            name="description"
            id="description"
            type="text"
            value={position.description}
            onChange={handleInputChange}
            required
          />
          <button
            onClick={(e) => {
              params.position._id ? updatePosition(e) : savePositions(e);
            }}
            disabled={disableButton}
          >
            {params.position._id ? 'Update Position' : 'Create position'}
          </button>
        </form>
      )}
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => setError('')}
        type={'Error'}
      />
    </div>
  );
}

export default Form;
