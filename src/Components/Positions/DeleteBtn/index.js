import { useState } from 'react';
import Modal from '../../Shared/Modal';

function DeleteBtn({ positionId, positions, filterPosition }) {
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const deletePositions = (Id, event) => {
    event.stopPropagation();
    fetch(`${process.env.REACT_APP_API}/positions/${Id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        // ?????
        return response.json();
      })
      .then((response) => {
        if (response._id === Id) {
          const filtered = positions.filter((position) => position.positionId != Id);
          filterPosition(filtered);
        }
      })
      .catch((error) => setError(error.toString()));
  };

  return (
    <>
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowConfirmModal(true);
          }}
        >
          Delete
        </button>
        <h4>{error}</h4>
      </div>
      <Modal
        title="Are you sure you want to delete the selected position?"
        onConfirm={(e) => deletePositions(positionId, e, error)}
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => setError('')}
        type={'Error'}
      />
    </>
  );
}

export default DeleteBtn;
