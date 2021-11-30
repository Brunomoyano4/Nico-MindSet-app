import { useState } from 'react';

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
      .then((response) => response.json())
      .then((response) => {
        if (response.clientId === position.clientId) {
          setCreated(true);
        }
      });
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
      .then((response) => {
        if (response.clientId === position.clientId) {
          console.log('Position Updated!');
        }
      });
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
        <form>
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
              console.log(params);
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
