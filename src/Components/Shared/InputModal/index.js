import styles from './inputModal.module.css';
import React from 'react';
import PostulantForm from 'Components/Admin/Postulants/Form';
import PsychologistsForm from 'Components/Admin/Psychologists/Form';

function InputModal(props) {
  if (!props.show) {
    return null;
  }

  const onCloseModal = (event) => {
    event.stopPropagation();
    props.closeModal(event);
  };

  const setModalContent = (type) => {
    if (type) {
      switch (type) {
        case 'postulant':
          return <PostulantForm edit={true} closeModal={(e) => onCloseModal(e)} />;
        case 'psychologist':
          return <PsychologistsForm edit={true} closeModal={(e) => onCloseModal(e)} />;
        case 'postulantProfile':
          return <span>gika</span>;
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.title}>
          <span className={styles.closeBtn} onClick={(e) => onCloseModal(e)}>
            X
          </span>
          <h2>{props.title}</h2>
          <span className={styles.subtitle}>{props.subtitle}</span>
        </div>
        <div className={styles.modalBody}>{setModalContent(props.type)}</div>
      </div>
    </div>
  );
}

export default InputModal;
