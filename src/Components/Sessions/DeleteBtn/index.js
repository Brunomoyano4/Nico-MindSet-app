import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../../Shared/Modal';

const DeleteBtn = ({ sessionId, sessions, filterSession }) => {
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const history = useHistory();

  const openModal = (e) => {
    e.stopPropagation();
    setShowConfirmModal(true);
  };

  const deleteSessions = (Id, event) => {
    event.stopPropagation();
    const filtered = sessions.filter((session) => session.sessionId != Id);
    fetch(`${process.env.REACT_APP_API}/sessions/${Id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        setShowConfirmModal(false);
        filterSession(filtered);
        return history.go(0);
      })
      .catch((error) => setError(error.toString()));
  };

  return (
    <>
      <div>
        <button onClick={(e) => openModal(e)}>Delete</button>
      </div>
      <Modal
        title="Are you sure you want to delete the selected psychologist?"
        onConfirm={(e) => deleteSessions(sessionId, e)}
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
};

export default DeleteBtn;
