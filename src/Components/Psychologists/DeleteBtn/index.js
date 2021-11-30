import { useState } from 'react';
import Modal from '../Modal';
import styles from './deleteBtn.module.css';

function DeleteBtn({ psychologist }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const deletePsychologist = (event) => {
    event.stopPropagation();
    const url = `${process.env.REACT_APP_API}/psychologists/${psychologist._id}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.status !== 200) {
          return res.json().then((message) => {
            throw new Error(message);
          });
        }
      })
      .catch((error) => error)
      .finally(window.location.reload());
  };
  return (
    <>
      <button
        className={styles.deleteBtn}
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 0 24 24"
          width="18px"
          fill="#ffffff"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
      </button>
      <Modal
        title="Are you sure you want to delete the selected psychologist?"
        onConfirm={(e) => deletePsychologist(e)}
        show={showModal}
        closeModal={closeModal}
      ></Modal>
    </>
  );
}

export default DeleteBtn;
