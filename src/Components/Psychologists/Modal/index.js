import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  const onCloseModal = (event) => {
    event.stopPropagation();
    props.closeModal();
  };

  return (
    <div className={styles.container} onClick={(e) => onCloseModal(e)}>
      <div className={styles.modal}>
        <h2>{props.title}</h2>
        {props.error && <div className={styles.error}>{props.error}</div>}
        <button className={styles.confirmBtnModal} onClick={props.onConfirm}>
          Confirm
        </button>
        <button className={styles.cancelBtnModal} onClick={(e) => onCloseModal(e)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Modal;
