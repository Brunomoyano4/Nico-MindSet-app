import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../Interview/interview.module.css';
import Modal from '../Modal';

const Interviews = ({ interview }) => {
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();
  const openEditForm = () => {
    history.push(`/interviews/form?id=${interview._id}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const refreshPage = () => {
    history.go(0);
  };

  const onDelete = (event) => {
    const url = `${process.env.REACT_APP_API}/interviews/${interview._id}`;
    event.stopPropagation();
    fetch(url, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.status !== 204) {
          return res.json().then((message) => {
            throw new Error(message);
          });
        }
      })
      .catch((error) => error)
      .finally(() => {
        refreshPage();
      });
  };

  return (
    <>
      <Modal
        title="YOU'RE ABOUT TO DELETE AN INTERVIEW"
        onConfirm={onDelete}
        show={showModal}
        closeModal={closeModal}
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
              setShowModal(true);
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
