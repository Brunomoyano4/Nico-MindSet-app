import styles from './inputModal.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import PostulantForm from 'Components/Admin/Postulants/Form';
import PsychologistsForm from 'Components/Admin/Psychologists/Form';
import { updatePostulant } from 'redux/postulants/thunks';

function InputModal(props) {
  const dispatch = useDispatch();
  if (!props.show) {
    return null;
  }

  const onCloseModal = (event) => {
    event.stopPropagation();
    props.closeModal(event);
  };

  const onSubmit = (formValues) => {
    dispatch(updatePostulant(props.postulant._id, formValues));

    //history.replace('/admin/postulants/list');
  };

  const setModalContent = (type) => {
    if (type) {
      switch (type) {
        case 'postulant':
          return <PostulantForm edit={true} closeModal={(e) => onCloseModal(e)} />;
        case 'psychologist':
          return <PsychologistsForm />;
        case 'postulantProfile':
          return <span className={styles.cancelledSession}>{type.status}</span>;
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.title}>
          <h2>{props.title}</h2>
          <span className={styles.subtitle}>{props.subtitle}</span>
        </div>
        <div className={styles.modalBody}>{setModalContent(props.type)}</div>
      </div>
    </div>
  );
}

export default InputModal;
