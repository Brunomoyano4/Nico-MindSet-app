import styles from './modal.module.css';
import { useState } from 'react';

const Modal = ({
  showHook,
  showModal,
  title,
  subtitle,
  closeBtnText,
  proceedBtnText,
  id,
  getApplications
}) => {
  const [error, setError] = useState('');
  const onClickDeleteBtn = () => {
    fetch(`${process.env.REACT_APP_API}/applications/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        getApplications();
        showHook(false);
      })
      .catch((error) => {
        setError(JSON.stringify(error));
      });
  };

  return (
    <section className={showModal ? styles.modalContainer : ''}>
      <dialog open={showModal} className={styles.modal}>
        <h2 className={styles.modalLabel}>{title}</h2>
        <div>{error ?? ''}</div>
        {subtitle.map((subtitle, idx) => (
          <h3 key={`subtitle-${idx}`} className={styles.modalContent}>
            {subtitle}
          </h3>
        ))}
        <div className={styles.flex}>
          <button onClick={() => showHook(false)} className={styles.modalBtn}>
            {closeBtnText}
          </button>
          <button onClick={onClickDeleteBtn} className={styles.modalBtn}>
            {proceedBtnText}
          </button>
        </div>
      </dialog>
    </section>
  );
};

export default Modal;
