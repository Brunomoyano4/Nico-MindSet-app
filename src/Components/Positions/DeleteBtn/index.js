import { useState } from 'react';
function DeleteBtn({ positionId, positions, filterPosition }) {
  const [error, setError] = useState('');
  function DeletePositions(Id, event) {
    event.stopPropagation();
    fetch(`${process.env.REACT_APP_API}/positions/${Id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not fetch data properly');
        }
        return response.json();
      })
      .then((response) => {
        if (response._id === Id) {
          const filtered = positions.filter((position) => position.positionId != Id);
          filterPosition(filtered);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div>
      <button onClick={(e) => DeletePositions(positionId, e, error)}>Delete</button>
      <h4>{error}</h4>
    </div>
  );
}

export default DeleteBtn;
