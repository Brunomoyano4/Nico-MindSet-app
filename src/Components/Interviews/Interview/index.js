import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../Interview/interview.module.css';
import Modal from '../../Shared/Modal';

const Interviews = ({ interview }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();
  const openEditForm = () => {
    history.push(`/interviews/form?id=${interview._id}`);
  };

  const deleteInterview = (event) => {
    const url = `${process.env.REACT_APP_API}/interviews/${interview._id}`;
    event.stopPropagation();
    fetch(url, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        setShowConfirmModal(false);
        return history.go(0);
      })
      .catch((error) => setError(error.toString()));
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete the selected interview?"
        onConfirm={(e) => deleteInterview(e)}
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
      <tr key={interview._id} onClick={openEditForm}>
        <td>{interview.positionId}</td>
        <td>{interview.postulantId}</td>
        <td>{interview.dateTime}</td>
        <td>
          <button
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmModal(true);
            }}
            interview={interview}
          >
            DELETE
          </button>
        </td>
      </tr>
    </>
  );
};

export default Interviews;
