import { useState } from 'react';
import styles from '../Interview/interview.module.css';
import Modal from '../Modal';

const Interviews = ({ interview }) => {
  const [showModal, setShowModal] = useState(false);
  const openEditForm = () => {
    window.location.href = `/interviews/form?id=${interview._id}`;
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onCloseModal = () => {
    console.log('se borro');
  };

  const refreshPage = () => {
    window.location.reload();
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
        title="Are you sure you want to delete this interview?"
        onConfirm={onDelete}
        show={showModal}
        closeModal={closeModal}
        onCloseModal={onCloseModal}
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
